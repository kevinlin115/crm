import { Component, OnInit } from '@angular/core';
import { AuthService } from '@src/core/services/auth.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) {
    window.addEventListener('hashchange', () => {
      this.authService.checkUser();
    });
  }

  ngOnInit(): void {
  }

}
