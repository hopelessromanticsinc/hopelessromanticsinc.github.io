import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  public textContent: any;

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.http.get('/assets/content.json').subscribe(res => {
      this.textContent = res
    })
  }
}
