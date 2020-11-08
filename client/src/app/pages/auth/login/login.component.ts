import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  httpProcessing = false;
  constructor(
    private formBuilder: FormBuilder
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

  login(){
    console.log('this.loginForm.value', this.loginForm.value)
  }
}
