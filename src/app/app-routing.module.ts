import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { HomeComponent } from './components/home/home.component';
import { UpcomingComponent } from './components/upcoming/upcoming.component';
import { TvShowComponent } from './components/tv-show/tv-show.component';
import { ShowDetailsComponent } from './components/show-details/show-details.component';
import { ShowTopRatedComponent } from './components/show-top-rated/show-top-rated.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'search/:query',
    component: HomeComponent
  },
  {
    path: 'upcoming',
    component: UpcomingComponent
  },
  {
    path: 'details/:movieid',
    component: DetailsComponent
  },
  {
    path: 'shows/search/:query',
    component: TvShowComponent
  },
  {
    path: 'shows/details/:showid',
    component: ShowDetailsComponent
  },
  {
    path: 'shows/top-rated',
    component: ShowTopRatedComponent
  },
  {
    path: 'shows',
    component: TvShowComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
