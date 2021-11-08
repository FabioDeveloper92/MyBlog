import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoginUser } from '../../model/login-user.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  @Input() isBusyLoginSignup: boolean;
  @Output() login = new EventEmitter<LoginUser>();

  loginForm: FormGroup;

  ctrlEmail: FormControl;
  ctrlPassword: FormControl;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.ctrlEmail = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);
    this.ctrlPassword = new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/),
    ]);

    this.loginForm = this.fb.group({
      email: this.ctrlEmail,
      password: this.ctrlPassword,
    });

    this.loginForm.markAsUntouched();
  }

  public onLogin() {
    var loginUser = new LoginUser();
    loginUser.email = this.ctrlEmail.value;
    loginUser.password = this.ctrlPassword.value;

    this.login.emit(loginUser);
  }
}
