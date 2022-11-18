import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, Output} from '@angular/core';
import {Store} from "@ngrx/store";
import {ActivatedRoute, Router} from "@angular/router";
import {CommentModel} from "../../../models/comment.model";
import {CommentService} from "../../../services/comment/comment.service";
import {getComments, getCommentsByBoardId} from "../../../reducers/comment/comment.selectors";
import {Observable} from "rxjs";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CommentComponent implements OnInit {

  @Input()  dashboardId:number
  @Input()  boardId:number
  @Input()  selectedColor=JSON.parse(localStorage.getItem('selectedColor'))
  comments: CommentModel[]=[]
  getComment: any
  constructor(
              private commentService: CommentService,
              private store :Store,
              private routeAct: ActivatedRoute,
              private route:Router,
              private ref: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.store.select(getCommentsByBoardId,{id: this.boardId})
      .subscribe(item => {
        this.comments = item
        this.ref.markForCheck()
      })
  }

  addComment(){
    this.route.navigate(['comment-add',this.boardId,this.dashboardId],{relativeTo: this.routeAct})
  }
}
