import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import {Store, StoreModule} from "@ngrx/store";
import {dashboardReducer} from "../../../reducers/dashboard/dashboard.reducer";
import {FilterDashboardPipe} from "../../../pipes/filter-dashboard.pipe";
import {SortDashboardPipe} from "../../../pipes/sort-dashboard.pipe";
import {DashboardModel} from "../../../models/dashboard.model";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {getDashboards} from "../../../reducers/dashboard/dashboard.selectors";
import {initDashboard} from "../../../reducers/dashboard/dashboard.actions";
import {DashboardService} from "../../../services/dashboard/dashboard.service";
import {useDashboards, useSelectedColor} from "./mocks/dashboards";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {AppState} from "../../../reducers/app.state";
import {getColor} from "../../../reducers/color/color.selector";
import {of} from "rxjs";

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>

  let service: DashboardService
  let useDashboard = useDashboards
  let mockStore: MockStore<AppState>
  const dashboardServiceSpy= jasmine.createSpyObj('dashboardService', ['initDashboard'])

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        FilterDashboardPipe,
        SortDashboardPipe
      ],
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({dashboard: dashboardReducer}),
      ],
      providers:[
        provideMockStore(),
        {provide:DashboardService,useValue:dashboardServiceSpy}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
    mockStore= TestBed.inject(MockStore)
    spyOn(mockStore,'dispatch').and.callFake(()=>{})
    mockStore.overrideSelector(getColor,useSelectedColor)

    fixture = TestBed.createComponent(DashboardComponent);
    service = TestBed.inject(DashboardService)
    component = fixture.componentInstance;
    component.selectedColor =useSelectedColor
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(' changeStrFilter should be equal a filter', () => {
    component.filter ='test'
    const result = component.changeFieldName('test')
    expect(component.filter).toBe(result);
  });

  it(' changeSortName should be equal a sortName', () => {
    component.sortName ='des'
    const result = component.changeSortName('des')
    expect(component.sortName).toBe(result);
  });
  it(' changeFieldName should be equal a fieldName', () => {
    component.sortName ='title'
    const result = component.changeSortName('title')
    expect(component.sortName).toBe(result);
  });


  it('ngOnInit',()=>{
      mockStore.overrideSelector(getColor,useSelectedColor)
     expect(component.selectedColor).toEqual(useSelectedColor)
  })

});
