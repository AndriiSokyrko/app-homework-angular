import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {DashCardEditComponent} from "./dash-card-edit.component";

const routes: Routes = [
  {path:"", component: DashCardEditComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditDashboardModule { }
