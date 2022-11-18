import { Pipe, PipeTransform } from '@angular/core';
import {BoardModel} from "../models/board.model";

@Pipe({
  name: 'filterBoard'
})
export class FilterBoardPipe implements PipeTransform {

  transform(value: BoardModel[], args: string): BoardModel[] {
    if(args==='') return value
    const regx = new RegExp('.?'+args+'.?')
    return value.filter(val=>val.title.match(regx));
  }

}
