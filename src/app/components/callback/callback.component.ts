import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Logger } from '@classes/logger.class';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnDestroy {

  private sub;
  private timeout;

  private logger = new Logger('Callback-Component');
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.sub = this.authService.$user.subscribe(user => {
      this.logger.log(`user = `, user);
      if (!!user) {
        setTimeout(() => {
          this.router.navigate(['/', 'main']);
        });
      }
    });

    window.addEventListener('hashchange', () => {
      this.authService.checkUser();
    });

    // If not responding -> redirect to login
    this.timeout = setTimeout(() => {
      this.router.navigate(['/', 'login']);
    }, 10000);

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    clearTimeout(this.timeout);
  }

}
