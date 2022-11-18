import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TopMenuComponent} from "./top-menu.component";
import {ComponentsModule} from "../../components.module";
import {RouterModule} from "@angular/router";
import {SelectModule} from "../../shared/select/select.module";



@NgModule({
  declarations: [TopMenuComponent],
  imports: [
    CommonModule,
    RouterModule,
    SelectModule,
  ],
  exports:[
    TopMenuComponent
  ]
})
export class TopMenuModule { }
