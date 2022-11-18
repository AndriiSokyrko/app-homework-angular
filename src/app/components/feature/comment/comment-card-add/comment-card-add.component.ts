import {ChangeDetectionStrategy, Component, Input, OnInit, Output} from '@angular/core';
import {CommentModel} from "../../../../models/comment.model";
import {Store} from "@ngrx/store";
import {CommentService} from "../../../../services/comment/comment.service";
import {ActivatedRoute, Router} from "@angular/router";
import {createComment} from "../../../../reducers/comment/comment.actions";

@Component({
  selector: 'app-comment-card-add',
  templateUrl: './comment-card-add.component.html',
  styleUrls: ['./comment-card-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentCardAddComponent implements OnInit {
  textInput: string
  @Input()  selectedColor=JSON.parse(localStorage.getItem('selectedColor'))
  constructor(
    private  store:Store,
    private  commentService: CommentService,
    private  router : Router,
    private  routerAct : ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  newComment(){
    const boardId = this.routerAct.snapshot.params['boardId']
    const dashboardId = this.routerAct.snapshot.params['dashboardId']
    return  {
      "boardId": +boardId,
      "dashboardId": +dashboardId,
      "text": this.textInput,
      "userId": +localStorage.getItem('login'),
      "date": new Date().toLocaleDateString()
    }
  }
  onSubmit(){
   const body = this.newComment()
    this.commentService.addComment(body).subscribe(item=>{
      this.store.dispatch(createComment(item))
      this.router.navigate(['board', body.dashboardId])
    })
  }
  onChange(val){
    this.textInput= val
  }
}

