import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DashboardModel} from "../../models/dashboard.model";
import {catchError, map, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private path: string='http://localhost:3000/dashboards'

  constructor(private httpClient: HttpClient) { }

  initDashboard():Observable<DashboardModel[]>{
    return this.httpClient.get<DashboardModel[]>(this.path)
      .pipe(catchError(()=>throwError('Error 400!')), map((dt=>dt)))
  }
  addDashboard(body:DashboardModel):Observable<DashboardModel>{
    return this.httpClient.post<DashboardModel>(this.path, body)
      .pipe(catchError(()=>throwError('Error 400!')), map((dt=>dt)))
  }
  editDashboard(body:DashboardModel):Observable<DashboardModel>{
    return this.httpClient.put<DashboardModel>(this.path+'/'+body.id,body)
      .pipe(catchError(()=>throwError('Error 400!')), map((dt=>dt)))
  }
  patchDashboard(body:{id:number,progress:boolean}):Observable<DashboardModel>{
    return this.httpClient.patch<any>(this.path+'/'+body.id,body)
      .pipe(catchError(()=>throwError('Error 400!')), map((dt=>dt)))
  }
  removeDashboard(id:number):Observable<DashboardModel>{
    return this.httpClient.delete<DashboardModel>(this.path+'/'+id)
      .pipe(catchError(()=>throwError('Error 400!')), map((dt=>dt)))
  }


}
