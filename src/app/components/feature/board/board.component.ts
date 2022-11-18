import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, Inject,
  Injectable,
  Input,
  NgZone, OnChanges,
  OnInit,
  Output, SimpleChanges
} from '@angular/core';
import {BoardService} from "../../../services/board/board.service";
import {Store} from "@ngrx/store";
import {ActivatedRoute, Router} from "@angular/router";
import {CommentService} from "../../../services/comment/comment.service";
import {DashboardModel} from "../../../models/dashboard.model";
import {getColor} from "../../../reducers/color/color.selector";


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent implements OnInit  {
  message: string
  messageArchived: string
  checkInitComments: boolean =false
  filter: string = ''
  sortName: string = 'asc'
  fieldName: string = 'id'
  archive: boolean=false

  // archiveDashboard: DashboardModel
  selectedColor:string[]

  constructor(private ref: ChangeDetectorRef ,private store:Store){}

  ngOnInit(): void {
    this.store.select(getColor).subscribe(color=> {
      this.selectedColor = color
      this.ref.markForCheck()
    })
  }

  changeColor(val){
    this.selectedColor=val
  }
  changeStrFilter(val){
    this.filter = val
  }
  changeSortName(val){
    this.sortName= val
  }
  changeFieldName(val){
    this.fieldName= val
  }
  messageArchive(){
    this.messageArchived='Board is archived'
  }
  updatePage(){
    this.ref.markForCheck()
  }
}
