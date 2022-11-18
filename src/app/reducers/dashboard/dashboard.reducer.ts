import {DashboardModel} from "../../models/dashboard.model";
import {createReducer, on} from "@ngrx/store";
import {initDashboard, createDashboard, editDashboard, deleteDashboard, patchDashboard} from "./dashboard.actions";

export const initState:DashboardModel[]=[]

export const dashboardReducer = createReducer(initState,
  on(initDashboard,( state, props)=>[...state, ...props.dashboards]),
  on(createDashboard,( state, props)=>[...state, props]),
  on(editDashboard,( state, props)=>state.map(item=>item.id===props.id ? props : item)),
  on(deleteDashboard,( state, props)=>state.filter(item=>item.id!==props.id ))
  )
