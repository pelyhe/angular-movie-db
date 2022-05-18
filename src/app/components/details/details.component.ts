import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MovieDetails } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public movie: MovieDetails | undefined;

  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['movieid']) {
        this.getMovieDetails(params['movieid']);
      }
    });
  }

  getMovieDetails(id: number) {
        this.httpService
      .getDetailsById(id)
      .subscribe((movie: MovieDetails) => {
        this.movie = movie;
      });
  }

}
