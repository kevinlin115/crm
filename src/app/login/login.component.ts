import { Component, OnInit } from '@angular/core';
import { Logger } from '@src/classes/logger.class';
import { AuthService } from '@core/services/auth.service';
import { User } from '@supabase/supabase-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User | null = null;
  private logger = new Logger('Login-Component');

  constructor(
    private auth: AuthService
  ) {
    this.auth.$user.subscribe(user => {
      this.logger.log(`user = `, user);
      this.user = user;
    });

  }

  ngOnInit(): void {

  }

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }

}
