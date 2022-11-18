import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './shared/button/button.component';
import {FeatureModule} from "./feature/feature.module";
import {CoreModule} from "./core/core.module";
import {SharedModule} from "./shared/shared.module";
import { NotFoundComponent } from './feature/not-found/not-found.component';
import {TopMenuModule} from "./core/top-menu/top-menu.module";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FeatureModule,
    CoreModule,
    SharedModule,
    TopMenuModule,
  ],
  exports:[
    CommonModule,
    FeatureModule,
    CoreModule,
    SharedModule,
  ]
})
export class ComponentsModule { }
