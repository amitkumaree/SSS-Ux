import { DOMAIN } from './Models/model.DOMAIN';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageServiceService {
  private subject = new Subject<any>();
  private subjectDomain = new Subject<DOMAIN>();

  sendMessage(message: string) {
    this.subject.next({ text: message });
  }

  sendDomainId(domain: DOMAIN) {
    // debugger;
    this.subjectDomain.next(domain);
  }


  clearMessage() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
}
getDomainToShow(): Observable<DOMAIN> {
  return this.subjectDomain.asObservable();
}
  constructor() { }
}
