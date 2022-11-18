import { TestBed } from '@angular/core/testing';

import { DashboardService } from './dashboard.service';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {of, throwError} from "rxjs";
import {DashboardModel} from "../../models/dashboard.model";

describe('DashboardService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>
  let service: DashboardService;
  let dashboards: DashboardModel[]
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get','post','put','delete','patch']);
    service = new DashboardService(httpClientSpy);
    dashboards=[
      { "id" : 1,
        "title": 'string',
        "description": 'string' ,
        "date": 'string',
        "progress": true,
        "done": false,
        "archive":false },
      { "id" : 2,
        "title": 'string',
        "description": 'string' ,
        "date": 'string',
        "progress": false,
        "done": true,
        "archive":true }
    ];

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return expected heroes (HttpClient called once)',(done: DoneFn) => {

    httpClientSpy.get.and.returnValue(of(dashboards));
    service.initDashboard().subscribe({
      next: boards => {
        expect(boards)
          .toEqual(dashboards);
        done();
      },
      error: done.fail
    });
    expect(httpClientSpy.get.calls.count())
      .withContext('one call')
      .toBe(1);
  });
  it('should return an error when the server returns a 404', (done: DoneFn) => {

    httpClientSpy.get.and.returnValue(throwError('Error 400!'));

    service.initDashboard().subscribe({
      next: users => done.fail('expected an error, not user'),
      error: error  => {
        expect(error).toContain('Error 400!');
        done();
      }
    });
  });

  it('should return expected board (HttpClient post called once)',() => {
    httpClientSpy.post.and.returnValue(of(dashboards[0]));
    service.addDashboard(dashboards[0]).subscribe(
      board => {
        expect(board)
          .toEqual(dashboards[0]);
      }
    );
    expect(httpClientSpy.post.calls.count())
      .withContext('one call')
      .toBe(1);
  });
  it('should return an error when the server returns a 404', (done: DoneFn) => {

    httpClientSpy.post.and.returnValue(throwError('Error 400!'));

    service.addDashboard(dashboards[0]).subscribe({
      next: users => done.fail('expected an error, not user'),
      error: error  => {
        expect(error).toContain('Error 400!');
        done();
      }
    });
  });

  it('should return expected board (HttpClient put called once)',() => {
    httpClientSpy.put.and.returnValue(of(dashboards[0]));
    service.editDashboard(dashboards[0]).subscribe(
      board => {
        expect(board)
          .toEqual(dashboards[0]);
      }
    );
    expect(httpClientSpy.put.calls.count())
      .withContext('one call')
      .toBe(1);
  });
  it('should return an error when the server returns a 404', (done: DoneFn) => {

    httpClientSpy.put.and.returnValue(throwError('Error 400!'));

    service.editDashboard(dashboards[0]).subscribe({
      next: users => done.fail('expected an error, not user'),
      error: error  => {
        expect(error).toContain('Error 400!');
        done();
      }
    });
  });

  it('should return expected message (HttpClient remove called once)',() => {
    httpClientSpy.delete.and.returnValue(of(dashboards[0]));
    service.removeDashboard(dashboards[0]['id']).subscribe(
      board => {
        expect(board)
          .toEqual(dashboards[0]);
      }
    );
    expect(httpClientSpy.delete.calls.count())
      .withContext('one call')
      .toBe(1);
  });
  it('should return an error when the server returns a 404', (done: DoneFn) => {

    httpClientSpy.delete.and.returnValue(throwError('Error 400!'));

    service.removeDashboard(dashboards[0]['id']).subscribe({
      next: users => done.fail('expected an error, not user'),
      error: error  => {
        expect(error).toContain('Error 400!');
        done();
      }
    });
  });
});
