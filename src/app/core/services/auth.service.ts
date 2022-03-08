import { Injectable } from '@angular/core';
import { createClient, User } from '@supabase/supabase-js';
import { BehaviorSubject, from, tap } from 'rxjs';
import { Logger } from 'src/classes/logger.class';
import { SupabasePublicKey, SupabaseUrl } from 'src/constants/supabase.constant';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $user = new BehaviorSubject<User | null>(null);

  private supabase;
  private logger = new Logger('Auth-Service');

  constructor() {
    this.supabase = createClient(SupabaseUrl, SupabasePublicKey);
    this.checkUser();
    window.addEventListener('hashchange', () => {
      this.checkUser();
    });
  }

  login() {
    from(this.supabase.auth.signIn({
      provider: 'github'
    })).subscribe(signInRes => {
      this.logger.log(`signInRes = `, signInRes);
      this.$user.next(signInRes.user);
    });
  }

  logout() {
    this.supabase.auth.signOut();
    this.$user.next(null);
  }

  private checkUser() {
    this.$user.next(this.supabase.auth.user());
    this.logger.log(`user = `, this.$user.value);
  }

}
