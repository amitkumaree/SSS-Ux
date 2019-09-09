import { MessageServiceService } from './../message-service.service';
import { Component, OnDestroy } from '@angular/core';
import { DOMAIN } from '../Models/model.DOMAIN';
import { RestService } from '../rest.service';
import { SUBDOMAIN } from '../Models/model.SUBDOMAIN';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})

export class DocumentComponent implements OnDestroy {

  // message: any;
  domainToShow = new DOMAIN();
  showDocument = false;
  showAddDocument = false;
  subscription: Subscription;
  subdomainToSave = new SUBDOMAIN();
  subdomains: SUBDOMAIN[] = [];
  indust = '';
  spinner = true;
  constructor(private svc: RestService, private messageService: MessageServiceService) {
    this.spinner = true;
    this.subscription = this.messageService.getDomainToShow().subscribe(
      domain => {
        this.domainToShow = domain;
        this.getSubDomain(this.domainToShow.DOM_ID);
        this.showDocument = true;
        this.spinner = false;
        this.showAddDocument = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    // this.getSubDomain(1);
  }
  /** fetch subdomain */
  private getSubDomain(domid: number): void {
    this.spinner = true;
    this.subdomains = [];
    this.svc.getSingle<SUBDOMAIN>('subdomain', domid).subscribe(
      res => {
        if (null !== res &&
          null !== res.SUB_DOM_ID) {
          this.subdomains.push(res);
        }
        this.spinner = false;
      },
      error => () => { },
      () => { this.spinner = false; }
    );
    // this.subdomains.push(this.subdom);
  }

}
