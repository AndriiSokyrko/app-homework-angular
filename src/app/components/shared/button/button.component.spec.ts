import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Router, RouterModule} from "@angular/router";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {AppState} from "../../../reducers/app.state";
import {getBoardsByDashboardId} from "../../../reducers/board/board.selectors";
import {useBoards, useDashboards} from "./mocks/boards";
import {getDashboardById} from "../../../reducers/dashboard/dashboard.selectors";
import {BoardService} from "../../../services/board/board.service";
import {Location} from "@angular/common";
import {BoardComponent} from "../../feature/board/board.component";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {editBoard} from "../../../reducers/board/board.actions";
import {DashboardService} from "../../../services/dashboard/dashboard.service";
import {of} from "rxjs";

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  let boardService: BoardService
  let dashboardService: DashboardService
  const boardServiceSpy = jasmine.createSpyObj('boardService',['editBoard'])
  const dashboardServiceSpy = jasmine.createSpyObj('dashboardService',['patchDashboard'])

  let router :Router
  let location: Location

  let routes=[
    {path:'board/:id', component: BoardComponent}
  ]

  let mockStore: MockStore<AppState>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonComponent ],
      imports:[
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        FormsModule,
        ReactiveFormsModule
      ],
      providers:[
        provideMockStore(),
        {provide: BoardService, useValue: boardServiceSpy},
        {provide: DashboardService, useValue: dashboardServiceSpy},
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
    mockStore= TestBed.inject(MockStore)
    spyOn(mockStore, 'dispatch').and.callFake(() => {});

    boardService =TestBed.inject(BoardService)
    dashboardService =TestBed.inject(DashboardService)

    router = TestBed.inject(Router)
    location= TestBed.inject(Location)
    spyOn(router,'navigate')

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it(' onClick spec ',() => {
    const event = spyOn(component.updatePage,'emit')
    fixture.detectChanges()
    component.onClick()
    expect(event).toHaveBeenCalled()
  })


  it('checkStatusName',()=>{
    const board = useBoards.find(bd=>bd.dashboardId===2)
    const event= spyOn(component.archiveChange, 'emit')
    mockStore.overrideSelector(getBoardsByDashboardId, useBoards.filter(dt=>dt.dashboardId===2)) //3 records
    mockStore.overrideSelector(getDashboardById, useDashboards.find(dt=>dt.id===2)) //3 records
    component.checkStatusName(board)

    fixture.detectChanges()
    mockStore.select(getBoardsByDashboardId,{id:2}).subscribe(dt=>{
      mockStore.select(getDashboardById,2).subscribe(dt=>{
        expect(dt).toBeTruthy()
        expect(event).toHaveBeenCalled()
      })
    })
  })
  it('onDrop',()=>{
    const testEvent = {
      dataTransfer: {
        setData: () => useBoards[0],
        getData: () => JSON.stringify(useBoards[0])
      }
    };
    spyOn(testEvent.dataTransfer, 'getData').and.callThrough();
    const editDashboard = {...useDashboards[0], title:'edit'}
    dashboardServiceSpy.patchDashboard.and.returnValue(of(editDashboard))
    const editBoard = {...useBoards[0], title:'edit'}
    boardServiceSpy.editBoard.and.returnValue(of(editBoard))
    fixture.detectChanges()
     component.onDrop(testEvent)
    expect(dashboardService.patchDashboard).toHaveBeenCalled()
  })

});
