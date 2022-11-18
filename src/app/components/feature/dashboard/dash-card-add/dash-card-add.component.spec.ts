import {ComponentFixture, fakeAsync, flush, TestBed, tick} from '@angular/core/testing';

import { DashCardAddComponent } from './dash-card-add.component';
import { StoreModule} from "@ngrx/store";
import {DashboardService} from "../../../../services/dashboard/dashboard.service";
import {dashboardReducer} from "../../../../reducers/dashboard/dashboard.reducer";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import { By } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {of, throwError} from "rxjs";
import {RouterTestingModule} from "@angular/router/testing";
import {useDashboards, useSelectedColor} from "../mocks/dashboards";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {DashboardModel} from "../../../../models/dashboard.model";
import {BoardComponent} from "../../board/board.component";
import {createDashboard, editDashboard} from "../../../../reducers/dashboard/dashboard.actions";


describe('DashCardAddComponent', () => {
  let component: DashCardAddComponent;
  let fixture: ComponentFixture<DashCardAddComponent>;
  let service: DashboardService

  let useDashboard =  useDashboards[0]

  let router :Router
  let location: Location

  let routes=[
    {path:'dashboard', component: BoardComponent}
  ]

  const dashboardServiceFake =jasmine.createSpyObj('dashboardService',['addDashboard'])
  let mockStoreDashboard : MockStore<DashboardModel[]>
  let initialState = {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashCardAddComponent ],
      imports: [
        RouterTestingModule.withRoutes(routes),
        StoreModule.forRoot({dashboard: dashboardReducer}),
        FormsModule,
        ReactiveFormsModule,
      ],
      providers:[
        provideMockStore({initialState}),
        {provide: DashboardService, useValue: dashboardServiceFake}
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
    mockStoreDashboard= TestBed.inject(MockStore)
    spyOn(mockStoreDashboard, 'dispatch').and.callFake(() => {});

    service= TestBed.inject(DashboardService)

    fixture = TestBed.createComponent(DashCardAddComponent);
    component = fixture.componentInstance;
    component.selectedColor= useSelectedColor
    fixture.detectChanges();

    router = TestBed.inject(Router)
    location= TestBed.inject(Location)
    spyOn(router, 'navigateByUrl');
    spyOn(router, 'navigate');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Form field title should be created', () => {
    const title = fixture.debugElement.query(By.css('#title_id'))
    expect(title).toBeTruthy()
    expect(title.nativeElement.getAttribute('type')).toBe('text')
    const ctrl = component.formDashboard.controls['title']
    ctrl.setValue('test1')
    fixture.detectChanges()
    expect(title.nativeElement.value).toBe('test1')
    ctrl.setValue(null)
    fixture.detectChanges()
    expect(ctrl.invalid).toBeTruthy()
  });

  it('Form description title should be created', () => {
    const descr = fixture.debugElement.query(By.css('#description_id'))
    expect(descr).toBeTruthy()
    expect(descr.nativeElement.getAttribute('type')).toBe('text')
    const ctrl = component.formDashboard.controls['description']
    ctrl.setValue('test1')
    fixture.detectChanges()
    expect(descr.nativeElement.value).toBe('test1')
    ctrl.setValue(null)
    fixture.detectChanges()
    expect(ctrl.invalid).toBeTruthy()
  });

  it('createDashboard spec',()=>{
    component.formDashboard.controls['title'].setValue('test1')
    component.formDashboard.controls['description'].setValue('description1')
    const newDash = component.createDashboard()
    expect(newDash).toBeTruthy()
  })
  it('addDashboardStore spec',()=>{
    const newDash = component.createDashboard()
    component.addDashboardStore(newDash)
    expect(mockStoreDashboard.dispatch).toHaveBeenCalledWith(
      createDashboard(newDash)
    );
  })
  it('onSubmit spec', ()=>{
    component.formDashboard.controls['title'].setValue('test onsubmit')
    component.formDashboard.controls['description'].setValue('test onsubmit')
    const newDash =component.createDashboard()
    dashboardServiceFake.addDashboard.and.returnValue(of(newDash))
    component.onSubmit()
    expect(service.addDashboard).toHaveBeenCalled()
    expect(mockStoreDashboard.dispatch).toHaveBeenCalled()
    fixture.detectChanges()
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard'],{ skipLocationChange: false });

  })


});
