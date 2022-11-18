import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { TopMenuComponent } from './top-menu.component';
import {Router, RouterModule} from "@angular/router";
import {StoreModule} from "@ngrx/store";
import {boardReducer} from "../../../reducers/board/board.reducer";
import {dashboardReducer} from "../../../reducers/dashboard/dashboard.reducer";
import {ModalModule} from "../../shared/modal/modal.module";
import {SelectModule} from "../../shared/select/select.module";
import {SelectComponent} from "../../shared/select/select.component";
import {ModalComponent} from "../../shared/modal/modal.component";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {Location} from "@angular/common";
import {useBoards, useSelectedColor} from "../../feature/board/mocks/boards";
import {BoardComponent} from "../../feature/board/board.component";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {AppState} from "../../../reducers/app.state";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {LoginComponent} from "../../feature/login/login.component";
import {RouterTestingModule} from "@angular/router/testing";
import {getDashboardById} from "../../../reducers/dashboard/dashboard.selectors";
import {useDashboards} from "../../feature/dashboard/mocks/dashboards";
import {DashboardModel} from "../../../models/dashboard.model";
import {getColor} from "../../../reducers/color/color.selector";

describe('TopMenuComponent',() => {
  let component: TopMenuComponent;
  let fixture: ComponentFixture<TopMenuComponent>;

  let router :Router
  let location: Location

  let routes=[
    {path:'login', component: LoginComponent}
  ]
  let mockStore: MockStore<AppState>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopMenuComponent],
      imports:[
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
      ],
      providers:[
        provideMockStore(),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]

    })
    .compileComponents();

    mockStore= TestBed.inject(MockStore)
    spyOn(mockStore, 'dispatch').and.callFake(() => {});
    mockStore.overrideSelector(getColor,['#111','#222','#333'])
    router = TestBed.inject(Router)
    location= TestBed.inject(Location)

    fixture = TestBed.createComponent(TopMenuComponent);
    component = fixture.componentInstance;
    component.selectedColor= useSelectedColor

    fixture.detectChanges();
    router.initialNavigation()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('ngOnInit spec',()=>{
    component.dashboardName='test title 1'
    mockStore.overrideSelector(getDashboardById,useDashboards[0])
    fixture.detectChanges()
    mockStore.select(getDashboardById,{id:1}).subscribe((dt: undefined|DashboardModel)=>{
      expect(dt).toBeTruthy()
      expect(dt.title).toBe('test title 1')
    })
  })

  it('changeInput spec',()=>{
    const event = spyOn(component.changeFilter,'emit')
    fixture.detectChanges()
    component.changeInput('test')
    expect(event).toHaveBeenCalledWith('test')
  })
  it('changeInput spec',()=>{
    const event = spyOn(component.changeSORT,'emit')
    fixture.detectChanges()
    component.selDESC()
    expect(event).toHaveBeenCalledWith('desc')
  })
  it('changeInput spec',()=>{
    const event = spyOn(component.changeSORT,'emit')
    fixture.detectChanges()
    component.selDESC()
    expect(event).toHaveBeenCalledWith('desc')
  })
  it('selOption spec',()=>{
    const event = spyOn(component.changeField,'emit')
    fixture.detectChanges()
    component.selOption('title')
    expect(event).toHaveBeenCalledWith('title')
  })
  it('logout spec',fakeAsync(()=>{
    router.navigate(['/login'])
    tick()
      expect(location.path()).toBe('/login');

  }))
});
