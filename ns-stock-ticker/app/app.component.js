"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/Rx");
var AppComponent = (function () {
    function AppComponent(http) {
        this.http = http;
        this.stocks = [];
    }
    AppComponent.prototype.ngOnInit = function () {
        var symbols = ["MSFT", "AAPL", "PRGS"];
        for (var i = 0; i < symbols.length; i++) {
            this.getQuote(symbols[i]);
        }
    };
    AppComponent.prototype.getQuote = function (ticker) {
        var _this = this;
        this.http.get("http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=" + ticker)
            .map(function (result) { return result.json(); })
            .subscribe(function (result) {
            _this.stocks.push(result);
        }, function (error) {
            console.log("ERROR: ", error);
        });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: "ns-app",
        templateUrl: "app.component.html",
    }),
    __metadata("design:paramtypes", [http_1.Http])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFDMUMsc0NBQXFDO0FBQ3JDLG1CQUFpQjtBQU1qQixJQUFhLFlBQVk7SUFJckIsc0JBQTJCLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ2pDLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFTSwrQkFBUSxHQUFmO1FBQ0ksSUFBSSxPQUFPLEdBQUcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZDLEdBQUcsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUIsQ0FBQztJQUNMLENBQUM7SUFFTSwrQkFBUSxHQUFmLFVBQWdCLE1BQWM7UUFBOUIsaUJBUUM7UUFQRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpRUFBaUUsR0FBRyxNQUFNLENBQUM7YUFDcEYsR0FBRyxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFiLENBQWEsQ0FBQzthQUM1QixTQUFTLENBQUMsVUFBQSxNQUFNO1lBQ2IsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0IsQ0FBQyxFQUFFLFVBQUEsS0FBSztZQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVMLG1CQUFDO0FBQUQsQ0FBQyxBQXpCRCxJQXlCQztBQXpCWSxZQUFZO0lBSnhCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsUUFBUTtRQUNsQixXQUFXLEVBQUUsb0JBQW9CO0tBQ3BDLENBQUM7cUNBS21DLFdBQUk7R0FKNUIsWUFBWSxDQXlCeEI7QUF6Qlksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgSHR0cCB9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XG5pbXBvcnQgXCJyeGpzL1J4XCI7XG4gXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJucy1hcHBcIixcbiAgICB0ZW1wbGF0ZVVybDogXCJhcHAuY29tcG9uZW50Lmh0bWxcIixcbn0pXG5leHBvcnQgY2xhc3MgQXBwQ29tcG9uZW50IHtcbiBcbiAgICBwdWJsaWMgc3RvY2tzOiBBcnJheTxhbnk+O1xuIFxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHApIHtcbiAgICAgICAgdGhpcy5zdG9ja3MgPSBbXTtcbiAgICB9XG4gXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xuICAgICAgICBsZXQgc3ltYm9scyA9IFtcIk1TRlRcIiwgXCJBQVBMXCIsIFwiUFJHU1wiXTtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHN5bWJvbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0UXVvdGUoc3ltYm9sc1tpXSk7XG4gICAgICAgIH1cbiAgICB9XG4gXG4gICAgcHVibGljIGdldFF1b3RlKHRpY2tlcjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuaHR0cC5nZXQoXCJodHRwOi8vZGV2Lm1hcmtpdG9uZGVtYW5kLmNvbS9NT0RBcGlzL0FwaS92Mi9RdW90ZS9qc29uP3N5bWJvbD1cIiArIHRpY2tlcilcbiAgICAgICAgICAgIC5tYXAocmVzdWx0ID0+IHJlc3VsdC5qc29uKCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdG9ja3MucHVzaChyZXN1bHQpO1xuICAgICAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRVJST1I6IFwiLCBlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gXG59Il19