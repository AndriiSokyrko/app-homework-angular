import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  @Output() changeField = new EventEmitter<string>()
  @Input() optionValue:string
  @Input() selectedColor
  sortArray:{name:string,value:string}[]=[
    {name:'Name', value:'title'},
    {name:'Date of creation', value:'date'},
    {name:'Number of new task', value:'id'},
    {name:'In progress', value:'progress'},
    {name:'Done', value:'done'},
  ]
  constructor() { }

  ngOnInit(): void {
  }
  setFieldName(val){
    this.changeField.emit(val )
  }
}
