import {UserModel} from "../../models/user.model";
import {createReducer, on} from "@ngrx/store";
import {addUser, initUsers} from "./user.actions";


export const initState:UserModel[] = []
export const userReduser = createReducer(initState,
  on(initUsers,(state, props)=>[...state,...props.users]),
  on(addUser,(state, props)=>[...state,props])
  )
