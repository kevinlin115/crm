import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Logger } from '@src/classes/logger.class';
import { environment } from '@src/environments/environment';
import { createClient, User } from '@supabase/supabase-js';
import { BehaviorSubject, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $user = new BehaviorSubject<User | null>(null);

  private supabase;
  private logger = new Logger('Auth-Service');

  constructor(
    private router: Router
  ) {
    this.supabase = createClient(environment.SupabaseUrl, environment.SupabasePublicKey);
    this.checkUser();
  }

  login() {
    from(this.supabase.auth.signIn(
      {
        provider: 'github'
      },
      {
        redirectTo: `${window.location.origin}${environment.production ? '/crm' : ''}/callback`
      }
    )).subscribe(signInRes => {
      this.logger.log(`signInRes = `, signInRes);
      this.$user.next(signInRes.user);
    });
  }

  logout() {
    this.supabase.auth.signOut();
    this.$user.next(null);
    this.router.navigate(['/']);
  }

  checkUser() {
    this.$user.next(this.supabase.auth.user());
    this.logger.log(`user = `, this.$user.value);
    if (this.$user.value) {
      setTimeout(() => {
        this.router.navigate(['/', 'main']);
      });
    }
  }

}
