import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CommentComponent} from "./comment.component";
import {CommentCardAddComponent} from "./comment-card-add/comment-card-add.component";
import {CommentCardEditComponent} from "./comment-card-edit/comment-card-edit.component";
import {ModalComponent} from "../../shared/modal/modal.component";
import {ButtonComponent} from "../../shared/button/button.component";

const routes: Routes = [
  {path:"", component: CommentComponent,
    children:[
      {path:'add-comment/:boardId/:dashboardId',component: CommentCardAddComponent},
      {path:'edit-comment/:id',component: CommentCardEditComponent },
    ]
  }
]

@NgModule({
  declarations:[ModalComponent,ButtonComponent],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentModule { }
