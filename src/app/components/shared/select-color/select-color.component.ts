import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Store} from "@ngrx/store";
import {changeColor} from "../../../reducers/color/color.action";
import {getColor} from "../../../reducers/color/color.selector";

@Component({
  selector: 'app-select-color',
  templateUrl: './select-color.component.html',
  styleUrls: ['./select-color.component.scss']
})
export class SelectColorComponent implements OnInit {
  @Output() setNewColor:EventEmitter<string[]> = new EventEmitter<string[]>()
  // @Input() selectedColor:string[]= JSON.parse(localStorage.getItem('selectedColor'))
  selectedColor:string[]
  colorArray: [main:string,secondary:string,third:string][]=[
    ['#024C68','#226078','#0776A0'],
    ['#006B53','#1F7B67','#00A480'],
    ['#008500','#269926','#00CC00'],
    ['#D9D9D9','#D0D0D0','#EBEBEB'],
  ]

  constructor(
    private ref: ChangeDetectorRef,
    private store: Store
    ) {}

  ngOnInit(): void {
    this.store.select(getColor).subscribe(color=> {
      this.selectedColor = color
      this.ref.markForCheck()
    })
  }

  changeColor(val:string){
    const selectedColor= val.split(',')
    this.selectedColor=selectedColor
    localStorage.setItem('selectedColor',JSON.stringify(this.selectedColor))
    this.store.dispatch(changeColor({color:selectedColor}))
    // this.setNewColor.emit(this.selectedColor)
  }
}
