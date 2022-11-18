import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {BoardComponent} from "./board.component";
import {BoardCardAddComponent} from "./board-card-add/board-card-add.component";
import {BoardCardEditComponent} from "./board-card-edit/board-card-edit.component";
import {AuthGuardGuard} from "../../../guards/auth-guard.guard";
import {CommentCardAddComponent} from "../comment/comment-card-add/comment-card-add.component";
import {CommentCardEditComponent} from "../comment/comment-card-edit/comment-card-edit.component";
import { BoardSectionComponent } from './board-section/board-section.component';
import {ButtonModule} from "../../shared/button/button.module";
import {PipesModule} from "../../../pipes/pipes.module";
import {FeatureModule} from "../feature.module";

const routes: Routes = [
  {path:":id", component: BoardComponent,
    children:[
      {path:'add-board', loadChildren: () => import('./board-card-add/add-board.module').then(m=>m.AddBoardModule)},
      {path:'edit-board/:id',loadChildren: () => import('./board-card-edit/edit-board.module').then(m=>m.EditBoardModule)},
      {path:"comment-add/:boardId/:dashboardId", loadChildren: () => import('../comment/comment-card-add/add-comment.module').then(m=>m.AddCommentModule)},
      {path:"comment-edit/:id", loadChildren: () => import('../comment/comment-card-edit/edit-comment.module').then(m=>m.EditCommentModule)},

    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes), ButtonModule, PipesModule, FeatureModule],
  exports: [RouterModule],
  declarations: [

  ]
})
export class BoardModule { }
