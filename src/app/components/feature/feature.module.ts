import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BoardComponent } from './board/board.component';
import { DashCardComponent } from './dashboard/dash-card/dash-card.component';
import { DashCardEditComponent } from './dashboard/dash-card-edit/dash-card-edit.component';
import { DashCardAddComponent } from './dashboard/dash-card-add/dash-card-add.component';
import { BoardCardComponent } from './board/board-card/board-card.component';
import { BoardCardEditComponent } from './board/board-card-edit/board-card-edit.component';
import { BoardCardAddComponent } from './board/board-card-add/board-card-add.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {PipesModule} from "../../pipes/pipes.module";
import { CommentComponent } from './comment/comment.component';
import { CommentCardComponent } from './comment/comment-card/comment-card.component';
import { CommentCardAddComponent } from './comment/comment-card-add/comment-card-add.component';
import { CommentCardEditComponent } from './comment/comment-card-edit/comment-card-edit.component';
import {TopMenuModule} from "../core/top-menu/top-menu.module";
import {ModalModule} from "../shared/modal/modal.module";
import {ButtonModule} from "../shared/button/button.module";
import { BoardSectionComponent } from './board/board-section/board-section.component';

@NgModule({
  declarations: [
    DashboardComponent,
    DashCardComponent,
    DashCardEditComponent,
    DashCardAddComponent,
    BoardComponent,
    BoardCardComponent,
    BoardCardEditComponent,
    BoardCardAddComponent,
    BoardSectionComponent,
    LoginComponent,
    RegistrationComponent,
    CommentComponent,
    CommentCardComponent,
    CommentCardAddComponent,
    CommentCardEditComponent,


  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PipesModule,
    RouterModule,
    ModalModule,
    TopMenuModule,
    ButtonModule,
    SharedModule
  ],
  exports:[
    BoardCardComponent,

  ]
})
export class FeatureModule { }
