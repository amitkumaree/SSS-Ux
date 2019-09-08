import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public server = 'http://213.175.201.219/plesk-site-preview/svc.worldlegaldocs.com/';
   //  public server = 'http://localhost:64163/'; // DEV
    public apiUrl = 'api/';
    public serverWithApiUrl = this.server + this.apiUrl;
}
