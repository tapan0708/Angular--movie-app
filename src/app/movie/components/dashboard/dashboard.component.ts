import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from '../../services/session-storage.service';
import { authData } from '../../models/authData.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private route: Router,
    private sessionStorage: SessionStorageService
  ) {}

  ngOnInit(): void {}

  //Navigate to add movie
  routeToAddMovie() {
    this.route.navigate(['/add-movie']);
  }

  //Navigate to Movies List
  routeToMoviesList() {
    this.route.navigate(['/movies-list']);
  }

  //Set auth data in session
  setSessionData(roleId: number, roleName: string) {
    const authData: authData = {
      id: roleId,
      name: roleName,
    };
    this.sessionStorage.setLoggedInRoles(authData);
  }
}
