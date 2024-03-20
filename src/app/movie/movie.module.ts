import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieRoutingModule } from './movie-routing.module';
import { MaterialModule } from '../material/material.module';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { MainComponent } from './components/main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AddMovieComponent,
    MoviesListComponent,
    MainComponent,
    HeaderComponent,
    DashboardComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    MovieRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class MovieModule {}
