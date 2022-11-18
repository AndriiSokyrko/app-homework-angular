import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import {UserModel} from "../models/user.model";
import {userReduser} from "./user/user.reducer";
import {DashboardModel} from "../models/dashboard.model";
import {dashboardReducer} from "./dashboard/dashboard.reducer";
import {BoardModel} from "../models/board.model";
import {boardReducer} from "./board/board.reducer";
import {CommentModel} from "../models/comment.model";
import {commentReducer} from "./comment/comment.reducer";
import {colorReducer} from "./color/color.reducer";

export interface State {
  user:UserModel[],
  dashboard:DashboardModel[],
  board:BoardModel[],
  comment: CommentModel[],
  color:string[],

}

export const reducers: ActionReducerMap<State> = {
    user: userReduser,
    dashboard: dashboardReducer,
    board: boardReducer,
    comment: commentReducer,
    color:colorReducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
