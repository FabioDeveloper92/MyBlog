import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AddUserInfo } from '../../model/add-user-info.model';
import { AuthenticationType } from '../../model/authentican-type.model';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit {
  @Input() isBusyLoginSignup: boolean;
  @Output() signup = new EventEmitter<AddUserInfo>();

  registrationForm: FormGroup;

  ctrlName: FormControl;
  ctrlSurname: FormControl;
  ctrlEmail: FormControl;
  ctrlPassword: FormControl;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.ctrlName = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]);

    this.ctrlSurname = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]);

    this.ctrlEmail = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);

    this.ctrlPassword = new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/),
    ]);

    this.registrationForm = this.fb.group({
      name: this.ctrlName,
      surname: this.ctrlSurname,
      email: this.ctrlEmail,
      password: this.ctrlPassword,
    });

    this.registrationForm.markAsUntouched();
  }

  onSignup() {
    let userInfo = new AddUserInfo();

    userInfo.name = this.ctrlName.value;
    userInfo.surname = this.ctrlSurname.value;
    userInfo.email = this.ctrlEmail.value;
    userInfo.password = this.ctrlPassword.value;
    userInfo.loginWith = AuthenticationType.Jwt;

    this.signup.emit(userInfo);
  }
}
