import {createFeatureSelector, createSelector} from "@ngrx/store";
import {UserModel} from "../../models/user.model";

export const createFeature = createFeatureSelector<UserModel[]>('user')
export const getUsers = createSelector(createFeature,(state:UserModel[])=>state)

