import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { APIResponse, MovieDetails, Result, ShowResult } from '../models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private httpClient: HttpClient) { 
  }

  getPopularMovieList() : Observable<APIResponse<Result>> {
    let params = 
    new HttpParams()
      .set('api_key', environment.API_KEY)
      .set('language', 'hu')
      .set('page', 1);

    return this.httpClient.get<APIResponse<Result>>(`${environment.BASE_URL}/movie/popular`, {
      params: params
    });
  }

  
  getUpcomingMovieList() : Observable<APIResponse<Result>> {
    let params = 
    new HttpParams()
      .set('api_key', environment.API_KEY)
      .set('language', 'hu')
      .set('page', 1);

    return this.httpClient.get<APIResponse<Result>>(`${environment.BASE_URL}/movie/upcoming`, {
      params: params
    });
  }

  
  getDetailsById() {

    return this.httpClient.get<APIResponse<MovieDetails>>(`${environment.BASE_URL}/movie/{movie_id}`);
  }
  
  searchByTitle(search?: string) {
    let params;
    if (search) {
      params = new HttpParams()
      .set('api_key', environment.API_KEY)
      .set('language', 'hu')
      .set('page', 1)
      .set('query', search);
    }

    return this.httpClient.get<APIResponse<Result>>(`${environment.BASE_URL}/search/movie`, {
      params: params
    });
  }

  searchShowByTitle(search?: string) {
    let params;
    if (search) {
      params = new HttpParams()
      .set('api_key', environment.API_KEY)
      .set('language', 'hu')
      .set('page', 1)
      .set('query', search);
    }

    return this.httpClient.get<APIResponse<ShowResult>>(`${environment.BASE_URL}/search/tv`, {
      params: params
    });
  }

  getPopularShowList() : Observable<APIResponse<ShowResult>> {
    let params = 
    new HttpParams()
      .set('api_key', environment.API_KEY)
      .set('language', 'hu')
      .set('page', 1);

    return this.httpClient.get<APIResponse<ShowResult>>(`${environment.BASE_URL}/tv/popular`, {
      params: params
    });
  }

  getTopRatedShowList() : Observable<APIResponse<ShowResult>> {
    let params = 
    new HttpParams()
      .set('api_key', environment.API_KEY)
      .set('language', 'hu')
      .set('page', 1)
      .set('vote_count.gte', 500);    // to prevent the no-name shows

    return this.httpClient.get<APIResponse<ShowResult>>(`${environment.BASE_URL}/tv/top_rated`, {
      params: params
    });
  }
}
