import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest/rest.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {

  limit = 5;
  totalPages = 0;
  totalPagesArray = [];
  currentPage = 1;
  deviceList = [];
  totalCount;
  start = 1;
  end = 5;
  constructor(private restService: RestService) { }

  ngOnInit(): void {
    this.getDevices();
  }

  getDevices() {
    const limit = this.limit;
    const page = this.currentPage;
    const url = 'device'
    this.restService.get(url, { limit, page }).subscribe((success) => {
      this.totalCount = success.totalCount;
      this.totalPages = this.totalCount % this.limit ? Math.floor(this.totalCount / this.limit) + 1 : Math.floor(this.totalCount / this.limit);
      this.totalPagesArray = [];
      for (let index = 1; index <= this.totalPages; index++) {
        this.totalPagesArray.push(index);
      }
      this.start = (this.currentPage - 1) * limit + 1;
      this.deviceList = success.result;
    }, (error) => {
      console.log('error', error)
    })
  }

  changeLimit(limit: number) {
    this.limit = limit;
    this.getDevices();
  }

  changeCurrentPage(page: number) {
    console.log('page', page)
    if (this.currentPage === page) {
      return;
    }
    this.currentPage = page;
    this.getDevices();
  }

  getToken(device) {
    const id = device._id;
    device.gettingToken = true;
    const path = `device/${id}/token`;
    this.restService.get(path).subscribe((data) => {
      device.token = data.token;
      device.gettingToken = false;
    })
  }
}