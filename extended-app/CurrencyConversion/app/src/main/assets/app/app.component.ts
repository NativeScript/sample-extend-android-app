import { Component } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/Rx";
 
@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})
export class AppComponent {
 
    public stocks: Array<any>;
 
    public constructor(private http: Http) {
        this.stocks = [];
    }
 
    public ngOnInit() {
        let symbols = ["MSFT", "AAPL", "PRGS"];
        for(let i = 0; i < symbols.length; i++) {
            this.getQuote(symbols[i]);
        }
    }
 
    public getQuote(ticker: string) {
        this.http.get("http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=" + ticker)
            .map(result => result.json())
            .subscribe(result => {
                this.stocks.push(result);
            }, error => {
                console.log("ERROR: ", error);
            });
    }
 
}