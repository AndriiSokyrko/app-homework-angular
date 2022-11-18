import {BoardModel} from "../../models/board.model";
import {createReducer, on} from "@ngrx/store";
import {initBoard, createBoard, editBoard, deleteBoard, deleteBoardByDashboardId} from "./board.actions";

export const initState:BoardModel[]=[]

export const boardReducer = createReducer(initState,
  on(initBoard,( state, props)=>[...state, ...props.boards]),
  on(createBoard,( state, props)=>[...state, props]),
  on(editBoard,( state, props)=>state.map(item=>item.id===props.id ? props : item)),
  on(deleteBoard,( state, props)=>state.filter(item=>item.id!==props.id )),
  on(deleteBoardByDashboardId,( state, props)=>state.filter(item=>item.dashboardId!==props.dashboardId ))
)
