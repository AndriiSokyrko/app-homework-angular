import {createFeatureSelector, createSelector} from "@ngrx/store";
import {DashboardModel} from "../../models/dashboard.model";

export const dashboardFeature = createFeatureSelector<DashboardModel[]>('dashboard')

export const getDashboards = createSelector(dashboardFeature,(state)=>state)
export const getDashboardById = createSelector(dashboardFeature,(state,params:{id:number})=>state.find(item=>item.id===params.id))
