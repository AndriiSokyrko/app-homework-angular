import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {BoardCardEditComponent} from "./board-card-edit.component";

const routes: Routes = [
  {path:"", component: BoardCardEditComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditBoardModule { }
