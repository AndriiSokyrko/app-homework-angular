import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BoardModel} from "../../models/board.model";
import {catchError, map, Observable, throwError} from "rxjs";
import {path} from "../../env";

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private httpClient: HttpClient) { }

  initBoard():Observable<BoardModel[]>{
    return this.httpClient.get<BoardModel[]>(path+'/boards')
      .pipe(catchError(()=>throwError('Error 400!')), map((dt=>dt)))
  }

  initBoardById(id:number):Observable<BoardModel[]>{
    return this.httpClient.get<BoardModel[]>(path+'/boards/'+id)
      .pipe(catchError(()=>throwError('Error 400!')), map((dt=>dt)))

  }
  addBoard(body:BoardModel):Observable<BoardModel>{
    return this.httpClient.post<BoardModel>(path+'/boards',body)
      .pipe(catchError(()=>throwError('Error 400!')), map((dt=>dt)))

  }
  editBoard(body:BoardModel):Observable<BoardModel>{
    return this.httpClient.put<BoardModel>(path+'/boards/'+body.id,body)
      .pipe(catchError(()=>throwError('Error 400!')), map((dt=>dt)))

  }
  patchBoard(body:BoardModel):Observable<BoardModel>{
    return this.httpClient.put<BoardModel>(path+'/boards/'+body.id,body)
      .pipe(catchError(()=>throwError('Error 400!')), map((dt=>dt)))

  }
  removeBoard(id:number):Observable<BoardModel>{
    return this.httpClient.delete<BoardModel>(path+'/boards/'+id)
      .pipe(catchError(()=>throwError('Error 400!')), map((dt=>dt)))

  }

}
