import {ChangeDetectorRef, Component, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BoardService} from "../../../../services/board/board.service";
import {Store} from "@ngrx/store";
import {ActivatedRoute, Router} from "@angular/router";
import {createBoard, initBoard} from "../../../../reducers/board/board.actions";
import {DashboardService} from "../../../../services/dashboard/dashboard.service";

@Component({
  selector: 'app-board-card-add',
  templateUrl: './board-card-add.component.html',
  styleUrls: ['./board-card-add.component.scss']
})
export class BoardCardAddComponent implements OnInit  {
  message = null
  active:boolean
  selectedColor:string[]
  dashboardId:number

  formBoard = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(5)]),
    description: new FormControl('', [Validators.required, Validators.minLength(5)]),
    status: new FormControl('todo',Validators.required),
  });
  constructor(private boardService: BoardService,
              private dashboardService: DashboardService,
              private store:Store,
              private  ref: ChangeDetectorRef,
              private route:Router,
              private routeAct:ActivatedRoute,

  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('selectedColor')) this.selectedColor = JSON.parse(localStorage.getItem('selectedColor'))
    this.dashboardId = +this.route.url.split('/')[2]
  }
  newBoard(){
    const checkRadio = this.formBoard.controls['status'].value
   return  {
      title:this.formBoard.controls['title'].value,
      description:this.formBoard.controls['description'].value,
      dashboardId: Number(this.dashboardId),
      date: new Date().toLocaleDateString(),
      status: {
        todo: checkRadio==='todo'?true:false,
        progress: checkRadio==='progress'?true:false,
        done: checkRadio==='done'?true:false
      }
    }
  }
    onSubmit(){
    const board = this.newBoard()
      this.boardService.addBoard(board)
        .subscribe(item => {
          if (item !== undefined) {
            this.store.dispatch(createBoard(item))
            this.dashboardService.patchDashboard({id: board.dashboardId, progress: true})
              .subscribe(dt => dt)
            this.route.navigate(['/board/', this.dashboardId])
          }
        })
  }
}
