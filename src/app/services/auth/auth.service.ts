import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserModel} from "../../models/user.model";
import { Observable } from 'rxjs/internal/Observable';
import {catchError, map, throwError} from "rxjs";
import {path} from "../../env"
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient) { }

  public getUsers():Observable<UserModel[]>{
    return  this.httpClient.get<UserModel[]>(path+'/users')
      .pipe(catchError(()=>throwError('Error 400!')), map(dt=>dt))
  }

  public getUserByName(name:string):Observable<UserModel[]>{
    return  this.httpClient.get<UserModel[]>(path+'/users/get-user/'+name)
      .pipe(catchError(()=>throwError('Error 400!')), map(dt=>dt))
  }

  getUserById(id:number):Observable<UserModel>{
    return this.httpClient.get<UserModel>(path+'/users/'+id)
      .pipe(catchError(()=>throwError('Error 400!')), map(dt=>dt))

  }

  addUser(body:UserModel):Observable<UserModel>{
     return this.httpClient.post<UserModel>(path+'/users/',body)
       .pipe(catchError(()=>throwError('Error 400!')), map(dt=>dt))

  }


}
