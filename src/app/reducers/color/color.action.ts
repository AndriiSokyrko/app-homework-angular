import {createAction, props} from "@ngrx/store";

export const initColor = createAction('[Color] init')
export const changeColor = createAction('[Color] edit', props<{ color:string[] }>())
