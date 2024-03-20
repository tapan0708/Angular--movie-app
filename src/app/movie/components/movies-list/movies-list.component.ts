import { Component, OnInit } from '@angular/core';
import { AddMovieService } from '../../services/add-movie.service';
import { MovieData } from '../../models/movie.model';
import { Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AddMovieComponent } from '../add-movie/add-movie.component';
import { SessionStorageService } from '../../services/session-storage.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'],
})
export class MoviesListComponent implements OnInit {
  moviesList: MovieData[] = [];
  sortedMovieData: MovieData[] = [];
  ItemIdtoDelete: number = 0;
  userRoleId: number = 0;

  constructor(
    private sessionStorage: SessionStorageService,
    private addMovieService: AddMovieService,
    public dialog: MatDialog,
    private _addMovie: AddMovieService
  ) {
    this.sortedMovieData = this.moviesList.slice();
  }

  ngOnInit(): void {
    this.userRoleId = this.sessionStorage.getLoggedInRoles('roles').id;
    this.getMoviesListData();
  }

  getMoviesListData() {
    this.addMovieService.getMovies().subscribe({
      next: (resp) => {
        this.moviesList = resp ?? [];
        this.sortedMovieData = this.moviesList.slice();
      },
      error: (err) => {},
    });
  }

  sortData(sort: Sort) {
    const data = this.moviesList.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedMovieData = data;
      return;
    }
    this.sortedMovieData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'title':
          return this.compare(a.title, b.title, isAsc);
        case 'castMember':
          return this.compare(a.castMember, b.castMember, isAsc);
        case 'date':
          return this.compare(a.date, b.date, isAsc);
        case 'reviews':
          return this.compare(a.reviews, b.reviews, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  sendIdToDelete(itemId: number) {
    this.ItemIdtoDelete = itemId;
  }

  delistMovie() {
    this.addMovieService.deleteMovie(this.ItemIdtoDelete).subscribe({
      next: (resp) => {
        this.getMoviesListData();
      },
      error: (err) => {},
    });
  }

  openEditFormDialog(moviesData: MovieData) {
    const dialogRef = this.dialog.open(AddMovieComponent, {
      data: moviesData,
      width: '100%',
      height: '40vh',
      maxWidth: '650px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getMoviesListData();
    });
  }

  likeCount(movieData: MovieData) {
    this.updateMovieData(
      movieData,
      movieData.likeCount ?? 0,
      movieData.Comment ?? ''
    );
  }

  sendCommentValue(val: string, movieData: MovieData) {
    this.updateMovieData(movieData, movieData.likeCount ?? 0, val ?? '');
  }

  updateMovieData(data: MovieData, likes: number, comment: string) {
    const movieUpdatedData = {
      id: data.id,
      title: data.title,
      castMember: data.castMember,
      date: data.date,
      reviews: data.reviews,
      likeCount: ++likes,
      Comment: comment,
      Rating: data.Rating,
    };
    this._addMovie.updateMovieData(data.id ?? 0, movieUpdatedData).subscribe({
      next: (resp) => {
        if (resp) {
          this.getMoviesListData();
        }
      },
      error: (err) => {},
    });
  }
}
