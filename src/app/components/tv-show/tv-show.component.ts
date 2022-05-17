import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { APIResponse, Result, ShowResult } from 'src/app/models';
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
        //console.log(params['query']);
        this.getSearchResults(params['query'])
      } else {
        this.getPopularShows();
      }
    });
  }

    // get the popular movies and put it (the results) into movies list
    getPopularShows() {
      //console.log(search);
      this.httpService
        .getPopularShowList()
        .subscribe((showList: APIResponse<ShowResult>) => {
          this.shows = showList.results;
          this.labelText = 'Popular shows'
        })
    }
  
    getSearchResults(search?: string) {
      this.httpService
        .searchShowByTitle(search)
        .subscribe((showList: APIResponse<ShowResult>) => {
          this.shows = showList.results;
          this.labelText = 'Search results'
        })
    }
  
    // navigate to movie details screen
    selectShowDetails(id: number) {
      this.router.navigate(['shows/details', id]);
    }

}
