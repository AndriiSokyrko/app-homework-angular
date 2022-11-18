import { Pipe, PipeTransform } from '@angular/core';
import {DashboardModel} from "../models/dashboard.model";

export type SortOrder = 'asc' | 'desc';

@Pipe({
  name: 'sortDashboard'
})
export class SortDashboardPipe implements PipeTransform {

  transform(value: DashboardModel[], sortOrder: string , sortKey?: string): DashboardModel[] {

    if ((!value || value) && (!sortOrder && !sortKey)) return value;
    let sorted:DashboardModel[] = [];

    if(sortKey==='progress') {
      sorted = value
        .filter(item => typeof item[sortKey] === 'boolean')
        .sort((a, b) => (a[sortKey] !== b[sortKey]) ? 0 : 1)
    }
    if( sortKey==='done') {
      sorted = value
        .filter(item => typeof item[sortKey] === 'boolean')
        .sort((a, b) => !(a[sortKey] !== b[sortKey]) ? 0 : 1)
    }
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
