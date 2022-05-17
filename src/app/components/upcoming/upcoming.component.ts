import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Result } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-trending',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.scss']
})
export class UpcomingComponent implements OnInit, OnDestroy {

  // movies will be stored here
  public movies: Array<Result> | undefined;
  private routeSubscription: Subscription | undefined;
  private movieSubscription: Subscription | undefined;
  public radioModel = 'Middle';
  
  constructor(
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
    this.routeSubscription = this.activatedRoute.params.subscribe((params: Params) => {
        this.getLatestMovies();
    });
  }
  ngOnDestroy(): void {
    if (this.movieSubscription) {
      this.movieSubscription.unsubscribe();
    }

    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
  }

  getLatestMovies() {
    this.movieSubscription = this.httpService
      .getUpcomingMovieList()
      .subscribe((movieList: APIResponse<Result>) => {
        this.movies = movieList.results;
        console.log(movieList)
      })
  }

    // navigate to movie details screen
    selectMovieDetails(id: number) {
      this.router.navigate(['details', id]);
    }

}
