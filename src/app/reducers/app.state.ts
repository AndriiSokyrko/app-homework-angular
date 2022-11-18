import {BoardModel} from "../models/board.model";
import {DashboardModel} from "../models/dashboard.model";
import {CommentModel} from "../models/comment.model";

export interface AppState {
  board: ReadonlyArray<BoardModel>;
  dashboard: ReadonlyArray<DashboardModel>;
  comment: ReadonlyArray<CommentModel>;
}
