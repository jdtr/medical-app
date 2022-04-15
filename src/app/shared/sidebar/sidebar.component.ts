import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  public menu: any[];
  public user: User;

  // tslint:disable-next-line:variable-name
  constructor( private _sidebarService: SidebarService, private _userService: UserService ) {
    this.menu = _sidebarService.menu;
    this.user = _userService.user;
  }

  ngOnInit() {
  }

}
