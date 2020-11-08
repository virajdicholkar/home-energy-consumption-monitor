import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestService } from 'src/app/services/rest/rest.service';

@Component({
  selector: 'app-device-form',
  templateUrl: './device-form.component.html',
  styleUrls: ['./device-form.component.scss']
})
export class DeviceFormComponent implements OnInit {
  deviceForm: FormGroup;
  httpProcessing = false;
  error = '';
  successToken = '';
  constructor(
    private formBuilder: FormBuilder,
    private restService: RestService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.deviceForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      powerInWatts: ['', [Validators.required]]
    })
  }

  register() {
    this.httpProcessing = true;
    if (!this.deviceForm.valid) {
      return;
    }
    const body = this.deviceForm.value;
    const path = 'device'
    this.restService.post(path, body).subscribe((success) => {
      this.httpProcessing = false;
      this.deviceForm.reset()
      this.successToken = success.token;
      setTimeout(() => this.successToken = '', 10000)
    }, (error) => {
      this.httpProcessing = false;
      if (error.data) {
        this.error = error.data['name'] || error.data['powerInWatts'];
      } else {
        this.error = error.message || 'Oops! Something went wrong!';
      }
      setTimeout(() => this.error = '', 5000)
    })
  }
}
