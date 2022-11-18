import {createFeatureSelector, createSelector} from "@ngrx/store";
import {CommentModel} from "../../models/comment.model";

export const commentFeature = createFeatureSelector<CommentModel[]>('comment')

export const getCommentsByBoardId = createSelector(commentFeature,(state,params)=> state.filter(item => item.boardId === params.id)
)
export const getComments = createSelector(commentFeature,(state)=>state.filter((item,index)=> state))
export const getCommentById = createSelector(commentFeature,(state,params)=>state.find(item=>item.id===params.id))

