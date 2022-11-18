import {createFeatureSelector, createSelector} from "@ngrx/store";
import {BoardModel} from "../../models/board.model";

export const colorFeature = createFeatureSelector<string[]>('color')

export const getColor = createSelector(colorFeature,(state)=>state)
