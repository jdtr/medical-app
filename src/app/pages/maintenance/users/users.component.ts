import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { User } from '../../../models/user.model';
import { SearchService } from '../../../services/search.service';
import { ModalImageService } from '../../../services/modal-image.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  public totalUsers = 0;
  public users: User[] = [];
  public usersTemp: User[] = [];
  public from = 0;
  public loading = false;
  public imgSub$: Subscription;

  constructor(
    private userService: UserService,
    private searchService: SearchService,
    private modalImageService: ModalImageService
  ) { }

  ngOnInit() {
    this.loadUsers();
    this.imgSub$ = this.modalImageService.newImage
      .pipe(delay(100))
      .subscribe(img => this.loadUsers());
  }

  loadUsers() {
    this.loading = true;
    this.userService.getUsers()
      .subscribe((resp: any) => {
        console.log(resp);
        this.totalUsers = resp.total;
        this.loading = false;
        if ( resp.users === 0 ) {
          return;
        }
        this.users = resp.users;
        this.usersTemp = resp.users;
      });
  }

  changePage(value: number) {
    this.from += value;
    if ( this.from < 0 ) {
      this.from = 0;
    } else if ( this.from > this.totalUsers ) {
      this.from -= value;
    }
    this.loadUsers();
  }

  search(term: string) {
    if ( term.length === 0 ) {
      this.users = this.usersTemp;
      return;
    }
    this.searchService.search('users', term)
      .subscribe((resp: User[]) => this.users = resp);
  }

  deleteUser(e, user) {
    e.preventDefault();
    if ( user.uid === this.userService.uid) {
      return Swal.fire('Error', 'You can not delete you');
    }

    Swal.fire({
      title: 'Delete user?',
      text: `Do you want to delete to ${user.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete'
    }).then(result => {
      this.userService.deleteUser(user)
        .subscribe(resp => {
          this.loadUsers();
          Swal.fire(
            'Deleted user',
            `${user.name} was deleted successfuly`,
            'success'
          );
        });
    });
  }

  changeRole(user: User) {
    this.userService.saveUser(user)
      .subscribe(resp => {
        console.log(resp);
      });
  }

  openModal (user: User) {
    console.log(user)
    this.modalImageService.openModal('users', user.uid, user.img);
  }

  ngOnDestroy() {
    this.imgSub$.unsubscribe();
  }
}
