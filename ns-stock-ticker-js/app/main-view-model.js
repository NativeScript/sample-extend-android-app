var Observable = require("data/observable").Observable;
var http = require("tns-core-modules/http");
var ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;

function getMessage(counter) {
    if (counter <= 0) {
        return "Hoorraaay! You unlocked the NativeScript clicker achievement!";
    } else {
        return counter + " taps left";
    }
}

function createViewModel() {
    var viewModel = new Observable();
    viewModel.counter = 42;
    viewModel.message = getMessage(viewModel.counter);

    viewModel.stocks = new ObservableArray();

    viewModel.onTap = function() {
        this.counter--;
        this.set("message", getMessage(this.counter));
    }


    let symbols = ["MSFT", "AAPL", "PRGS"];
    for (let i = 0; i < symbols.length; i++) {
        getQuote(symbols[i], viewModel.stocks);
    }

    return viewModel;
}

function getQuote(ticker, arr) {
    http.getJSON("http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=" + ticker)
        .then(result => {
            arr.push(result);
        }).catch(error => {
            console.log("ERROR: ", error);
        });
}

exports.createViewModel = createViewModel;