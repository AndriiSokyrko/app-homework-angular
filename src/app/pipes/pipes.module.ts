import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FilterDashboardPipe} from "./filter-dashboard.pipe";
import { SortDashboardPipe } from './sort-dashboard.pipe';
import {FilterBoardPipe} from "./filter-board.pipe";
import {SortBoardPipe} from "./sort-board.pipe";



@NgModule({
  declarations: [
    FilterDashboardPipe,
    SortDashboardPipe,
    FilterBoardPipe,
    SortBoardPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FilterDashboardPipe,
    SortDashboardPipe,
    FilterBoardPipe,
    SortBoardPipe

  ]
})
export class PipesModule { }
