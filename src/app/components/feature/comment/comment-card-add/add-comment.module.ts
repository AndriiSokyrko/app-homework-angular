import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommentCardAddComponent} from "./comment-card-add.component";

const routes: Routes = [
  {path:"", component: CommentCardAddComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddCommentModule { }
