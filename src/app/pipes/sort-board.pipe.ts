import { Pipe, PipeTransform } from '@angular/core';
import {BoardModel} from "../models/board.model";
import {DashboardModel} from "../models/dashboard.model";

export type SortOrder = 'asc' | 'desc';

@Pipe({
  name: 'sortBoard'
})
export class SortBoardPipe implements PipeTransform {

  transform(value: BoardModel[], sortOrder: string , sortKey?: string): BoardModel[] {
    if ((!value || value) && (!sortOrder && !sortKey)) return value;
    let sorted:BoardModel[] = [];


    if(sortKey=== "id"||"title"||"description") {
      sorted = value
        .filter(item => typeof item[sortKey] === 'string'||'number')
        .sort((a, b) => {
          if (a[sortKey] < b[sortKey]) return -1;
          else if (a[sortKey] > b[sortKey]) return 1;
          else return 0;
        })
    }
    if(sortKey=== "date") {
      sorted = value
        .filter(item => typeof item[sortKey] === 'string')
        .sort((a, b) => Number(a[sortKey]) - Number(b[sortKey] ))
    }
    return sortOrder === 'asc' ? sorted : sorted.reverse();
  }

}
