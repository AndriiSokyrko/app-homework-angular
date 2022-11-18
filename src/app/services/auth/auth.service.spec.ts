import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {HttpClient, HttpClientModule, HttpErrorResponse} from "@angular/common/http";
import {UserModel} from "../../models/user.model";
import {catchError, map, Observable, of, throwError} from "rxjs";
import {useUsers} from "../../components/feature/login/mocks/users";

describe('AuthService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: AuthService;
  let users: UserModel[]

  beforeEach(() => {
    users =[
      { id: 1, name: 'A',email:'test1@test.ua',password:'password' },
      { id: 2, name: 'B',email:'test2@test.ua',password:'password' }
      ];

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get','post']);
    service = new AuthService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service.getUsers).toBeTruthy();
  });
  it('should return expected heroes (HttpClient called once)', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(users));
    service.getUsers().subscribe({
      next: users => {
        expect(users)
          .withContext('expected user')
          .toEqual(users);
        done();
      },
      error: done.fail
    });
    expect(httpClientSpy.get.calls.count())
      .withContext('one call')
      .toBe(1);
  });
  it('should return expected heroes (HttpClient called once)', (done: DoneFn) => {
    httpClientSpy.post.and.returnValue(of(users));
    service.addUser(users[0]).subscribe({
      next: users => {
        expect(users)
          .withContext('expected user')
          .toEqual(users);
        done();
      },
      error: done.fail
    });
    expect(httpClientSpy.post.calls.count())
      .withContext('one call')
      .toBe(1);
  });

  it('should return an error when the server returns a 400', (done: DoneFn) => {

    httpClientSpy.get.and.returnValue(throwError('Error'));

    service.getUsers().subscribe({
      next: users => done.fail('expected an error, not user'),
      error: error  => {
        expect(error).toContain('Error 400!');
        done();
      }
    });
  });
  it('should return an error when the server returns a 400', (done: DoneFn) => {

    httpClientSpy.post.and.returnValue(throwError('Error 400!'));

    service.addUser(useUsers[0]).subscribe({
      next: users => done.fail('expected an error, not user'),
      error: error  => {
        expect(error).toContain('Error 400!');
        done();
      }
    });
  });
  it('getUserByName error 400',(done)=>{
    httpClientSpy.get.and.returnValue(throwError('Error 400!'));

    service.getUserByName('test1').subscribe({
      next: users => done.fail('expected an error, not user'),
      error: error => {
        expect(error).toContain('Error 400!');
        done();
      }
    })
    });

    it('getUserById error 400',(done)=>{
    httpClientSpy.get.and.returnValue(throwError('Error 400!'));

    service.getUserById(1).subscribe({
      next: users => done.fail('expected an error, not user'),
      error: error  => {
        expect(error).toContain('Error 400!');
        done();
      }
    });
  })

});
