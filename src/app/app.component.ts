import { AuthService } from './core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { createClient, User } from '@supabase/supabase-js'
import { SupabasePublicKey, SupabaseUrl } from 'src/constants/supabase.constant';
import { BehaviorSubject } from 'rxjs';
import { Logger } from 'src/classes/logger.class';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  user: User | null = null;
  private logger = new Logger('App-Component');

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

  private checkUser() {

  }

}
