import { RestService } from './../rest.service';
import { Component, OnInit } from '@angular/core';
import { Configuration } from '../app.constants';
import { DOMAIN } from '../Models/model.DOMAIN';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [Configuration, RestService]
})
export class HomeComponent implements OnInit {

  spinner = true;
  domains: DOMAIN[] = [];
  domainToSave = new DOMAIN();
  constructor(private svc: RestService) { }

  ngOnInit() {
    this.getDomain();
  }

  private getDomain(): void {
    this.spinner = true;
    this.svc.getAll<DOMAIN[]>('domain').subscribe(
      (data: DOMAIN[]) => this.domains = data,
      error => () => { },
      () => { this.spinner = false; }
    );
  }
  oneditClick(domain: DOMAIN): void {
    debugger;
  }

  ondeleteClick(domain: DOMAIN): void {
    debugger;
  }

  onSaveIndustryClick(): void {
    debugger;
    this.spinner = true;
    this.svc.add<DOMAIN>(this.domainToSave).subscribe(
      (data: DOMAIN) => this.domains.push(data),
      error => () => {},
      () => { this.spinner = false; }
    );

    this.getDomain();

  }

}
