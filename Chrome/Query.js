let total = 0;

chrome.storage.sync.get(["totalSaved"], function (result) {
  if (result != null && result.totalSaved != undefined) {
    console.log("Value currently is " + result.totalSaved);
    total = result.totalSaved;
    document.getElementById("total").innerHTML = total;
  }
});

function updateScore() {
  let value = document.getElementById("amount").value;
  let mcc = document.querySelector("input[name = mcc]:checked").value;


if(re==true){
  document.getElementById("anime").src="main_character.gif";
  total=0;
}

//change image according to value
if(total>1000){
  document.getElementById("anime").src="";
}
else if(total>750){
  document.getElementById("anime").src="";
}
else if(total>500){
  document.getElementById("anime").src="";
}
else if(total>250){
  document.getElementById("anime").src="";
}
else{
  document.getElementById("anime").src="";
}


function getCurrencies() {
  // var value = document.getElementById("amount").innerHTML;
  console.log("100");
  // console.log(value);
  //  const data ={
  //     "transactionId": "ee421c25-f928-4bf6-b884-3600b76b860d",
  //     "mcc": 3997,
  //     "amount": {
  //       "value": 100,
  //       "currencyCode": "USD"
  //     }}
  data = {"money": 100}
  data = { money: value, mcc: mcc };
  fetch("http://localhost:8080", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((jsonic) => {
      console.log(total);
      text = parseFloat(jsonic.transactionFootprints[0].carbonEmissionInOunces);
      total += text;

      console.log(text);
      console.log(total);

      document.getElementById("impact").innerHTML = text;

      document.getElementById("total").innerHTML = total;

      chrome.storage.sync.set({ totalSaved: total }, function () {
        console.log("Value is set to " + total);
      });
    })
    .catch((err) => console.log(err));
}

function resetScore() {
  total = 0;
  document.getElementById("total").innerHTML = total;

  chrome.storage.sync.set({ totalSaved: total }, function () {
    console.log("Value is set to " + total);
  });
}

document.getElementById("submit").addEventListener("click", updateScore, false);
document.getElementById("reset").addEventListener("click", resetScore);