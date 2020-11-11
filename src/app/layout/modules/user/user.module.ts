import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import {UserRoutingModule} from './user-routing.module';
import { HomeComponent } from './home/home.component';
import { VoteVideoComponent } from './vote-video/vote-video.component';
import { TopicsPoolComponent } from './topics-pool/topics-pool.component';
import { SuggestTopicComponent } from './suggest-topic/suggest-topic.component';
import { ContestHistoryComponent } from './contest-history/contest-history.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { ContestDetailComponent } from './contest-detail/contest-detail.component';
import { SideContestsComponent } from './side-contests/side-contests.component';
import { ViewAllContestsComponent } from './view-all-contests/view-all-contests.component';
import { CreateContestComponent } from './create-contest/create-contest.component';
import { UploadVideoComponent } from './upload-video/upload-video.component';
@NgModule({
  declarations: [HomeComponent, VoteVideoComponent, TopicsPoolComponent, SideContestsComponent, SuggestTopicComponent, ContestHistoryComponent, MyAccountComponent, ContestDetailComponent, ViewAllContestsComponent, CreateContestComponent, UploadVideoComponent],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule,
  ]
})
export class UserModule { }
