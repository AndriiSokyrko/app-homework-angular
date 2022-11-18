import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {BoardCardAddComponent} from "./board-card-add.component";

const routes: Routes = [
  {path:"", component: BoardCardAddComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddBoardModule { }
