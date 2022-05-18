import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { APIResponse, MovieResult, Result, ShowResult, ShowResultWithPages } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-tv-show',
  templateUrl: './tv-show.component.html',
  styleUrls: ['./tv-show.component.scss']
})
export class TvShowComponent implements OnInit {

  public shows: Array<ShowResult> | undefined;
  public radioModel = 'Middle';
  public labelText: string | undefined;
  public isSearch = false;    // to forbid pagination while searching
  private page = 1;
  private totalPages = 0;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }


  // activatedroute.params-ban található a paraméter, amit átadtunk a route-hoz
  // ahogy az app-routing-ban látható, search/:query az endpoint
  // vagyis a query a paraméter amit keresünk
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log(params['query'])
      if (params['query']) {
        this.getSearchResults(params['query']);
        this.isSearch = true;
      } else {
        this.getPopularShows();
        this.isSearch = false;
      }
    });
  }

    // get the popular movies and put it (the results) into movies list
    getPopularShows() {
      //console.log(search);
      this.httpService
        .getPopularShowList(this.page)
        .subscribe((showList: ShowResultWithPages) => {
          this.totalPages = showList.total_pages;
          this.shows = showList.results;
          this.labelText = 'Popular shows'
        })
    }
  
    getSearchResults(search?: string) {
      this.httpService
        .searchShowByTitle(search)
        .subscribe((showList: ShowResultWithPages) => {
          this.shows = showList.results;
          this.labelText = 'Search results'
        })
    }
  
    // navigate to movie details screen
    selectShowDetails(id: number) {
      this.router.navigate(['shows/details', id]);
    }

    // decreases the page by one and calls the getPopularMovies()
    onPreviousPage() {
      if (this.page > 1) {
        this.page--;
        this.getPopularShows();
      }
    }

    // increases the page by one and calls the getPopularMovies()
    onNextPage() {
      if (this.page < this.totalPages) {
        this.page++;
        this.getPopularShows();
      }
    }
}
