import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UploadsService } from 'src/app/services/uploads.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  public profileForm: FormGroup;
  public user: User;
  public uploadedImage: File;
  public imgTemp: any = null;

  constructor(
      private fb: FormBuilder,
      private userService: UserService,
      private uploadService: UploadsService ) {
        this.user = userService.user;
      }

  ngOnInit() {

    this.profileForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]]
    });

  }

  updateProfile() {
    console.log(this.profileForm.value);
    this.userService.updateProfile(this.profileForm.value)
      .subscribe(resp => {
        console.log(resp);
        // tslint:disable-next-line:no-string-literal
        const { name, email } = resp['user'];
        this.user.name = name;
        this.user.email = email;
        Swal.fire('Updated', 'Changes were updated', 'success');
      },
      (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

  changeImage( file: File ) {
    this.uploadedImage = file;

    if ( !file ) {
      this.imgTemp = null;
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => this.imgTemp = reader.result;

  }

  uploadImage() {
    this.uploadService.updatePhoto(this.uploadedImage, 'users', this.user.uid)
      .then(img => {
        this.user.img = img;
        Swal.fire('Saved', 'Changes were saved', 'success');
      })
      .catch(err => {
        Swal.fire('Saved', "Image couldn't changed", 'error');
      });
  }
}
