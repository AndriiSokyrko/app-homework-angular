import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BoardService} from "../../../../services/board/board.service";
import {Store} from "@ngrx/store";
import {ActivatedRoute, Router} from "@angular/router";
import {BoardModel} from "../../../../models/board.model";
import {editBoard} from "../../../../reducers/board/board.actions";
import {getBoardById} from "../../../../reducers/board/board.selectors";
import {catchError, map, throwError} from "rxjs";

@Component({
  selector: 'app-board-card-edit',
  templateUrl: './board-card-edit.component.html',
  styleUrls: ['./board-card-edit.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class BoardCardEditComponent implements OnInit {
  message = null
  active:boolean
  status:string
  selectedColor=null
  dashboardId:number
  id:number

   formBoard = new FormGroup({
    title: new FormControl( '', [Validators.required, Validators.minLength(5)]),
    description: new FormControl( '', [Validators.required, Validators.minLength(5)]),
    status: new FormControl( '', Validators.required)
  });

  constructor(private boardService: BoardService,
              private store:Store,
              private  ref: ChangeDetectorRef,
              private route:Router,
              private routeAct:ActivatedRoute,
  ) {
    this.dashboardId = +this.route.url.split('/')[2]
    this.id = +this.route.url.split('/')[4]
  }

  ngOnInit(): void {
    if (localStorage.getItem('selectedColor')) this.selectedColor = JSON.parse(localStorage.getItem('selectedColor'))

    this.store.select(getBoardById, {id: Number(this.id)})
      .subscribe((board: BoardModel) => {
      if (board !== undefined) {
        const status: string = board.status.todo === true ? 'todo' :
          board.status.progress === true ? 'progress' : 'done'
        this.formBoard.controls['title'].setValue(board.title)
        this.formBoard.controls['description'].setValue(board.description)
        this.formBoard.controls['status'].setValue(status)
      }
    })

  }
  changeBoard(){
    const checkRadio = this.formBoard.controls['status'].value
    return {
      id: this.id,
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
      const board = this.changeBoard()
       this.boardService.editBoard(board)
         .pipe(catchError((err) => throwError('Error 400!')), map(db => db))
         .subscribe(item=>{
        if(item!==undefined){
          this.store.dispatch(editBoard(board))
          this.route.navigate(['/board',this.dashboardId])
        }
      })

  }
}
