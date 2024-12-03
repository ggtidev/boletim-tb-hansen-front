import { Component } from '@angular/core';
import { Router, RouterOutlet, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'boletim';
  isLoading = false;
  loadingDelay = 100; 
  minLoadingTime = 500; 
  private loadingTimeout: any;
  private loadingVisibleTime: number = 0; 

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        console.log('NavigationStart: Spinner ON');
        this.loadingVisibleTime = Date.now(); 
        this.loadingTimeout = setTimeout(() => {
          this.isLoading = true; 
        }, this.loadingDelay);
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        console.log('NavigationEnd: Spinner OFF');
        const elapsed = Date.now() - this.loadingVisibleTime; 
        const remainingTime = this.minLoadingTime - elapsed;
        clearTimeout(this.loadingTimeout); 

        if (this.isLoading && remainingTime > 0) {
          setTimeout(() => {
            this.isLoading = false; 
          }, remainingTime);
        } else {
          this.isLoading = false;
        }
      }
    });
  }
}
