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
export class AppComponent {

}
