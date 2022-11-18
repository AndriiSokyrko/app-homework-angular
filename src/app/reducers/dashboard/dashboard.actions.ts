import {createAction, props} from "@ngrx/store";
import {DashboardModel} from "../../models/dashboard.model";

export const initDashboard = createAction('[Dashboard] init state', props<{dashboards: DashboardModel[]}>())
export const createDashboard = createAction('[Dashboard] create dashboard', props<DashboardModel>())
export const editDashboard = createAction('[Dashboard] edit dashboard', props<DashboardModel>())
export const patchDashboard = createAction('[Dashboard] edit dashboard', props<{id:number ,progress:boolean}>())
export const deleteDashboard = createAction('[Dashboard] delete dashboard', props<{id:number}>())
