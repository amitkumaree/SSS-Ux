import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { DOMAIN } from '../Models/model.DOMAIN';
import { MessageServiceService } from '../message-service.service';

@Component({
  selector: 'app-industry',
  templateUrl: './industry.component.html',
  styleUrls: ['./industry.component.css']
})
export class IndustryComponent implements OnInit {
  spinner = true;
  domains: DOMAIN[] = [];
  showAddIndustry = false;
  domainToSave = new DOMAIN();
  constructor(private svc: RestService,
    private messageService: MessageServiceService) { }

  ngOnInit() {
    this.getDomain();
  }

  //   sendMessage(): void {
  //     debugger;
  //     // send message to subscribers via observable subject
  //     this.messageService.sendMessage('Message from Home Component to App Component!');
  // }

  ondocumentClick(domain: DOMAIN): void {
    this.messageService.sendDomainId(domain);
  }

  clearMessage(): void {
    // clear message
    this.messageService.clearMessage();
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
    this.spinner = true;
    this.svc.delete<any>('domain', domain.DOM_ID).subscribe(
      res => {
        this.spinner = false;
        this.getDomain();
      },
      error => { console.log(error); }
    );
  }


  onSaveIndustryClick(): void {
    this.spinner = true;
    if (this.domainToSave.DOM_ID !== 0) {
      // EDIT
      this.svc.update<any>('domain', this.domainToSave).subscribe(
        res => {
          this.spinner = false;
          this.showAddIndustry = false;
          this.getDomain();
        },
        error => { console.log(error); }
      );
    } else {
      // insert
      this.svc.add<any>('domain', this.domainToSave).subscribe(
        res => {
          this.spinner = false;
          this.showAddIndustry = false;
          this.getDomain();
        },
        error => { console.log(error); }
      );
    }
  }
}
