import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DashboardModel} from "../../models/dashboard.model";
import {catchError, map, Observable, throwError} from "rxjs";
import {path} from "../../env";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpClient: HttpClient) { }

  initDashboard():Observable<DashboardModel[]>{
    return this.httpClient.get<DashboardModel[]>(path+'/dashboards')
      .pipe(catchError(()=>throwError('Error 400!')), map((dt=>dt)))
  }
  addDashboard(body:DashboardModel):Observable<DashboardModel>{
    return this.httpClient.post<DashboardModel>(path+'/dashboards', body)
      .pipe(catchError(()=>throwError('Error 400!')), map((dt=>dt)))
  }
  editDashboard(body:DashboardModel):Observable<DashboardModel>{
    return this.httpClient.put<DashboardModel>(path+'/dashboards/'+body.id,body)
      .pipe(catchError(()=>throwError('Error 400!')), map((dt=>dt)))
  }
  patchDashboard(body:{id:number,progress:boolean}):Observable<DashboardModel>{
    return this.httpClient.patch<any>(path+'/dashboards/'+body.id,body)
      .pipe(catchError(()=>throwError('Error 400!')), map((dt=>dt)))
  }
  removeDashboard(id:number):Observable<DashboardModel>{
    return this.httpClient.delete<DashboardModel>(path+'/dashboards/'+id)
      .pipe(catchError(()=>throwError('Error 400!')), map((dt=>dt)))
  }


}
