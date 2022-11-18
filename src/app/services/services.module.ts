import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthService} from "./auth/auth.service";
import {DashboardService} from "./dashboard/dashboard.service";
import {BoardService} from "./board/board.service";
import {CommentService} from "./comment/comment.service";



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,

  ],
  providers:[
    AuthService,
    DashboardService,
    BoardService,
    CommentService,

  ]
})
export class ServicesModule {

}
