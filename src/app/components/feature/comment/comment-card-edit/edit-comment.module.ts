import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommentCardEditComponent} from "./comment-card-edit.component";

const routes: Routes = [
  {path:"", component: CommentCardEditComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditCommentModule { }
