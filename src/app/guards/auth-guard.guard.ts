import {ChangeDetectorRef, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private router:Router) {
  }
  canActivate()   {
    if(!localStorage.getItem('login')){
      this.router.navigate(['/login'])
      return false;
    }

    return true;
  }

}
