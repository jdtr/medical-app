import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  public user: User;

  // tslint:disable-next-line:variable-name
  constructor( private _userService: UserService, private router: Router ) {
    this.user = _userService.user;
  }

  ngOnInit() {
    console.log(this._userService.user);
  }

  logout() {
    this._userService.logout();
  }
  search(txt) {
    console.log(txt);
    if ( txt.length === 0 ) return;
    this.router.navigateByUrl(`/dashboard/search/${txt}`);
  }
}
