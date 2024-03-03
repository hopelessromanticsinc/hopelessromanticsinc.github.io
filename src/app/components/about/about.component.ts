import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StringcontentproviderService} from '../../services/stringcontentprovider.service';
import {PageContent} from '../../Interfaces/PageContent';
import {Paragraph} from "../../Interfaces/Paragraph";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  public allContent: PageContent[] = [];
  public textContent!: PageContent;

  constructor(
    private http: HttpClient,
    private stringContentProvider: StringcontentproviderService,
  ) {
  }

  ngOnInit() {
    let jsonObj = this.stringContentProvider
      .providePageContent()
      .subscribe((obj) => {
        this.textContent = obj.pages[0] as PageContent;
        this.textContent.paragraphs=obj.pages[0].content as Paragraph[]
      });
  }

}
