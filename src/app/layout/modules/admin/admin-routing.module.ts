import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TopicPoolsComponent } from './topic-pools/topic-pools.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'topicsPool', component: TopicPoolsComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
