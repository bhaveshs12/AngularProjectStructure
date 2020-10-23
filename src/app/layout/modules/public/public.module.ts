import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import {ContestComponent} from '../public/contest/contest.component';
const routes: Routes = [
    { path: 'contest/:id/:uid', component: ContestComponent}
];

@NgModule({
  declarations: [ContestComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class PublicModule { }
