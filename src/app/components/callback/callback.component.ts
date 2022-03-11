import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnDestroy {

  sub;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.sub = this.authService.$user.subscribe(user => {
      if (!!user) {
        setTimeout(() => {
          this.router.navigate(['/', 'main']);
        });
      }
    });
    window.addEventListener('hashchange', () => {
      this.authService.checkUser();
    });

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
