import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {DashboardModel} from "../../../../models/dashboard.model";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {DashboardService} from "../../../../services/dashboard/dashboard.service";
import {deleteDashboard, editDashboard} from "../../../../reducers/dashboard/dashboard.actions";
import {getDashboards} from "../../../../reducers/dashboard/dashboard.selectors";
import {catchError, map, throwError} from "rxjs";
import {deleteBoard, deleteBoardByDashboardId} from "../../../../reducers/board/board.actions";
import {getBoardsByDashboardId} from "../../../../reducers/board/board.selectors";
import {BoardService} from "../../../../services/board/board.service";
import {BoardModel} from "../../../../models/board.model";
import {deleteComment} from "../../../../reducers/comment/comment.actions";

@Component({
  selector: 'app-dash-card',
  templateUrl: './dash-card.component.html',
  styleUrls: ['./dash-card.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class DashCardComponent implements OnInit {
  message:string=''
  @Input() dashboard:DashboardModel
  @Input() selectedColor:string[]= JSON.parse(localStorage.getItem('selectedColor'))


  constructor(private route: Router,
              private store:Store,
              private dashboardService: DashboardService,
              private boardService: BoardService,
              private ref: ChangeDetectorRef
  ) { }
  ngOnInit(): void {}

  onEdit() {
     this.route.navigate(['/dashboard/edit-dashboard', this.dashboard.id],{ skipLocationChange: false })
  }

  onOpenBoard() {
    this.route.navigate(['/board', this.dashboard.id],{skipLocationChange:false})
  }

  deleteDashboardStore(id:number){
      this.store.dispatch(deleteDashboard({id}))
  }

  getBoardsByDashboardId(){
    let boardsForDelete:BoardModel[]=[]
    this.store.select(getBoardsByDashboardId, {id: this.dashboard.id})
      .subscribe(boards => {
        boardsForDelete = boards
      })
    return boardsForDelete
  }

    deleteBoards(boardsForDelete) {
      boardsForDelete.forEach(async board => {
        await this.boardService.removeBoard(board.id)
        await this.store.dispatch(deleteBoard({id: board.id}))
        await this.store.dispatch(deleteComment({id: this.dashboard.id}))
      })
    }
  deleteDashboardService(){
      this.dashboardService.removeDashboard(this.dashboard.id)
      .subscribe(dashboard => {
        this.store.dispatch(deleteDashboard({id: this.dashboard.id}))
      })
  }
  onDelete() {
     this.deleteDashboardService()
     const boardsForDelete = this.getBoardsByDashboardId()
     if(boardsForDelete.length) {
      this.deleteBoards(boardsForDelete)
    }

  }

}
