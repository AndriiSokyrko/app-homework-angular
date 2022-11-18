import {ComponentFixture, fakeAsync, flush, TestBed, tick} from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth/auth.service";
import {useSelectedColor} from "./mocks/users";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {Location} from "@angular/common";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {useUsers} from "./mocks/users";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {getColor} from "../../../reducers/color/color.selector";
import {AppState} from "../../../reducers/app.state";
import {getUsers} from "../../../reducers/user/user.selectors";
import * as bcrypt from "bcryptjs";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService

  let router :Router
  let location: Location

  let useBoard = useUsers[0]

  let routes=[
    {path:'dashboard', component: DashboardComponent}
  ]
  let mockStore: MockStore<AppState>
  let mockSelectUsers
  const authServiceSpy = jasmine.createSpyObj('authService',['getUsers'])
  //
  beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [ LoginComponent ],
        imports:[
          HttpClientTestingModule,
          RouterTestingModule.withRoutes(routes),
          FormsModule,
          ReactiveFormsModule
        ],
        providers:[
          provideMockStore(),
          {provide: AuthService, useValue: authServiceSpy}
        ],
        schemas:[CUSTOM_ELEMENTS_SCHEMA]
      })
      .compileComponents();
      mockStore= TestBed.inject(MockStore)
      spyOn(mockStore, 'dispatch').and.callFake(() => {});
      mockStore.overrideSelector(getColor,useSelectedColor)
      mockSelectUsers = mockStore.overrideSelector(getUsers,useUsers)
      authService= TestBed.inject(AuthService)

      router = TestBed.inject(Router)
      location= TestBed.inject(Location)
       spyOn(router,'navigate')

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.selectedColor = useSelectedColor

    fixture.detectChanges();
  })
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onSubmit Ok',fakeAsync(()=>{
    component.formLogin.controls['login'].setValue('name1')
    component.formLogin.controls['password'].setValue('name1')
    fixture.detectChanges()
    component.onSubmit()
    tick()
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);

  }))
  it('onSubmit not Ok',()=>{
    component.formLogin.controls['login'].setValue('name3')
    component.formLogin.controls['password'].setValue('name3')
    fixture.detectChanges()
    component.onSubmit()
    expect(component.showMessage).toBe('Login or password isn\'t correct')
    setTimeout(()=>{
      expect(component.showMessage).toBe('')
    },1000)
  })
  it('onSubmit not Ok password',fakeAsync(()=>{
    component.formLogin.controls['login'].setValue('name1')
    component.formLogin.controls['password'].setValue('name3')
    component.showMessage="Password isn\'t correct"
    fixture.detectChanges()
    component.onSubmit()

    expect(component.showMessage).toBe('Password isn\'t correct')
    flush()
  }))


it('formLogin spec validate',()=>{
  component.formLogin.controls['login'].setValue('test')//less 5 chars
  component.formLogin.controls['password'].setValue('1234')// 5 chars
  fixture.detectChanges()
  expect(component.formLogin.valid).toBeFalse()

})
});
