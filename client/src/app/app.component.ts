import { Component, OnInit } from '@angular/core';
import { RestService } from './services/rest/rest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Energy monitor';
  constructor(private restService: RestService) { }
  ngOnInit(): void {
    this.restService.checkLocalStorageToken();
  }
}
