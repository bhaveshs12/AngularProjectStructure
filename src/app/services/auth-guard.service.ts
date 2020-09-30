import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiRequestService } from '../services/api-request.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private api : ApiRequestService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        let data = this.api.getData();
        if(data == undefined) {
            if(next.routeConfig.path == 'user') {
                this.router.navigateByUrl('/admin/home')
                return false;
            }
            else
                return true;
        }
        else if(data != undefined && data.role_id == 1 && next.routeConfig.path == 'admin') {
            return true;
        }
        else if(data != undefined && data.role_id == 2 && next.routeConfig.path == 'user') {
            return true;
        }
        else {
            if(data.role_id == 2 && next.routeConfig.path == 'admin') {
                this.router.navigateByUrl('/user/home')
                return false;
            }
            else {
                this.router.navigateByUrl('/admin/home')
                return false;
            }
        }
  }
}