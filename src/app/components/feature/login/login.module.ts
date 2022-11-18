import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login.component";
import {AuthGuardGuard} from "../../../guards/auth-guard.guard";
import {FormsModule} from "@angular/forms";

const routes: Routes = [
  {path:"", component: LoginComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginModule { }
