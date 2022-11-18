import { BoardService } from './board.service';
import {HttpClient } from "@angular/common/http";
import {of, throwError} from "rxjs";
import {BoardModel} from "../../models/board.model";
import {useUsers} from "../../components/feature/login/mocks/users";

describe('BoardService', () => {
  let service: BoardService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  let stubBoards: BoardModel[]
  beforeEach(() => {
    stubBoards = [
      {
        "id": 1,
        "title": 'string',
        "description": 'string',
        "dashboardId": 1,
        "date": 'string',
        "status": {
          "todo": true,
          "progress": false,
          "done": false
        }
      },
      {
        "id": 2,
        "title": 'string',
        "description": 'string',
        "dashboardId": 1,
        "date": 'string',
        "status": {
          "todo": true,
          "progress": false,
          "done": false
        }
      }
    ]
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get','post','put','delete','patch']);
    service = new BoardService(httpClientSpy);

  });

  it('should be created', () => {
    expect(service.initBoard).toBeTruthy();
  });

  it('should return expected heroes (HttpClient called once)',(done: DoneFn) => {

    httpClientSpy.get.and.returnValue(of(stubBoards));
    service.initBoard().subscribe({
      next: boards => {
        expect(boards)
          .toEqual(stubBoards);
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

    service.initBoard().subscribe({
      next: users => done.fail('expected an error, not user'),
      error: error  => {
        expect(error).toContain('Error 400!');
        done();
      }
    });
  });
  it('should return expected heroes (HttpClient called once)',(done: DoneFn) => {

    httpClientSpy.get.and.returnValue(of(stubBoards));
    service.initBoardById(1).subscribe({
      next: board => {
        expect(board)
          .toEqual(stubBoards);
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

    service.initBoardById(1).subscribe({
      next: users => done.fail('expected an error, not user'),
      error: error  => {
        expect(error).toContain('Error 400!');
        done();
      }
    });
  });
  it('should return expected board (HttpClient post called once)',() => {
    httpClientSpy.post.and.returnValue(of(stubBoards[0]));
    service.addBoard(stubBoards[0]).subscribe(
       board => {
        expect(board)
          .toEqual(stubBoards[0]);
      }
    );
    expect(httpClientSpy.post.calls.count())
      .withContext('one call')
      .toBe(1);
  });
  it('should return an error when the server returns a 400', (done: DoneFn) => {

    httpClientSpy.post.and.returnValue(throwError('Error 400!'));

    service.addBoard(stubBoards[0]).subscribe({
      next: users => done.fail('expected an error, not user'),
      error: error  => {
        expect(error).toContain('Error 400!');
        done();
      }
    });
  });
  it('should return expected board (HttpClient put called once)',() => {
    httpClientSpy.put.and.returnValue(of(stubBoards[0]));
    service.editBoard(stubBoards[0]).subscribe(
      board => {
        expect(board)
          .toEqual(stubBoards[0]);
      }
    );
    expect(httpClientSpy.put.calls.count())
      .withContext('one call')
      .toBe(1);
  });
  it('should return an error when the server returns a 404', (done: DoneFn) => {

    httpClientSpy.put.and.returnValue(throwError('Error 400!'));

    service.editBoard(stubBoards[0]).subscribe({
      next: users => done.fail('expected an error, not user'),
      error: error  => {
        expect(error).toContain('Error 400!');
        done();
      }
    });
  });
  it('should return expected board (HttpClient remove called once)',() => {
    httpClientSpy.delete.and.returnValue(of(stubBoards[0]));
    service.removeBoard(stubBoards[0]['id']).subscribe(
      board => {
        expect(board)
          .toEqual(stubBoards[0]);
      }
    );
    expect(httpClientSpy.delete.calls.count())
      .withContext('one call')
      .toBe(1);
  });

  it('should return an error when the server returns a 404', (done: DoneFn) => {

    httpClientSpy.delete.and.returnValue(throwError('Error 400!'));

    service.removeBoard(1).subscribe({
      next: users => done.fail('expected an error, not user'),
      error: error  => {
        expect(error).toContain('Error 400!');
        done();
      }
    });
  });

});

function imports(imports: any, arg1: (typeof HttpClient)[], arg2: { providers: (typeof BoardService)[]; }) {
    throw new Error('Function not implemented.');
}

