import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  public radioModel = 'Middle';
  public isMovie: boolean = true;

  constructor(private router: Router) {    
  }

  ngOnInit(): void {
  }

  // when hitting submit button, 
  // if movie is selected: navigates to search/:query endpoint
  // if tv show: navigates to shows/search/:query
  onSubmit(form: NgForm) {
    //console.log(form.value.search);
    if (this.isMovie) {
      this.router.navigate(['search', form.value.search]);
    } else {
      this.router.navigate(['shows/search', form.value.search]);
    }
    
  }

  onMoviesClick() {
    this.isMovie = true;
    this.router.navigateByUrl('');
  }

  onShowsClick() {
    this.isMovie = false;
    this.router.navigateByUrl('shows');
  }

}

