import { RestService } from './../rest.service';
import { Component, OnInit } from '@angular/core';
import { Configuration } from '../app.constants';
import { DOMAIN } from '../Models/model.DOMAIN';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SUBDOMAIN } from '../Models/model.SUBDOMAIN';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [Configuration, RestService]
})
export class HomeComponent implements OnInit {

  spinner = true;
  showAddIndustry = false;
  domains: DOMAIN[] = [];
  indust = '';
  subdomains: SUBDOMAIN[] = [];
  domainToSave = new DOMAIN();
  subdomainToSave = new SUBDOMAIN();
  constructor(private svc: RestService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.getDomain();
  }

  private getDomain(): void {
    this.spinner = true;
    this.svc.getAll<DOMAIN[]>('domain').subscribe(
      (data: DOMAIN[]) => this.domains = data,
      error => { console.log(error); },
      () => { this.spinner = false; }
    );
  }
  oneditClick(domain: DOMAIN): void {

    this.showAddIndustry = true;
    this.domainToSave = domain;
  }

  ondeleteClick(domain: DOMAIN): void {

  }


  openSm(content) {
    this.modalService.open(content, { size: 'sm' });
  }

  onSaveIndustryClick(): void {
    this.spinner = true;
    this.svc.add<DOMAIN>('domain', this.domainToSave).subscribe(
      res => {
        this.spinner = false;
        this.showAddIndustry = false;
        this.getDomain();
      },
      error => { console.log(error); }
    );
  }
  ondocumentClick(domid: number, industry: string): void {
    // debugger;
    this.indust = industry.toString();
    this.getSubDomain(domid);
    // debugger;
  }
/** fetch subdomain */
  private getSubDomain(domid: number): void {
    this.spinner = true;
    this.subdomains = [];
    this.svc.getSingle<SUBDOMAIN>('subdomain', domid).subscribe(
      (data: SUBDOMAIN) => this.subdomains.push(data),
      error => () => { },
      () => { this.spinner = false; }
    );
    // this.subdomains.push(this.subdom);
  }
}
