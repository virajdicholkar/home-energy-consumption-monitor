import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.scss']
})
export class SimulatorComponent implements OnInit {
  deviceList = [];
  deviceForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadDevicesFromLocalStorage();
  }

  initForm() {
    this.deviceForm = this.formBuilder.group({
      name: ['', Validators.required],
      token: ['', Validators.required]
    })
  }

  addDevice() {
    if (!this.deviceForm.valid) {
      return;
    }
    const device = this.deviceForm.value;
    this.deviceList.push(device);
    this.deviceForm.reset();
    this.saveToLocalStorage();
  }

  clearForm() {
    this.deviceForm.reset();
  }

  startDevice(device) {
    device.started = true;
    device.startedTime = new Date();
    this.saveToLocalStorage();
  }

  stopDevice(device) {
    const to = new Date()
    const from: Date = new Date(device.startedTime);
    device.started = false;
    device.startedTime = null;
    const body = {
      from: from.toISOString(),
      to: to.toISOString()
    }
    const deviceToken = device.token;
    const url = `${environment.baseUrl}energy-log`;
    const headers = new HttpHeaders({ deviceToken });
    this.saveToLocalStorage();
    this.httpClient.post(url, body, { headers }).subscribe((success) => {
      console.log('success', success)
    }, (error) => {
      console.log('error', error)
    })
  }

  saveToLocalStorage() {
    localStorage.setItem('deviceList', JSON.stringify({ deviceList: this.deviceList }))

  }
  loadDevicesFromLocalStorage() {
    const deviceList = localStorage.getItem('deviceList');
    if (deviceList && deviceList !== 'undefined') {
      const parsedList = JSON.parse(deviceList);
      this.deviceList = parsedList['deviceList']
    }
  }
}
