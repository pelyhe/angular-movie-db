import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { APIResponse, Result } from 'src/app/models';
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
        console.log(params['query']);
        this.getSearchResults(params['query'])
      } else {
        this.getPopularMovies();
      }
    });
  }

  // get the popular movies and put it (the results) into movies list
  getPopularMovies() {
    //console.log(search);
    this.httpService
      .getPopularMovieList()
      .subscribe((movieList: APIResponse<Result>) => {
        this.movies = movieList.results;
        this.labelText = 'Popular movies'
      })
  }

  getSearchResults(search?: string) {
    this.httpService
      .searchByTitle(search)
      .subscribe((movieList: APIResponse<Result>) => {
        this.movies = movieList.results;
        this.labelText = 'Search results'
      })
  }

  // navigate to movie details screen
  selectMovieDetails(id: number) {
    this.router.navigate(['details', id]);
  }

}
