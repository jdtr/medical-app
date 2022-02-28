import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class RegisterComponent {
  public formRegister: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    password2: ['', [Validators.required]],
    terms: [false, [Validators.required]]
  }, {
    validators: this.samePasswords('password', 'password2')
  });
  public formSubmitted: boolean;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router ) { }

  createUser() {
    this.formSubmitted = true;
    console.log(this.formRegister.value);

    if ( this.formRegister.invalid ) {
      return;
    }

    this.userService.createUser(this.formRegister.value)
      .subscribe(resp => this.router.navigateByUrl('/'),
        err => {
          console.error(err);
          Swal.fire('Error', err.error.msg, 'error');
        });
  }

  invalidField(field: string): boolean {
    if ( this.formRegister.get(field).invalid && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }
  }

  acceptTerms() {
    return !this.formRegister.get('terms').value && this.formSubmitted;
  }

  samePasswords(passOne: string, passTwo: string) {
    return (formGroup: FormGroup) => {
      const passOneControl = formGroup.get(passOne);
      const passTwoControl = formGroup.get(passTwo);

      if ( passOneControl.value === passTwoControl.value) {
        passTwoControl.setErrors(null);
      } else {
        passTwoControl.setErrors({ isNotSame: true });
      }
    };
  }

}
