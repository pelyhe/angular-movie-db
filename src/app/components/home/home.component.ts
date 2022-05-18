import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MovieResult, Result } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public movies: Array<Result> | undefined;
  public radioModel = 'Middle';
  public labelText: string | undefined;
  public page: number = 1;
  private totalPages: number = 0;
  public isSearch = false;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  

  // activatedroute.params-ban található a paraméter, amit átadtunk a route-hoz
  // ahogy az app-routing-ban látható, search/:query az endpoint
  // vagyis a query a paraméter amit keresünk
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log(params['query'])
      if (params['query']) {
        this.isSearch = true;
        this.getSearchResults(params['query'])
      } else {
        this.isSearch = false;
        this.getPopularMovies();
      }
    });
  }

  // get the popular movies and put it (the results) into movies list
  getPopularMovies() {
    console.log(this.isSearch);
    this.httpService
      .getPopularMovieList(this.page)
      .subscribe((movieList: MovieResult) => {
        this.totalPages = movieList.total_pages;
        this.movies = movieList.results;
        this.labelText = 'Popular movies'
      })
  }

  getSearchResults(search?: string) {
    
    console.log(this.isSearch);
    this.httpService
      .searchByTitle(search)
      .subscribe((movieList: MovieResult) => {
        this.totalPages = movieList.total_pages;
        this.movies = movieList.results;
        this.labelText = 'Search results'
      })
  }

  // navigate to movie details screen
  selectMovieDetails(id: number) {
    this.router.navigate(['details', id]);
  }

  // decreases the page by one and calls the getPopularMovies()
  onPreviousPage() {
    if (this.page > 1) {
      this.page--;
      this.getPopularMovies();
    }
  }

  // increases the page by one and calls the getPopularMovies()
  onNextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.getPopularMovies();
    }
  }

}
