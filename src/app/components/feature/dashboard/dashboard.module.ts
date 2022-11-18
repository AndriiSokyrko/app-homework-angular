import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ButtonModule} from "../../shared/button/button.module";
import {PipesModule} from "../../../pipes/pipes.module";
import {FeatureModule} from "../feature.module";
import {DashboardComponent} from "./dashboard.component";
import {DashCardAddComponent} from "./dash-card-add/dash-card-add.component";
import {DashCardEditComponent} from "./dash-card-edit/dash-card-edit.component";

const routes: Routes = [
  {path:"", component: DashboardComponent,
    children:[
      {path:'add-dashboard',loadChildren: () => import('./dash-card-add/add-dashboard.module').then(m=>m.AddDashboardModule)},
      {path:'edit-dashboard/:id',loadChildren: () => import('./dash-card-edit/edit-dashboard.module').then(m=>m.EditDashboardModule)},

    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes), ButtonModule, PipesModule, FeatureModule],
  exports: [RouterModule],
  declarations: [

  ]
})
export class DashboardModule { }
