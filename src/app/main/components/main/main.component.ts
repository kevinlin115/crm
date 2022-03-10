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

  get NavList() { return NavList; }

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(
    private authService: AuthService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {

  }

  logout() {
    this.authService.logout();
  }

}
