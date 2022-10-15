// function getFootprint() {
//   let test = {
//     transactions: {
//       transactionId: "ee421c25-f928-4bf6-b884-3600b76b860d",
//       mcc: 3997,
//       amount: {
//         value: 100,
//         currencyCode: "USD",
//       },
//     },
//   };

//   const forge = require("node-forge");
//   const fs = require("fs");
//   const p12Content = fs.readFileSync("Footprint-sandbox.p12", "binary");
//   const p12Asn1 = forge.asn1.fromDer(p12Content, false);
//   const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, false, "keystorepassword");
//   const keyObj = p12.getBags({
//     friendlyName: "keyalias",
//     bagType: forge.pki.oids.pkcs8ShroudedKeyBag,
//   }).friendlyName[0];
//   const signingKey = forge.pki.privateKeyToPem(keyObj.key);

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

function getCurrencies() {
  
  var value = document.getElementById("amount").innerHTML;
  console.log(value)
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
    .then((res) => res.text())
    .then((text) => {
      console.log(text, value);
      document.getElementById("impact").body = text;
    })
    .catch((err) => console.log(err));
}

document
  .getElementById("submit")
  .addEventListener("click", getCurrencies, false);
