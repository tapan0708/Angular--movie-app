import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovieData } from '../../models/movie.model';
import { AddMovieService } from '../../services/add-movie.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MoviesListComponent } from '../movies-list/movies-list.component';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css'],
})
export class AddMovieComponent implements OnInit {
  addMovieForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _addMovie: AddMovieService,
    @Optional() private dialogRef: MatDialogRef<MoviesListComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.setMovieForm();
    this.addMovieForm.patchValue(this.dialogData);
  }

  setMovieForm() {
    this.addMovieForm = this.formBuilder.group({
      title: ['', Validators.required],
      castMember: ['', Validators.required],
      date: ['', Validators.required],
      reviews: ['', Validators.required],
    });
  }

  onFormSubmit() {
    if (this.addMovieForm.valid) {
      const movieData: MovieData = {
        title: this.addMovieForm.value.title,
        castMember: this.addMovieForm.value.castMember,
        date: this.addMovieForm.value.date,
        reviews: this.addMovieForm.value.reviews,
      };
      this.sendMovieData(movieData);
    }
  }

  sendMovieData(data: MovieData) {
    if (this.dialogData) {
      this.updateMovieData(data);
    } else {
      this.addMovieData(data);
    }
  }

  updateMovieData(movieData: MovieData) {
    this._addMovie
      .updateMovieData(this.dialogData.id ?? 0, movieData)
      .subscribe({
        next: (resp) => {
          if (resp) {
            this.dialogRef.close();
          }
        },
        error: (err) => {},
      });
  }

  addMovieData(movieData: MovieData) {
    this._addMovie.addMovie(movieData).subscribe({
      next: (resp) => {
        if (resp) {
          this.addMovieForm.reset();
          this.routeToMoviesList();
        }
      },
      error: (err) => {},
    });
  }

  routeToMoviesList() {
    this.route.navigate(['/movies-list']);
  }

  goToBack() {
    if (this.dialogData) {
      this.dialogRef.close();
    } else {
      window.history.back();
    }
  }
}
