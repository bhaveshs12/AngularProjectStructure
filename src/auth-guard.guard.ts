import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import {ApiRequestService} from './app/services/api-request.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(public apiService: ApiRequestService, public router: Router) {}

  canActivate(): boolean {
    if (!true) {
      return false;
    }
    return true;
  }
}
