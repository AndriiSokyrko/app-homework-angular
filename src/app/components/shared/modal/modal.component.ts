import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {getColor} from "../../../reducers/color/color.selector";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ModalComponent implements OnInit {
  @Input() selectedColor=JSON.parse(localStorage.getItem('selectedColor'))
  constructor(private store:Store) { }

  ngOnInit(): void {
    this.store.select(getColor).subscribe(color=>{
      this.selectedColor = color
    })
  }

}
