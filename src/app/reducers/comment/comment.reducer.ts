import {createReducer, on} from "@ngrx/store";
import {CommentModel} from "../../models/comment.model";
import {initComment ,createComment, editComment, deleteComment, deleteComments} from "./comment.actions";
import {deleteBoardByDashboardId} from "../board/board.actions";

export const initState:CommentModel[]=[]

export const commentReducer = createReducer(initState,
  on(initComment,( state, props)=>[...state, ...props.comments]),
  on(createComment,( state, props)=>[...state, props]),
  on(editComment,( state, props)=>state.map(item=>item.id===props.id ? props : item)),
  on(deleteComment,( state, props)=>state.filter(item=>item.id!==props.id )),
  on(deleteComments,( state, props)=>state.filter(item=>item.dashboardId!==props.id ))

)
