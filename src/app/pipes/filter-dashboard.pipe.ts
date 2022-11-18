import { Pipe, PipeTransform } from '@angular/core';
import {DashboardModel} from "../models/dashboard.model";
import {Store} from "@ngrx/store";
import {getBoardById, getBoards, getBoardsByDashboardId} from "../reducers/board/board.selectors";
import {BoardModel} from "../models/board.model";
import {getDashboardById} from "../reducers/dashboard/dashboard.selectors";
import {AppState} from "../reducers/app.state";
@Pipe({
  name: 'filterDashboard'
})
export class FilterDashboardPipe implements PipeTransform {
  constructor(private store:Store  ) {}
  transform(value: DashboardModel[], args): DashboardModel[] {
    if(args==='') return value
    let filter = '.?'+args.toLowerCase()+'.?'
    let regx:RegExp = new RegExp(filter)
    let result = value.filter(val=>val.title.toLowerCase().match(regx))

      this.store.select(getBoards).subscribe((boards:BoardModel[])=>{
      let temps = boards.filter(board=>board.title.toLowerCase().match(args))
      if(temps.length) {
        temps.forEach(temp=>{
          this.store.select(getDashboardById, {id:temp.dashboardId}).subscribe(dashboard=>{
             result.push(dashboard)
          })
        })
      }
    })
    return result.filter((item,index)=>index===result.indexOf(item))
  }

}


