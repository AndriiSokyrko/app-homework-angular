import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { InputComponent } from './input/input.component';
import { SelectComponent } from './select/select.component';
import { ModalComponent } from './modal/modal.component';
import {SelectModule} from "./select/select.module";
import {ButtonModule} from "./button/button.module";
import {ModalModule} from "./modal/modal.module";
import {InputModule} from "./input/input.module";
import { SelectColorComponent } from './select-color/select-color.component';

@NgModule({
  declarations: [

    SelectColorComponent
  ],
  exports: [
    ModalModule,
    SelectModule,
    ButtonModule,
    SelectColorComponent,

  ],
  imports: [
    CommonModule,
    SelectModule,
    ButtonModule,
    ModalModule,
    InputModule,
  ]
})
export class SharedModule { }
