function updateScore() {
  let value = document.getElementById("amount").value;
  let mcc = document.querySelector('input[name = mcc]:checked').value;
  console.log("mcc:"+mcc);  
  console.log(value);


//   const consumerKey =
//     "IuC8DFSfB4t9gxwoegY7oI8iT-z_d6kZMdhmdVF9dc908e6c!12f9d1b36e83417fbe794d0e8ac9e1840000000000000000";
//   const uri =
//     "https://sandbox.api.mastercard.com/doconomy/supported-currencies";
//   const method = "POST";
//   const payload = "Hello world!";

//   const oauth = require("mastercard-oauth1-signer");
//   const authHeader = oauth.getAuthorizationHeader(
//     uri,
//     method,
//     payload,
//     consumerKey,
//     signingKey
//   );

//   fetch("https://sandbox.api.mastercard.com/doconomy/supported-currencies", {
//     method: "POST",
//     body: JSON.stringify(test),
//     headers: {
//       "content-type": "application/json",
//       "Access-Control-Allow-Origin": "*",
//       Authorization: authHeader,
//     },
//   })
//     .then((res) => res.text())
//     .then((text) => {
//       console.log(text);
//     })
//     .catch((err) => console.log(err));
// }
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
  fetch("http://localhost:8080", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((jsonic) => {
      text = jsonic.transactionFootprints[0].carbonEmissionInOunces;
      console.log(text, value);
      document.getElementById("impact").innerHTML = text;
    })
    .catch((err) => console.log(err));
}

document
  .getElementById("submit")
  .addEventListener("click", updateScore, false);
