import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import {AdminRoutingModule} from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { TopicPoolsComponent } from './topic-pools/topic-pools.component';
import { ContentHistoryComponent } from './content-history/content-history.component';
import { UsersComponent } from './users/users.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { WinnersComponent } from './winners/winners.component';
import { GoodVotersComponent } from './good-voters/good-voters.component';
import { AddEditContestComponent } from './add-edit-contest/add-edit-contest.component';
import { ContestDetailComponent } from './contest-detail/contest-detail.component';

@NgModule({
  declarations: [HomeComponent, TopicPoolsComponent, ContentHistoryComponent, UsersComponent, MyAccountComponent, WinnersComponent, GoodVotersComponent, AddEditContestComponent, ContestDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
  ]
})
export class AdminModule { }
