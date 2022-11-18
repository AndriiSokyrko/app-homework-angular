import {createReducer, on} from "@ngrx/store";
import {changeColor, initColor} from "./color.action";

export const initState:string[]=['#D9D9D9','#D0D0D0','#EBEBEB']

export const colorReducer = createReducer(initState,
  on(changeColor,( state, props)=> props.color),
  on(initColor,( state, props)=> JSON.parse(localStorage.getItem('selectedColor'))),

)
