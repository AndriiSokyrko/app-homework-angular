import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopMenuComponent } from './top-menu/top-menu.component';
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";
import {SelectModule} from "../shared/select/select.module";
import {TopMenuModule} from "./top-menu/top-menu.module";



@NgModule({
  declarations: [

  ],
  exports: [

  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TopMenuModule
  ]
})
export class CoreModule { }
