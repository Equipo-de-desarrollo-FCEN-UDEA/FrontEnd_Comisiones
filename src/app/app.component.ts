import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Siga Frontend';
  sidebarExpanded = true;

  constructor(
    private router : Router,
    public authSvc: AuthService
  ) { 

  }
  currentUrl()
  {
    return this.router.url;
  }
}
