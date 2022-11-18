import {createAction, props} from "@ngrx/store";
import {UserModel} from "../../models/user.model";

export const initUsers = createAction('[Users] init user to reducer', props<{ users :UserModel[] } >())
export const addUser = createAction('[Users] create user ',props<UserModel>())
