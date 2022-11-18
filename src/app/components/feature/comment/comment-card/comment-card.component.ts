import {Component, Input, OnInit, Output} from '@angular/core';
import {CommentModel} from "../../../../models/comment.model";
import {CommentService} from "../../../../services/comment/comment.service";
import {Store} from "@ngrx/store";
import {deleteComment} from "../../../../reducers/comment/comment.actions";
import {ActivatedRoute, Router} from "@angular/router";
import {getBoardById} from "../../../../reducers/board/board.selectors";

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent implements OnInit {
  @Input() comment:CommentModel
  @Input() selectedColor= JSON.parse(localStorage.getItem('selectedColor'))
  constructor(
    private commentService: CommentService,
    private store: Store,
    private router: Router,
    private routerAct: ActivatedRoute
  ) { }

  ngOnInit(): void { }
  commentAdd(){
    this.router.navigate(['comment-add',this.comment.boardId,this.comment.dashboardId],{relativeTo:this.routerAct})

  }

  commentEdit(){
      this.router.navigate(['comment-edit',this.comment.id],{relativeTo:this.routerAct})
  }
  commentDelete(){
    this.commentService.removeComment(this.comment.id).subscribe(item=>{
      this.store.dispatch(deleteComment({id:this.comment.id}))
    })
  }

}
