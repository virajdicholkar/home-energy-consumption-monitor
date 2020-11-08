import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http'
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
  }

  initForm() {
    this.deviceForm = this.formBuilder.group({
      name: ['', Validators.required],
      token: ['', Validators.required]
    })
  }

  addDevice(){
    if(!this.deviceForm.valid){
      return;
    }
    const device = this.deviceForm.value;
    this.deviceList.push(device);
    this.deviceForm.reset();
  }

  clearForm(){
    this.deviceForm.reset();
  }

  startDevice(device){
    device.started = true;
    device.startedTime = new Date();
  }

  stopDevice(device){
    const to = new Date()
    const from: Date = device.startedTime;
    device.started = false;
    device.startedTime = null;
    const body = {
      from: from.toISOString(),
      to: to.toISOString()
    }
    const deviceToken = device.token;
    const url = 'http://localhost:3000/energy-log';
    const headers = new HttpHeaders({deviceToken});
    this.httpClient.post(url, body, { headers }).subscribe((success)=>{
      console.log('success', success)
    },(error)=>{
      console.log('error', error)
    })
  }
}
