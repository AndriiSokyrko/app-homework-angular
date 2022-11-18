import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { DashCardEditComponent } from './dash-card-edit.component';
import {DashboardService} from "../../../../services/dashboard/dashboard.service";
import {CUSTOM_ELEMENTS_SCHEMA, NgZone} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { of} from "rxjs";
import {RouterTestingModule} from "@angular/router/testing";
import {useDashboards, useSelectedColor} from "../mocks/dashboards";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {DashboardModel} from "../../../../models/dashboard.model";
import {editDashboard} from "../../../../reducers/dashboard/dashboard.actions";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {BoardCardEditComponent} from "../../board/board-card-edit/board-card-edit.component";
import { By } from '@angular/platform-browser';

describe('DashCardEditComponent', () => {
  let component: DashCardEditComponent;
  let fixture: ComponentFixture<DashCardEditComponent>;
  let service :  DashboardService
   let ngZone: NgZone
  let useDashboard =  useDashboards[0]

  let router :Router
  let location: Location
  let routes=[
    {path:'dashboard', component: BoardCardEditComponent}
  ]

  let dashboardServiceFake =jasmine.createSpyObj('dashboardService',['editDashboard'])

  let mockStoreDashboard : MockStore<DashboardModel[]>
  let initialState = {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashCardEditComponent ],
      imports: [
        RouterTestingModule.withRoutes(routes),
        FormsModule,
        ReactiveFormsModule
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

    fixture = TestBed.createComponent(DashCardEditComponent);
    component = fixture.componentInstance;
    component.dashboard= useDashboard
    component.selectedColor=useSelectedColor
    fixture.detectChanges();

    router = TestBed.inject(Router)
    location= TestBed.inject(Location)
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

  it('changeDashboard spec',()=>{
    component.formDashboard.controls['title'].setValue('new title')
    const result =component.changeDashboard().title
    expect(result).toBe('new title')
  })

  it('editDashboardStore spec',()=>{
    component.editDashboardStore(useDashboard)
    expect(mockStoreDashboard.dispatch).toHaveBeenCalledWith(
      editDashboard(useDashboard)
    );
  })
  it('changeDashboard',()=>{
    component.dashboard=useDashboard
    component.formDashboard.controls['title'].setValue('test1')
    component.formDashboard.controls['description'].setValue('description1')
    const res= component.changeDashboard()
    const comp:DashboardModel = {...useDashboard,title:'test1', description:'description1'}
    expect(res).toEqual(comp)
  })
  it('onSubmit spec', ()=>{
    component.dashboard=useDashboard
    component.formDashboard.controls['title'].setValue('test onsubmit')
    component.formDashboard.controls['description'].setValue('test onsubmit')
    const newDash =component.changeDashboard()
    dashboardServiceFake.editDashboard.and.returnValue(of(newDash))
    component.onSubmit()
      expect(service.editDashboard).toHaveBeenCalled()
      expect(mockStoreDashboard.dispatch).toHaveBeenCalled()
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard'])
  })


});
