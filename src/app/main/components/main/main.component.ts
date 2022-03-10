import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '@src/core/services/auth.service';
import { NavList } from './main';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  // Media Query
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  // User
  private user;

  // Side Nav
  get NavList() { return NavList; }

  // UI
  ui = {
    user: {
      email: '',
      avatarUrl: ''
    }
  };

  constructor(
    private authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
  ) {
    // Media Query
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    // User
    this.user = this.authService.$user.value;
    this.initUserUi();
  }

  ngOnInit(): void {

  }

  logout() {
    this.authService.logout();
  }

  private initUserUi() {
    this.ui.user.email = this.user?.email ?? '';
    this.ui.user.avatarUrl = this.user?.user_metadata['avatar_url'] ?? '';
  }

}
