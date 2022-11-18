import {createAction, props} from "@ngrx/store";
import {BoardModel} from "../../models/board.model";

export const initBoard = createAction('[Board] init state', props<{boards: BoardModel[]}>())
export const createBoard = createAction('[Board] create  board', props<BoardModel>())
export const editBoard = createAction('[Board] edit  board', props<BoardModel>())
export const deleteBoard = createAction('[Board] delete  board', props<{id:number}>())
export const deleteBoardByDashboardId = createAction('[Board] delete  board by dashboardId', props<{dashboardId:number}>())
