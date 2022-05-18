import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MovieDetails, ShowDetails } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.scss']
})
export class ShowDetailsComponent implements OnInit {

  public show: ShowDetails | undefined;

  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['showid']) {
        this.getShowDetails(params['showid']);
      }
    });
  }
  getShowDetails(id: number) {
    this.httpService
      .getShowDetailsById(id)
      .subscribe((show: ShowDetails) => {
        this.show = show;
        console.log(this.show.seasons.length);

      });
      
  }

}
