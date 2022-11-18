import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {editBoard} from "../../../reducers/board/board.actions";
import {BoardService} from "../../../services/board/board.service";
import {Store} from "@ngrx/store";
import {DashboardService} from "../../../services/dashboard/dashboard.service";
import {getDashboardById} from "../../../reducers/dashboard/dashboard.selectors";
import {editDashboard, patchDashboard} from "../../../reducers/dashboard/dashboard.actions";
import {getBoardsByDashboardId} from "../../../reducers/board/board.selectors";
import {Observable} from "rxjs";
import {DashboardModel} from "../../../models/dashboard.model";

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent implements OnInit {
  @Input() name: string=''
  @Input() statusName: string=''
  @Input() styles:{}
  @Input() url:string='add-dashboard'
  @Output() updatePage = new EventEmitter()
  @Output() archiveChange = new EventEmitter()
  archiveBoard:DashboardModel
  id:string=''
  constructor(private route:Router, private routeAct:ActivatedRoute,
              private store: Store, private  boardService : BoardService,
              private dashboardService: DashboardService,
  ) {}

  ngOnInit(): void {
    this.id = this.routeAct.snapshot.params['id']
  }
  onClick(){
    const id= this.id===undefined?'':this.id
    const urlPath=this.url.split('-')
    this.updatePage.emit()
    this.route.navigate([urlPath[1]+'/'+id+'/'+this.url])
  }
  onDragOver(event) {
    event.preventDefault()
  }

  onDrop(event) {
    const board = JSON.parse(event.dataTransfer.getData("board"))
    const updatedBoard = {...board,status:{todo:false,progress:false,done:false }}
    updatedBoard.status[this.statusName]=true
    const updDash ={id:board.dashboardId, progress: false,done: false, archive:false}
    updDash[this.statusName]=true

    this.dashboardService.patchDashboard(updDash).subscribe(dt=>{
      this.store.dispatch(editDashboard(dt))
    })
    this.boardService.editBoard(updatedBoard).subscribe(item=>{
      if(item!==undefined){
        this.store.dispatch(editBoard(item))
        this.checkStatusName(updatedBoard)
      }
    })

  }

  checkStatusName(board){
      this.store.select(getBoardsByDashboardId, {id: board.dashboardId}).subscribe(boards => {
        let checkAllDone: boolean = boards.reduce((acc, elm) =>
            elm.status.done === false ? false : acc
          , true)

          this.store.select(getDashboardById, {id: board.dashboardId}).subscribe(item => {
            let temp = {...item, progress: false, done: true, archive: true}
            if (checkAllDone) {
              // this.archiveChange.emit({archive: true, board: temp})
              this.archiveChange.emit({archive: true})

            } else{
              this.archiveChange.emit({archive: false})
            }
          })

        })

  }
}
