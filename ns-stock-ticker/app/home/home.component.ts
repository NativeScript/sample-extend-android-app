import { Component } from "@angular/core";
import { Http } from "@angular/http";
import { map } from "rxjs/operators";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ['./home.component.css']
})
export class HomeComponent {

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
            .pipe(
                map(result => result.json())
            )
            .subscribe(result => {
                this.stocks.push(result);
            }, error => {
                console.log("ERROR: ", error);
            });
    }

}