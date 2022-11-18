import {createAction, props} from "@ngrx/store";
import {CommentModel} from "../../models/comment.model";

export const initComment = createAction('[Comment] init state', props<{comments: CommentModel[]}>())
export const createComment = createAction('[Comment] create  comment', props<CommentModel>())
export const editComment = createAction('[Comment] edit  comment', props<CommentModel>())
export const deleteComment = createAction('[Comment] delete  comment', props<{id:number}>())
export const deleteComments = createAction('[Comment] delete  comment', props<{id:number}>())
