import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import {AdminRoutingModule} from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { TopicPoolsComponent } from './topic-pools/topic-pools.component';

@NgModule({
  declarations: [HomeComponent, TopicPoolsComponent],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
  ]
})
export class AdminModule { }
