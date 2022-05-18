import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { APIResponse, ShowResult, ShowResultWithPages } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-show-top-rated',
  templateUrl: './show-top-rated.component.html',
  styleUrls: ['./show-top-rated.component.scss']
})
export class ShowTopRatedComponent implements OnInit {
  
  public shows: Array<ShowResult> | undefined;
  public radioModel = 'Middle';
  public labelText: string | undefined;
  private page = 1;
  private totalPages = 0;
  
  constructor(
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.getTopRatedShows();
    });
  }
  getTopRatedShows() {
    this.httpService
    .getTopRatedShowList(this.page)
    .subscribe((showList: ShowResultWithPages) => {
      this.totalPages = showList.total_pages;
      this.shows = showList.results;
      this.labelText = 'Top rated shows'
    })
  }

  // navigate to movie details screen
  selectShowDetails(id: number) {
    this.router.navigate(['shows/details', id]);
  }

  onPreviousPage() {
    if (this.page > 1) {
      this.page--;
      this.getTopRatedShows();
    }
  }

  onNextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.getTopRatedShows();
    }
  }

}
