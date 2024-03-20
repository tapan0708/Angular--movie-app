import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieData } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class AddMovieService {
  constructor(private _http: HttpClient) {}

  addMovie(movieData: MovieData): Observable<any> {
    return this._http.post('http://localhost:3000/movies', movieData);
  }

  updateMovieData(id: number, data: MovieData): Observable<any> {
    return this._http.put(`http://localhost:3000/movies/${id}`, data);
  }

  getMovies(): Observable<any> {
    return this._http.get('http://localhost:3000/movies');
  }

  deleteMovie(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/movies/${id}`);
  }
}
