import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { APIResponse, MovieDetails, MovieResult, Result, ShowDetails, ShowResult, ShowResultWithPages } from '../models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private httpClient: HttpClient) { 
  }

  getPopularMovieList(page: number) : Observable<MovieResult> {
    let params = 
    new HttpParams()
      .set('api_key', environment.API_KEY)
      .set('language', 'en')
      .set('page', page);

    return this.httpClient.get<MovieResult>(`${environment.BASE_URL}/movie/popular`, {
      params: params
    });
  }
  
  getUpcomingMovieList(page: number) : Observable<MovieResult> {
    let params = 
    new HttpParams()
      .set('api_key', environment.API_KEY)
      .set('language', 'en')
      .set('page', page);

    return this.httpClient.get<MovieResult>(`${environment.BASE_URL}/movie/upcoming`, {
      params: params
    });
  }

  
  getDetailsById(movieId: number) {
    let params = 
    new HttpParams()
      .set('api_key', environment.API_KEY)
      .set('language', 'en');

    return this.httpClient.get<MovieDetails>(`${environment.BASE_URL}/movie/${movieId}`, {
      params: params
    });
  }
  
  searchByTitle(search?: string) {
    let params;
    if (search) {
      params = new HttpParams()
      .set('api_key', environment.API_KEY)
      .set('language', 'en')
      .set('page', 1)
      .set('query', search);
    }

    return this.httpClient.get<MovieResult>(`${environment.BASE_URL}/search/movie`, {
      params: params
    });
  }






  searchShowByTitle(search?: string) {
    let params;
    if (search) {
      params = new HttpParams()
      .set('api_key', environment.API_KEY)
      .set('language', 'en')
      .set('page', 1)
      .set('query', search);
    }

    return this.httpClient.get<ShowResultWithPages>(`${environment.BASE_URL}/search/tv`, {
      params: params
    });
  }

  getPopularShowList(page: number) : Observable<ShowResultWithPages> {
    let params = 
    new HttpParams()
      .set('api_key', environment.API_KEY)
      .set('language', 'en')
      .set('page', page);

    return this.httpClient.get<ShowResultWithPages>(`${environment.BASE_URL}/tv/popular`, {
      params: params
    });
  }

  getTopRatedShowList(page: number) : Observable<ShowResultWithPages> {
    let params = 
    new HttpParams()
      .set('api_key', environment.API_KEY)
      .set('language', 'en')
      .set('page', page)
      .set('vote_count.gte', 500);    // to prevent the no-name shows

    return this.httpClient.get<ShowResultWithPages>(`${environment.BASE_URL}/tv/top_rated`, {
      params: params
    });
  }

  getShowDetailsById(showId: number) {
    let params = 
    new HttpParams()
      .set('api_key', environment.API_KEY)
      .set('language', 'en');

    return this.httpClient.get<ShowDetails>(`${environment.BASE_URL}/tv/${showId}`, {
      params: params
    });
  }
}
