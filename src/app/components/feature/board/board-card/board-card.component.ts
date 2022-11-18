import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {Store} from "@ngrx/store";
import {ActivatedRoute, Router} from "@angular/router";
import {BoardService} from "../../../../services/board/board.service";
import {deleteBoard, editBoard} from "../../../../reducers/board/board.actions";
import {BoardModel} from "../../../../models/board.model";
import {getBoardById, getBoards, getBoardsByDashboardId} from "../../../../reducers/board/board.selectors";
import {getDashboardById} from "../../../../reducers/dashboard/dashboard.selectors";
import {editDashboard} from "../../../../reducers/dashboard/dashboard.actions";
import {DashboardService} from "../../../../services/dashboard/dashboard.service";
import {DashboardModel} from "../../../../models/dashboard.model";
import {catchError, map, throwError} from "rxjs";
import {getColor} from "../../../../reducers/color/color.selector";

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardCardComponent implements OnInit {
  @Input() board:BoardModel
  selectedColor: string[]
  @Input() archive:boolean=false
  archiveBoard: DashboardModel
  @Output() messageArchive:EventEmitter<void>= new EventEmitter<void>()
  dashboardId: number

  constructor(private boardService: BoardService,
              private dashboardService : DashboardService,
              private store:Store,
              private ref: ChangeDetectorRef,
              private route:Router,
              private routeAct: ActivatedRoute,
  ){}

  ngOnInit(): void {
    this.store.select(getColor).subscribe(color=> {
      this.selectedColor = color
      this.ref.markForCheck()
    })
    this.checkAddToArchiveAndUpdate(this.board)
    this.dashboardId = this.board.dashboardId
  }

  onEdit(){
    this.route.navigate([ 'edit-board',this.board.id],{relativeTo: this.routeAct})
  }

  onDelete() {
      this.boardService.removeBoard(this.board.id)
      .subscribe(board => {
        this.store.dispatch(deleteBoard({id: this.board.id}))
        this.route.navigate(['board', this.board.dashboardId])
      })
  }

  onArchive() {
    let archiveBoard: DashboardModel
    this.store.select(getDashboardById, {id: this.board.dashboardId}).subscribe(item => {
      let temp = {...item, progress: false, done: true, archive: true}
      archiveBoard = temp
    })
      this.dashboardService.editDashboard(archiveBoard)
      .subscribe(item => {
          // this.editDashboardInStore(item)
        this.store.dispatch(editDashboard(item))
          this.messageArchive.emit()
      })
  }
  //additional option
  shiftToNextColumn() {
    const checkStatus = this.board.status.todo ? 'progress' : this.board.status.progress ? 'done' : 'todo'
    const updatedBoard = {...this.board, status: {todo: false, progress: false, done: false}}
    updatedBoard.status[checkStatus] = true
    this.boardService.editBoard(updatedBoard).subscribe(item => {
        this.store.dispatch(editBoard(item))
    })
    this.checkAddToArchiveAndUpdate(updatedBoard)
  }
   checkAddToArchiveAndUpdate(board) {
    //check can to add to archive or not
    let checkAllDone: boolean= false
      this.store.select(getBoardsByDashboardId, {id: board.dashboardId})
       .subscribe(boards => {
         //If all are done then can to add archive
           checkAllDone = boards.reduce((acc, elm) =>
               elm.status.done === false ? false : acc
             , true)
         if(checkAllDone) {
           this.archive = true
           this.ref.markForCheck()
         }
    })
  }
  onDragStart(event) {
    event.dataTransfer.setData('board', JSON.stringify(this.board))
  }

  onDragLeave(event){
    event.preventDefault()
  }

}
