import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestService } from 'src/app/services/rest/rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  httpProcessing = false;
  error = '';
  constructor(
    private formBuilder: FormBuilder,
    private restService: RestService,
  ) { }

  ngOnInit(): void {
    this.initLoginForm()
  }

  initLoginForm() {
    this.loginForm = this.formBuilder.group({
      loginName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  login() {
    this.httpProcessing = true;
    const url = 'auth/login';
    const body = this.loginForm.value;
    this.restService.post(url, body).subscribe(
      (success) => {
        this.httpProcessing = false;
        const token = success.token;
        this.restService.setToken(token);
        location.reload()
      },
      (error) => {
        this.httpProcessing = false;
        this.error = error.message || 'Oops! Something went wrong!';
        setTimeout(() => this.error = '', 5000);
      }
    );
    console.log('this.loginForm.value', this.loginForm.value)
  }
}
