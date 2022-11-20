import {ChangeDetectionStrategy, Component, Input, Output} from '@angular/core';
import {Store} from "@ngrx/store";
import {initUsers} from "./reducers/user/user.actions";
import {Router} from "@angular/router";
import {initBoard} from "./reducers/board/board.actions";
import {BoardService} from "./services/board/board.service";
import {initDashboard} from "./reducers/dashboard/dashboard.actions";
import {DashboardService} from "./services/dashboard/dashboard.service";
import {initComment} from "./reducers/comment/comment.actions";
import {CommentService} from "./services/comment/comment.service";
import {getColor} from "./reducers/color/color.selector";
import {changeColor, initColor} from "./reducers/color/color.action";
import {AuthService} from "./services/auth/auth.service";
import {boards,dashboards,comments,users} from "./mocks/mock-dates"
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  filter: string
  selectedColor:string[]
    //=['#D9D0D0','D0D0D0','D0EbEb']

  constructor(private store: Store,
              private router: Router,
              private userService: AuthService,
              private boardService: BoardService,
              private dashboardService: DashboardService,
              private commentService: CommentService)
  {}
  setFilter(val) {
    this.filter = val
  }

  ngOnInit() {

      if(localStorage.getItem('selectedColor')) {
        const color = JSON.parse(localStorage.getItem('selectedColor'))
        this.store.dispatch(changeColor({color}))
      }

      this.store.select(getColor).subscribe(color=>{
        this.selectedColor = color
      })

    this.dashboardService.initDashboard().subscribe(item => {
        this.store.dispatch(initDashboard({dashboards: item}))
      })

      this.boardService.initBoard().subscribe(item => {
        this.store.dispatch(initBoard({boards: item}))
      })

      this.commentService.initComment().subscribe(item => {
          this.store.dispatch(initComment({comments: item}))
      })

      this.userService.getUsers().subscribe( item => {
        this.store.dispatch(initUsers({users: item}))
      })

  }
}
