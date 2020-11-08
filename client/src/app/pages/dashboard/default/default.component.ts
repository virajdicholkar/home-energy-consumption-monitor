import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest/rest.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  limit = 5;
  totalPages = 0;
  totalPagesArray = [];
  currentPage = 1;
  logList = [];
  totalCount;
  start = 1;
  end = 5;
  constructor(private restService: RestService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    const limit = this.limit;
    const page = this.currentPage;
    const url = 'home/energy-log'
    this.restService.get(url, { limit, page }).subscribe((success) => {
      this.totalCount = success.totalCount;
      this.totalPages = this.totalCount % this.limit ? Math.floor(this.totalCount / this.limit) + 1 : Math.floor(this.totalCount / this.limit);
      console.log('this.totalPages', this.totalPages)
      this.totalPagesArray = [];
      for (let index = 1; index <= this.totalPages; index++) {
        this.totalPagesArray.push(index);
      }
      this.start = (this.currentPage - 1) * limit + 1;
      this.logList = success.result;
      console.log('success', success)
    }, (error) => {
      console.log('error', error)
    })
  }

  changeLimit(limit: number) {
    this.limit = limit;
    this.getData();
  }

  changeCurrentPage(page: number) {
    console.log('page', page)
    if (this.currentPage === page) {
      return;
    }
    this.currentPage = page;
    this.getData();
  }
}
