import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CanActivate } from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { FooterComponent } from './footer/footer.component';
import {AuthGuardService} from '../services/auth-guard.service';

const routes: Routes = [
    { 
        path: '', 
        component: LayoutComponent,
        children: [
            { path: 'admin', canActivate: [AuthGuardService], loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },
            { path: 'user', canActivate: [AuthGuardService], loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule) },
            { path: '', redirectTo: 'admin' }
        ]
    },
];

@NgModule({
  declarations: [LayoutComponent, SidebarComponent, TopbarComponent, FooterComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class LayoutModule { }
