import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CommentModel} from "../../models/comment.model";
import {catchError, map, Observable, throwError} from "rxjs";
import {path} from "../../env";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }

  initComment():Observable<CommentModel[]>{
    return this.httpClient.get<CommentModel[]>(path+'/comments')
      .pipe(catchError(()=>throwError('Error 400!')), map((dt=>dt)))
  }

  initCommentById(id:number):Observable<CommentModel[]>{
    return this.httpClient.get<CommentModel[]>(path+'/comments/'+id)
      .pipe(catchError(()=>throwError('Error 400!')), map((dt=>dt)))
  }
  addComment(body:CommentModel):Observable<CommentModel>{
    return this.httpClient.post<CommentModel>(path+'/comments',body)
      .pipe(catchError(()=>throwError('Error 400!')), map((dt=>dt)))
  }
  editComment(body:CommentModel):Observable<CommentModel>{
    return this.httpClient.put<CommentModel>(path+'/comments/'+body.id,body)
      .pipe(catchError(()=>throwError('Error 400!')), map((dt=>dt)))
  }
  patchComment(body:CommentModel):Observable<CommentModel>{
    return this.httpClient.put<CommentModel>(path+'/comments/'+body.id,body)
      .pipe(catchError(()=>throwError('Error 400!')), map((dt=>dt)))
  }
  removeComment(id:number):Observable<CommentModel>{
    return this.httpClient.delete<CommentModel>(path+'/comments/'+id)
      .pipe(catchError(()=>throwError('Error 400!')), map((dt=>dt)))
  }

}
