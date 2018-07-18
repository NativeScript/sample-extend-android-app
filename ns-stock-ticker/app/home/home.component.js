"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var operators_1 = require("rxjs/operators");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(http) {
        this.http = http;
        this.stocks = [];
    }
    HomeComponent.prototype.ngOnInit = function () {
        var symbols = ["MSFT", "AAPL", "PRGS"];
        for (var i = 0; i < symbols.length; i++) {
            this.getQuote(symbols[i]);
        }
    };
    HomeComponent.prototype.getQuote = function (ticker) {
        var _this = this;
        this.http.get("http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=" + ticker)
            .pipe(operators_1.map(function (result) { return result.json(); }))
            .subscribe(function (result) {
            _this.stocks.push(result);
        }, function (error) {
            console.log("ERROR: ", error);
        });
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: "Home",
            moduleId: module.id,
            templateUrl: "./home.component.html",
            styleUrls: ['./home.component.css']
        }),
        __metadata("design:paramtypes", [http_1.Http])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUMxQyxzQ0FBcUM7QUFDckMsNENBQXFDO0FBUXJDO0lBSUksdUJBQTJCLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ2pDLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFTSxnQ0FBUSxHQUFmO1FBQ0ksSUFBSSxPQUFPLEdBQUcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZDLEdBQUcsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUIsQ0FBQztJQUNMLENBQUM7SUFFTSxnQ0FBUSxHQUFmLFVBQWdCLE1BQWM7UUFBOUIsaUJBVUM7UUFURyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpRUFBaUUsR0FBRyxNQUFNLENBQUM7YUFDcEYsSUFBSSxDQUNELGVBQUcsQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBYixDQUFhLENBQUMsQ0FDL0I7YUFDQSxTQUFTLENBQUMsVUFBQSxNQUFNO1lBQ2IsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0IsQ0FBQyxFQUFFLFVBQUEsS0FBSztZQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQXpCUSxhQUFhO1FBTnpCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTTtZQUNoQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHVCQUF1QjtZQUNwQyxTQUFTLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztTQUN0QyxDQUFDO3lDQUttQyxXQUFJO09BSjVCLGFBQWEsQ0EyQnpCO0lBQUQsb0JBQUM7Q0FBQSxBQTNCRCxJQTJCQztBQTNCWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBIdHRwIH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcbmltcG9ydCB7IG1hcCB9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJIb21lXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2hvbWUuY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFsnLi9ob21lLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBIb21lQ29tcG9uZW50IHtcblxuICAgIHB1YmxpYyBzdG9ja3M6IEFycmF5PGFueT47XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwKSB7XG4gICAgICAgIHRoaXMuc3RvY2tzID0gW107XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xuICAgICAgICBsZXQgc3ltYm9scyA9IFtcIk1TRlRcIiwgXCJBQVBMXCIsIFwiUFJHU1wiXTtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHN5bWJvbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0UXVvdGUoc3ltYm9sc1tpXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UXVvdGUodGlja2VyOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5odHRwLmdldChcImh0dHA6Ly9kZXYubWFya2l0b25kZW1hbmQuY29tL01PREFwaXMvQXBpL3YyL1F1b3RlL2pzb24/c3ltYm9sPVwiICsgdGlja2VyKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKHJlc3VsdCA9PiByZXN1bHQuanNvbigpKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RvY2tzLnB1c2gocmVzdWx0KTtcbiAgICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVSUk9SOiBcIiwgZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG59Il19