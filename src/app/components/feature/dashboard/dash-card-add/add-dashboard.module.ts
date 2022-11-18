import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {DashCardAddComponent} from "./dash-card-add.component";

const routes: Routes = [
  {path:"", component: DashCardAddComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddDashboardModule { }
