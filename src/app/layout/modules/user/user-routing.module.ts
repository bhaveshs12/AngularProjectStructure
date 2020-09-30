import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VoteVideoComponent } from './vote-video/vote-video.component';
import { TopicsPoolComponent } from './topics-pool/topics-pool.component';
import { ContestsComponent } from './contests/contests.component';
import { SuggestTopicComponent } from './suggest-topic/suggest-topic.component';
import { ContestHistoryComponent } from './contest-history/contest-history.component';
import { MyAccountComponent } from './my-account/my-account.component';

const routes: Routes = [
    { path: '', redirectTo: 'home' },
    { path: 'home', component: HomeComponent },
    { path: 'topicsPool', component: TopicsPoolComponent},
    { path: 'contestHistory', component: ContestHistoryComponent},
    { path: 'myAccount', component: MyAccountComponent},
    // { path: 'createContest', component: AddEditContestComponent},
    { path: 'suggestTopic', component: SuggestTopicComponent},
    { path: 'contests', component: ContestsComponent},
    { path: 'voteVideo/:contestId/:videoId', component: VoteVideoComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
