import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { DashCardComponent } from './dash-card.component';
import { StoreModule} from "@ngrx/store";
import {DashboardService} from "../../../../services/dashboard/dashboard.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {dashboardReducer} from "../../../../reducers/dashboard/dashboard.reducer";
import {DashboardModel} from "../../../../models/dashboard.model";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {By} from "@angular/platform-browser";
import {useDashboards, useSelectedColor} from '../mocks/dashboards'
import {of, throwError} from "rxjs";
import {BoardService} from "../../../../services/board/board.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {BoardCardEditComponent} from "../../board/board-card-edit/board-card-edit.component";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {BoardModel} from "../../../../models/board.model";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DashCardEditComponent} from "../dash-card-edit/dash-card-edit.component";
import {BoardComponent} from "../../board/board.component";
import {deleteDashboard, editDashboard} from "../../../../reducers/dashboard/dashboard.actions";
import {getDashboards} from "../../../../reducers/dashboard/dashboard.selectors";
import {getBoardsByDashboardId} from "../../../../reducers/board/board.selectors";
import {useBoards} from "../../board/mocks/boards";
import {AppState} from "../../../../reducers/app.state";

describe('DashCardComponent', () => {
  let component: DashCardComponent;
  let fixture: ComponentFixture<DashCardComponent>;
  let serviceDashboard: DashboardService
  let serviceBoard: BoardService
  let mockStore: MockStore<AppState>

  let useDashboard:DashboardModel = useDashboards[0]

  let router :Router
  let location: Location
  let routes=[
    {path:'board/:id', component: BoardComponent},
    {path:'dashboard/edit-dashboard/:id', component: DashCardEditComponent},
  ]

  const dashboardServiceFake =jasmine.createSpyObj('dashboardService',[ 'removeDashboard' ])
  const boardServiceFake =jasmine.createSpyObj('boardService',[ 'removeBoard' ])


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashCardComponent ],
      imports: [
        RouterTestingModule.withRoutes(routes),
        FormsModule,
        ReactiveFormsModule
      ],
      providers:[
        provideMockStore(),
        {provide: DashboardService, useValue: dashboardServiceFake},
        {provide: BoardService, useValue: boardServiceFake},
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
    mockStore = TestBed.inject(MockStore)
    spyOn(mockStore, 'dispatch').and.callFake(() => {});
    mockStore.overrideSelector(getBoardsByDashboardId, useBoards.filter(dt=>dt.dashboardId===2));

    serviceDashboard= TestBed.inject(DashboardService)
    serviceBoard= TestBed.inject(BoardService)

    fixture = TestBed.createComponent(DashCardComponent);
    component = fixture.componentInstance;
    component.selectedColor= useSelectedColor
    component.dashboard= useDashboard
    fixture.detectChanges();

    router = TestBed.inject(Router)
    location= TestBed.inject(Location)
    spyOn(router,'navigateByUrl')
    spyOn(router, 'navigate');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('@Input dashboard should be', () => {
    component.dashboard= useDashboard
    expect(component.dashboard).toEqual(useDashboard)
  });
  it('@Input selectedColor should be', () => {
    fixture.detectChanges()
    expect(useSelectedColor).toEqual(component.selectedColor)
  });
  it('Component tag "title "should be equivalent to dashboard.title', () => {
    component.dashboard=useDashboard
    fixture.detectChanges()
    const tag = fixture.debugElement.query(By.css('.name'))
    expect(tag.nativeElement.innerHTML)
      .toBe(useDashboard.title)
  });

  it('onEdit navigate', () => {
    component.onEdit()
    fixture.detectChanges()
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard/edit-dashboard',1],{ skipLocationChange: false });

  })

  it('onOpenBoard navigate', () => {
    component.onOpenBoard()
    fixture.detectChanges()
    expect(router.navigate).toHaveBeenCalledWith(['/board' , component.dashboard.id],{ skipLocationChange: false });
  })

  it('deleteDashboardStore spec',()=>{
    component.deleteDashboardStore(component.dashboard.id)
    // mockStore.setState({...useDashboards})
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      deleteDashboard({id:component.dashboard.id})
    );
  })

it('getBoardsByDashboardId spec',()=>{
  component.dashboard= useDashboards[1]
  mockStore.select(getBoardsByDashboardId, {id: component.dashboard.id})
    .subscribe(elm=>{
      expect(elm.length).toBe(3)
    })
})

  it('deleteDashboardService spec',()=>{
    component.dashboard=useDashboard
    dashboardServiceFake.removeDashboard.and.returnValue(of(useDashboard))
    component.deleteDashboardService()
    fixture.detectChanges()
    expect(serviceDashboard.removeDashboard).toHaveBeenCalled()
     expect(mockStore.dispatch).toHaveBeenCalledWith(
       deleteDashboard({id:useDashboard.id})
     )
  })
  it('deleteDashboardStore spec',()=>{
    component.deleteDashboardStore(useDashboard.id)
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      deleteDashboard({id:useDashboard.id})
    )
  })
  it('getBoardsByDashboardId spec', () => {
    const res = component.getBoardsByDashboardId()
    // mockStore.setState({...useDashboards})
    mockStore.select(getBoardsByDashboardId, {id: useDashboard.id})
      .subscribe(elm => {
        expect(elm.length).toBe(3)
      })
  })
  it('deleteDashboardService',()=>{
    dashboardServiceFake.removeDashboard.and.returnValue(of(useDashboard))
    fixture.detectChanges()
    component.deleteDashboardService()
      expect(mockStore.dispatch).toHaveBeenCalledWith(deleteDashboard({id:useDashboard.id}))
  })
  it('deleteBoards',()=>{
    component.deleteBoards(useBoards)
    expect(serviceBoard.removeBoard).toHaveBeenCalled()
  })



});
