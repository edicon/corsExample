import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

enum ProxyType  {
  NGCONF,
  SERVER,
  LCP,
  HEROKU,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngCORS';
  data: any;
  proxyType: ProxyType = ProxyType.NGCONF;
  // proxyType: ProxyType = ProxyType.HEROKU;

  constructor(private http:HttpClient){}

  ngOnInit(){
		this.getCandy();
	}

	getCandy(){
    // Port Env:
    // $ ng serve --port 4200,
    // $ node index.js  // Port: 5000
    let proxyUrl = "http://localhost:4200/";
    if (this.proxyType === ProxyType.NGCONF) {
      // Use proxy.conf.json
      // $ ng serve --proxy-config ./src/proxy.conf.json
      proxyUrl = "http://localhost:4200/";
    } else if (this.proxyType === ProxyType.SERVER) {
      // Use server cors
      // $ npm install cors
      proxyUrl = "http://localhost:5000/";
    } else if (this.proxyType === ProxyType.LCP) {
      // Use Local-cors-proxy
      // $ npm install local-cors-proxy
      // $ ./node_modules/local-cors-proxy/bin/lcp.js --proxyUrl http://localhost:4200
      proxyUrl = "http://localhost:8010/proxy/";
    } else if (this.proxyType === ProxyType.HEROKU) {
      // proxyUrl = "https://cors-anywhere.herokuapp.com/" + "http://localhost:5000/";
      proxyUrl = "https://cors-anywhere.herokuapp.com/" + "https://api.chucknorris.io/jokes/random";

      // this.http.get('https://cors-anywhere.herokuapp.com/https://api.chucknorris.io/jokes/random').subscribe(data => {
      //   console.log(data)
      // });
    }
    let apiUrl = proxyUrl;
    if (this.proxyType !== ProxyType.HEROKU) {
      apiUrl = proxyUrl + 'candy';
    }

		this.http.get(apiUrl).subscribe(data=>{
      this.data = data;
			console.log(data)
		})
	}
}
