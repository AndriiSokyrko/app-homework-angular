import {createFeatureSelector, createSelector} from "@ngrx/store";
import {BoardModel} from "../../models/board.model";

export const boardFeature = createFeatureSelector<BoardModel[]>('board')

export const getBoards = createSelector(boardFeature,(state)=> state)
export const getBoardById = createSelector(boardFeature,(state,params:{id:number})=>state.find(item=>item.id===params.id))
export const getBoardsByDashboardId = createSelector(boardFeature,(state,params:{id:number})=>state.filter(item=>item.dashboardId===params.id))

