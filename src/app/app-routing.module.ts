import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotFoundComponent} from "./components/feature/not-found/not-found.component";
import {DashboardComponent} from "./components/feature/dashboard/dashboard.component";
import {AuthGuardGuard} from "./guards/auth-guard.guard";


export const routes: Routes = [
  {path:"",canActivate:[AuthGuardGuard], loadChildren: () => import('./components/feature/login/login.module').then(m=>m.LoginModule) },
  {path:"register",loadChildren: () => import('./components/feature/registration/registration.module').then(m=>m.RegistrationModule)},
  {path:"login",loadChildren: () => import('./components/feature/login/login.module').then(m=>m.LoginModule)},
  {
    path: 'dashboard',
    canActivate:[AuthGuardGuard],
      loadChildren: () => import('./components/feature/dashboard/dashboard.module').then(m=>m.DashboardModule)

  },
  {path:"board",
    canActivate:[AuthGuardGuard],
    loadChildren: () => import('./components/feature/board/board.module').then(m=>m.BoardModule)
  },
  {path:'**',component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
