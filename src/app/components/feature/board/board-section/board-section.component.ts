import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input, OnChanges,
  OnInit,
  Output, SimpleChanges
} from '@angular/core';
import {BoardModel} from "../../../../models/board.model";
import {DashboardModel} from "../../../../models/dashboard.model";
import {Store} from "@ngrx/store";
import {getBoards, getBoardsByDashboardId} from "../../../../reducers/board/board.selectors";
import {catchError, filter, map, Observable, throwError} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {getColor} from "../../../../reducers/color/color.selector";

@Component({
  selector: 'app-board-section',
  templateUrl: './board-section.component.html',
  styleUrls: ['./board-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class BoardSectionComponent implements OnInit {
  // @Input() selectedColor:string[]= JSON.parse(localStorage.getItem('selectedColor'))
  selectedColor:string[]
  @Input() archive:boolean=false
  @Input() statusName: string
  @Input() title:string
  @Input() filter: string = ''
  @Input() sortName: string = 'asc'
  @Input() fieldName: string = 'title'
  @Output() setNewColor:EventEmitter<string[]> = new EventEmitter<string[]>()
  @Output() updatePage: EventEmitter<any> = new EventEmitter<any>()
  @Output() messageArchiveFn: EventEmitter<any> = new EventEmitter<any>()
  dashboardId:number
  boards$:  Observable<BoardModel[]>=null
  constructor(private ref: ChangeDetectorRef,
              private store:Store,
              private routeAct: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.store.select(getColor).subscribe(color=> {
      this.selectedColor = color
      this.ref.markForCheck()
    })
    this.dashboardId = Number(this.routeAct.snapshot.params['id']) //id dashboard
    this.boards$ = this.store.select(getBoardsByDashboardId,{id: this.dashboardId})
      .pipe(map(item=> item.filter(elm=>elm.status[this.statusName]===true)))
    // this.updatePage.emit()
    this.ref.markForCheck()
  }
  changeColor(val){
    this.selectedColor=val
    this.setNewColor.emit(this.selectedColor)
  }
  archiveChange(val){
    this.archive = val.archive
  }
  messageArchive(){
      this.messageArchiveFn.emit()
  }
  updatePageFn(){
    this.ref.markForCheck()
    this.updatePage.emit()
  }
}
