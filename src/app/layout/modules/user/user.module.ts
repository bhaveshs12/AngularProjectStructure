import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import {UserRoutingModule} from './user-routing.module';
import { HomeComponent } from './home/home.component';
import { VoteVideoComponent } from './vote-video/vote-video.component';
import { TopicsPoolComponent } from './topics-pool/topics-pool.component';
import { ContestsComponent } from './contests/contests.component';
import { SuggestTopicComponent } from './suggest-topic/suggest-topic.component';
import { ContestHistoryComponent } from './contest-history/contest-history.component';
import { MyAccountComponent } from './my-account/my-account.component';

@NgModule({
  declarations: [HomeComponent, VoteVideoComponent, TopicsPoolComponent, ContestsComponent, SuggestTopicComponent, ContestHistoryComponent, MyAccountComponent],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule,
  ]
})
export class UserModule { }
