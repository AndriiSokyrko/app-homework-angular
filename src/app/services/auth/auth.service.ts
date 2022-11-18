import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserModel} from "../../models/user.model";
import { Observable } from 'rxjs/internal/Observable';
import {catchError, map, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private path= 'http://localhost:3000/users'
  private pathFindByName= 'http://localhost:3000/users/get-user'
  constructor(private httpClient: HttpClient) { }

  public getUsers():Observable<UserModel[]>{
    return  this.httpClient.get<UserModel[]>(this.path)
      .pipe(catchError(()=>throwError('Error 400!')), map(dt=>dt))
  }

  public getUserByName(name:string):Observable<UserModel[]>{
    return  this.httpClient.get<UserModel[]>(this.pathFindByName+'/'+name)
      .pipe(catchError(()=>throwError('Error 400!')), map(dt=>dt))
  }

  getUserById(id:number):Observable<UserModel>{
    return this.httpClient.get<UserModel>(this.path+'/'+id)
      .pipe(catchError(()=>throwError('Error 400!')), map(dt=>dt))

  }

  addUser(body:UserModel):Observable<UserModel>{
     return this.httpClient.post<UserModel>(this.path,body)
       .pipe(catchError(()=>throwError('Error 400!')), map(dt=>dt))

  }


}
