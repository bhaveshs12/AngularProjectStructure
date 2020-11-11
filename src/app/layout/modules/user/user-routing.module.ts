import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
import { ContactUsComponent } from '../admin/contact-us/contact-us.component';

const routes: Routes = [
    { path: '', redirectTo: 'home' },
    { path: 'home', component: HomeComponent },
    { path: 'topicsPool', component: TopicsPoolComponent},
    { path: 'contestHistory', component: ContestHistoryComponent},
    { path: 'myAccount', component: MyAccountComponent},
    { path: 'createContest/:type', component: CreateContestComponent},
    { path: 'suggestTopic', component: SuggestTopicComponent},
    { path: 'contests', component: SideContestsComponent},
    { path: 'voteVideo/:contestId/:videoId', component: VoteVideoComponent},
    { path: 'contestDetails/:id', component: ContestDetailComponent},
    { path: 'viewAllContests/:type', component: ViewAllContestsComponent},
    { path: 'uploadVideo/:id', component: UploadVideoComponent},
    { path: 'contact', component: ContactUsComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
