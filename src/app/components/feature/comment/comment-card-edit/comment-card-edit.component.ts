import {Component, Inject, Input, OnInit, Output} from '@angular/core';
import {CommentModel} from "../../../../models/comment.model";
import {Store} from "@ngrx/store";
import {CommentService} from "../../../../services/comment/comment.service";
import {ActivatedRoute, Router} from "@angular/router";
import {getCommentById} from "../../../../reducers/comment/comment.selectors";
import {editComment} from "../../../../reducers/comment/comment.actions";


@Component({
  selector: 'app-comment-card-edit',
  templateUrl: './comment-card-edit.component.html',
  styleUrls: ['./comment-card-edit.component.scss']
})
export class CommentCardEditComponent implements OnInit {
  @Input()  selectedColor=JSON.parse(localStorage.getItem('selectedColor'))
  @Output() boardId:number
  comment:CommentModel
  // commentId:number
  textInput: string
  constructor(
    private  store:Store,
    private  commentService: CommentService,
    private  router : Router,
    private  routerAct : ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const commentId = this.routerAct.snapshot.params['id']
    const getComment =this.store.select(getCommentById,{id: Number(commentId)}).subscribe(item=>{
      if(item!==undefined) {
        this.comment = item
      }
    })
    getComment.unsubscribe()
  }
  changeComment(){
    return {
      "id": this.comment.id,
      "boardId": this.comment.boardId,
      "dashboardId": this.comment.dashboardId,
      "text": this.textInput,
      "userId": this.comment.userId,
      "date": new Date().toLocaleDateString()
    }
  }
  onSubmit(){
    const body:CommentModel = this.changeComment()
    this.commentService.editComment(body).subscribe(item=>{
      this.store.dispatch(editComment(body))
      this.router.navigate(['board', this.comment.dashboardId])
    })
  }

  onChange(val){
      this.textInput= val
  }
}
