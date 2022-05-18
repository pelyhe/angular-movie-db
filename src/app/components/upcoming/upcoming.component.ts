import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, MovieDetails, MovieResult, Result } from 'src/app/models';
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
  private page = 1;
  private totalPages = 0;
  
  constructor(
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
    this.routeSubscription = this.activatedRoute.params.subscribe((params: Params) => {
        this.getUpcomingMovies();
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

  getUpcomingMovies() {
    this.movieSubscription = this.httpService
      .getUpcomingMovieList(this.page)
      .subscribe((movieList: MovieResult) => {
        this.totalPages = movieList.total_pages;
        this.movies = movieList.results;
      })
  }

  // navigate to movie details screen
  selectMovieDetails(id: number) {
    this.router.navigate(['details', id]);
  }

  onPreviousPage() {
    if (this.page > 1) {
      this.page--;
      this.getUpcomingMovies();
    }
  }

  onNextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.getUpcomingMovies();
    }
  }

}
