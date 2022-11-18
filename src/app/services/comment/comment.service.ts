import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CommentModel} from "../../models/comment.model";
import {catchError, map, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommentService {


  // private path: string='http://localhost:3000/comments'
  // private pathInit: string='http://localhost:3000/comments/board'
  private path: string='https://app-homwork-angular.herokuapp.com/api/comments'
  private pathInit: string='https://app-homwork-angular.herokuapp.com/api/comments/board'

  constructor(private httpClient: HttpClient) { }

  initComment():Observable<CommentModel[]>{
    return this.httpClient.get<CommentModel[]>(this.path)
      .pipe(catchError(()=>throwError('Error 400!')), map((dt=>dt)))
  }

  initCommentById(id:number):Observable<CommentModel[]>{
    return this.httpClient.get<CommentModel[]>(this.pathInit+'/'+id)
      .pipe(catchError(()=>throwError('Error 400!')), map((dt=>dt)))
  }
  addComment(body:CommentModel):Observable<CommentModel>{
    return this.httpClient.post<CommentModel>(this.path,body)
      .pipe(catchError(()=>throwError('Error 400!')), map((dt=>dt)))
  }
  editComment(body:CommentModel):Observable<CommentModel>{
    return this.httpClient.put<CommentModel>(this.path+'/'+body.id,body)
      .pipe(catchError(()=>throwError('Error 400!')), map((dt=>dt)))
  }
  patchComment(body:CommentModel):Observable<CommentModel>{
    return this.httpClient.put<CommentModel>(this.path+'/'+body.id,body)
      .pipe(catchError(()=>throwError('Error 400!')), map((dt=>dt)))
  }
  removeComment(id:number):Observable<CommentModel>{
    return this.httpClient.delete<CommentModel>(this.path+'/'+id)
      .pipe(catchError(()=>throwError('Error 400!')), map((dt=>dt)))
  }

}
