import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestService } from 'src/app/services/rest/rest.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  httpProcessing = false;
  registrationForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private restService: RestService
  ) { }
  success = false;
  error = '';
  ngOnInit(): void {
    this.initRegistrationForm();
  }

  initRegistrationForm() {
    this.registrationForm = this.formBuilder.group({
      ownerFirstName: ['', [Validators.required]],
      ownerLastName: ['', [Validators.required]],
      description: ['', []],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(8)]],
      loginName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  submit() {
    console.log('this.registrationForm.value', this.registrationForm.value)
    const body = this.registrationForm.value;
    const url = 'auth/register';
    this.restService.post(url, body).subscribe(
      (success) => {
        this.success = true;
        setTimeout(() => this.success = false, 5000);
      },
      (error) => {
        this.error = error.message || 'Oops! Something went wrong!';
        setTimeout(() => this.error = '', 5000);
      }
    )
  }
}
