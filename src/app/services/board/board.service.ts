import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BoardModel} from "../../models/board.model";
import {catchError, map, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BoardService {


  // private path: string='http://localhost:3000/boards'
  // private pathInit: string='http://localhost:3000/boards/dashboard'
  private path: string='https://app-homwork-angular.herokuapp.com/api/boards'
  private pathInit: string='https://app-homwork-angular.herokuapp.com/api/boards/dashboard'

  constructor(private httpClient: HttpClient) { }

  initBoard():Observable<BoardModel[]>{
    return this.httpClient.get<BoardModel[]>(this.path)
      .pipe(catchError(()=>throwError('Error 400!')), map((dt=>dt)))
  }

  initBoardById(id:number):Observable<BoardModel[]>{
    return this.httpClient.get<BoardModel[]>(this.pathInit+'/'+id)
      .pipe(catchError(()=>throwError('Error 400!')), map((dt=>dt)))

  }
  addBoard(body:BoardModel):Observable<BoardModel>{
    return this.httpClient.post<BoardModel>(this.path,body)
      .pipe(catchError(()=>throwError('Error 400!')), map((dt=>dt)))

  }
  editBoard(body:BoardModel):Observable<BoardModel>{
    return this.httpClient.put<BoardModel>(this.path+'/'+body.id,body)
      .pipe(catchError(()=>throwError('Error 400!')), map((dt=>dt)))

  }
  patchBoard(body:BoardModel):Observable<BoardModel>{
    return this.httpClient.put<BoardModel>(this.path+'/'+body.id,body)
      .pipe(catchError(()=>throwError('Error 400!')), map((dt=>dt)))

  }
  removeBoard(id:number):Observable<BoardModel>{
    return this.httpClient.delete<BoardModel>(this.path+'/'+id)
      .pipe(catchError(()=>throwError('Error 400!')), map((dt=>dt)))

  }

}
