import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {StringcontentproviderService} from "../../services/stringcontentprovider.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  public textContent: any;

  constructor(private http: HttpClient,private stringContentProvider:StringcontentproviderService) {}

  ngOnInit() {
    this.textContent=this.stringContentProvider.providePageContent().subscribe((data:any)=>{
      this.textContent=data})
    }



    /*this.http.get('/assets/content.json').subscribe((res) => {
      this.textContent = res;
    });*/

}
