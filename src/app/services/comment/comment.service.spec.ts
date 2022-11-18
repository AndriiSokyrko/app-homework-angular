import { CommentService } from './comment.service';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {CommentModel} from "../../models/comment.model";
import {of, throwError} from "rxjs";

describe('CommentService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>
  let service: CommentService;
  let comments: CommentModel[]
  beforeEach(() => {
    comments=[
      {"id": 1,
        "boardId": 1,
        "dashboardId": 1,
        "text": 'string',
        "userId": 1,
        "date": '10.10.2022' },
        { "id": 2,
          "boardId": 2,
          "dashboardId": 2,
          "text": 'string',
          "userId": 2,
          "date": '15.02.2021'}];
    httpClientSpy= jasmine.createSpyObj('HttpClient',['get','post','put','patch','delete'])
    service = new CommentService(httpClientSpy)
  });

  it('should be created', () => {
    expect(service.initComment).toBeTruthy();
  });

  it('should return expected heroes (HttpClient called once)',(done: DoneFn) => {

    httpClientSpy.get.and.returnValue(of(comments));
    service.initComment().subscribe({
      next: boards => {
        expect(boards)
          .toEqual(comments);
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

    service.initComment().subscribe({
      next: users => done.fail('expected an error, not user'),
      error: error  => {
        expect(error).toContain('Error 400!');
        done();
      }
    });
  });
  it('should return expected heroes (HttpClient called once)',(done: DoneFn) => {

    httpClientSpy.get.and.returnValue(of(comments));
    service.initCommentById(1).subscribe({
      next: board => {
        expect(board)
          .toEqual(comments);
        done();
      },
      error: done.fail
    });
    expect(httpClientSpy.get.calls.count())
      .withContext('one call')
      .toBe(1);
  });

  it('should return expected board (HttpClient post called once)',() => {
    httpClientSpy.post.and.returnValue(of(comments[0]));
    service.addComment(comments[0]).subscribe(
      board => {
        expect(board)
          .toEqual(comments[0]);
      }
    );
    expect(httpClientSpy.post.calls.count())
      .withContext('one call')
      .toBe(1);
  });
  it('POST return an error when the server returns a 404', (done: DoneFn) => {

    httpClientSpy.post.and.returnValue(throwError('Error 400!'));

    service.addComment(comments[0]).subscribe({
      next: users => done.fail('expected an error, not user'),
      error: error  => {
        expect(error).toContain('Error 400!');
        done();
      }
    });
  });
  it('should return expected board (HttpClient put called once)',() => {
    httpClientSpy.put.and.returnValue(of(comments[0]));
    service.editComment(comments[0]).subscribe(
      board => {
        expect(board)
          .toEqual(comments[0]);
      }
    );
    expect(httpClientSpy.put.calls.count())
      .withContext('one call')
      .toBe(1);
  });

  it('PUT return an error when the server returns a 404', (done: DoneFn) => {

    httpClientSpy.put.and.returnValue(throwError('Error 400!'));

    service.editComment(comments[0]).subscribe({
      next: users => done.fail('expected an error, not user'),
      error: error  => {
        expect(error).toContain('Error 400!');
        done();
      }
    });
  });
  it('should return expected board (HttpClient remove called once)',() => {
    httpClientSpy.delete.and.returnValue(of(comments[0]));
    service.removeComment(comments[0]['id']).subscribe(
      board => {
        expect(board)
          .toEqual(comments[0]);
      }
    );
    expect(httpClientSpy.delete.calls.count())
      .withContext('one call')
      .toBe(1);
  });
  it('DELETE return an error when the server returns a 404', (done: DoneFn) => {

    httpClientSpy.delete.and.returnValue(throwError('Error 400!'));

    service.removeComment(comments[0]['id']).subscribe({
      next: users => done.fail('expected an error, not user'),
      error: error  => {
        expect(error).toContain('Error 400!');
        done();
      }
    });
  });
});
