import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isNavbarCollapsed=true;
  currentURL: any;
  constructor(
    private authService : AuthService,
    private router : Router
  ) { 
    this.router.events.pipe(
      filter(res => res instanceof NavigationEnd)
      )
    .subscribe(
      () => {
        this.currentURL = this.router.url;
      }
      );  
      console.log('ruta'+this.currentURL);
  }


  ngOnInit() {

  }

  logout() {
    this.authService.logout();
  }

}
