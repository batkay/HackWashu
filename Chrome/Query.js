function getFootprint(){
    let test = {"transactions" : {"transactionId": "ee421c25-f928-4bf6-b884-3600b76b860d",
    "mcc": 3997,
    "amount": {
      "value": 100,
      "currencyCode": "USD"
    }}};


    fetch("https://sandbox.api.mastercard.com/doconomy/supported-currencies",
    {
        method: "POST",
        body: JSON.stringify(test),
        mode: "no-cors",
        headers: {"content-type": "application/json", "Access-Control-Allow-Origin": "*"}
    })
    .then(res => res.text())
    .then(text=>{
        console.log(text);
    })
    .catch(err  => console.log(err));
}

document.getElementById("Test").addEventListener("click", getFootprint, false);