import { TestBed } from '@angular/core/testing';

import { AuthGuardGuard } from './auth-guard.guard';
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {BoardComponent} from "../components/feature/board/board.component";
import {LoginComponent} from "../components/feature/login/login.component";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";

describe('AuthGuardGuard', () => {
  let guard: AuthGuardGuard;
  let router :Router

  beforeEach(() => {
    TestBed.configureTestingModule({
    });
    router = TestBed.inject(Router)
    guard = TestBed.inject(AuthGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
  it('canActivate false',()=>{
    spyOn(localStorage, 'getItem')
      .and.callFake(()=>null);
    spyOn(router,'navigate')
    guard.canActivate()
    expect(router.navigate).toHaveBeenCalledWith(['/login'])
  })
  it('canActivate false',()=>{
    spyOn(localStorage, 'getItem')
      .and.callFake(()=>"1");
    spyOn(router,'navigate')
    guard.canActivate()
    expect(router.navigate).not.toHaveBeenCalledWith(['/login'])
  })
});
