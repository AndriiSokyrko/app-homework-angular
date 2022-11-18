import {ComponentFixture, fakeAsync, flush, TestBed} from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import {AuthService} from "../../../services/auth/auth.service";
import {UserModel} from "../../../models/user.model";
import { of} from "rxjs";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {useSelectedColor, useUsers} from "../login/mocks/users";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {getColor} from "../../../reducers/color/color.selector";
import {AppState} from "../../../reducers/app.state";
import {getUsers} from "../../../reducers/user/user.selectors";
import {addUser} from "../../../reducers/user/user.actions";

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let authService: AuthService

  let router :Router
  let location: Location

  let useBoard = useUsers[0]

  let routes=[
    {path:'dashboard', component: DashboardComponent}
  ]
  let mockStore: MockStore<AppState>
  let mockUsersSelector
  const authServiceSpy = jasmine.createSpyObj('authService',['getUsers','addUser'])

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RegistrationComponent,
      ],
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
    mockUsersSelector = mockStore.overrideSelector(getUsers,useUsers)

    authService= TestBed.inject(AuthService)

    router = TestBed.inject(Router)
    location= TestBed.inject(Location)
    spyOn(router,'navigate')

    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    component.selectedColor = useSelectedColor
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onSubmit not exist user', () => {
    component.formRegister.controls['login'].setValue('name1'),
      component.formRegister.controls['email'].setValue('name1@ukr.net'),
      component.formRegister.controls['password'].setValue('name1')
    fixture.detectChanges()
    mockUsersSelector.setResult(useUsers)
    component.onSubmit()
    fixture.detectChanges()
    expect(component.message).toBe('The name is already registered')
  })

  it('onSubmit already exist user',()=> {
    authServiceSpy.getUsers.and.returnValue(of(useUsers))
    component.formRegister.controls['login'].setValue('test1'),
      component.formRegister.controls['email'].setValue('test1@ukr.net'),
      component.formRegister.controls['password'].setValue('test1')
    let newUser: UserModel = {id: 3, name: 'test1', email: 'test1@ukr.net', password: '$2a$10$.m8MRiJ/ImRKvox0GDJ/0.NR74OEFf4WpHrHtkj9K5YqNWRaY8Rba'}
    authServiceSpy.addUser.and.returnValue(of(newUser))
    fixture.detectChanges()
    mockUsersSelector.setResult([])
    mockStore.refreshState()
    component.onSubmit()
    expect(mockStore.dispatch).toHaveBeenCalledWith(addUser(newUser))
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard'])

  })

});
