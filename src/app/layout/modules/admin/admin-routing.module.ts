import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TopicPoolsComponent } from './topic-pools/topic-pools.component';
import { ContentHistoryComponent } from './content-history/content-history.component';
import { UsersComponent } from './users/users.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { WinnersComponent } from './winners/winners.component';
import { GoodVotersComponent } from './good-voters/good-voters.component';
import { AddEditContestComponent } from './add-edit-contest/add-edit-contest.component';
import { ContestDetailComponent } from './contest-detail/contest-detail.component';

const routes: Routes = [
    { path: '', redirectTo: 'home' },
    { path: 'home', component: HomeComponent },
    { path: 'topicsPool', component: TopicPoolsComponent},
    { path: 'contestHistory', component: ContentHistoryComponent},
    { path: 'users', component: UsersComponent},
    { path: 'myAccount', component: MyAccountComponent},
    { path: 'myAccount/:id', component: MyAccountComponent},
    { path: 'winners', component: WinnersComponent},
    { path: 'goodVoters', component: GoodVotersComponent},
    { path: 'createContest', component: AddEditContestComponent},
    { path: 'contestDetails/:id', component: ContestDetailComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
