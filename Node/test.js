let http = require("http");
// let express = require("express");
// let app = express();

function getAuthorizationHeader() {
  const forge = require("node-forge");
  const fs = require("fs");
  const p12Content = fs.readFileSync("Footprint-sandbox.p12", "binary");
  const p12Asn1 = forge.asn1.fromDer(p12Content, false);
  const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, false, "keystorepassword");
  const keyObj = p12.getBags({
    friendlyName: "keyalias",
    bagType: forge.pki.oids.pkcs8ShroudedKeyBag,
  }).friendlyName[0];
  const signingKey = forge.pki.privateKeyToPem(keyObj.key);

  const consumerKey =
    "IuC8DFSfB4t9gxwoegY7oI8iT-z_d6kZMdhmdVF9dc908e6c!12f9d1b36e83417fbe794d0e8ac9e1840000000000000000";
  const uri =
    "https://sandbox.api.mastercard.com/doconomy/supported-currencies";
  const method = "GET";
  const payload = "Hello world!";

  const oauth = require("mastercard-oauth1-signer");
  const authHeader = oauth.getAuthorizationHeader(
    uri,
    method,
    payload,
    consumerKey,
    signingKey
  );
  return authHeader;
}

function getCurrencies() {
  const forge = require("node-forge");
  const fs = require("fs");
  const p12Content = fs.readFileSync("Footprint-sandbox.p12", "binary");
  const p12Asn1 = forge.asn1.fromDer(p12Content, false);
  const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, false, "keystorepassword");
  const keyObj = p12.getBags({
    friendlyName: "keyalias",
    bagType: forge.pki.oids.pkcs8ShroudedKeyBag,
  }).friendlyName[0];
  const signingKey = forge.pki.privateKeyToPem(keyObj.key);

  const consumerKey =
    "IuC8DFSfB4t9gxwoegY7oI8iT-z_d6kZMdhmdVF9dc908e6c!12f9d1b36e83417fbe794d0e8ac9e1840000000000000000";
  const uri =
    "https://sandbox.api.mastercard.com/doconomy/supported-currencies";
  const method = "GET";
  const payload = "Hello world!";

  const oauth = require("mastercard-oauth1-signer");
  const authHeader = oauth.getAuthorizationHeader(
    uri,
    method,
    payload,
    consumerKey,
    signingKey
  );

  fetch("https://sandbox.api.mastercard.com/doconomy/supported-currencies", {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: authHeader,
    },
  })
    .then((res) => res.text())
    .then((text) => {
      console.log(text);
    })
    .catch((err) => console.log(err));
}

function getFootprint(spending, res) {
  let test = {
    "transactions" : [{
      "transactionId": "ee421c25-f928-4bf6-b884-3600b76b860d",
      "mcc": 3997,
      "amount": { value: spending, currencyCode: "USD" },}
    ],
  };
  const forge = require("node-forge");
  const fs = require("fs");
  const p12Content = fs.readFileSync("Footprint-sandbox.p12", "binary");
  const p12Asn1 = forge.asn1.fromDer(p12Content, false);
  const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, false, "keystorepassword");
  const keyObj = p12.getBags({
    friendlyName: "keyalias",
    bagType: forge.pki.oids.pkcs8ShroudedKeyBag,
  }).friendlyName[0];
  const signingKey = forge.pki.privateKeyToPem(keyObj.key);

  const consumerKey =
    "IuC8DFSfB4t9gxwoegY7oI8iT-z_d6kZMdhmdVF9dc908e6c!12f9d1b36e83417fbe794d0e8ac9e1840000000000000000";
  const uri =
    "https://sandbox.api.mastercard.com/doconomy/transaction-footprints";
  const method = "POST";
  const payload = JSON.stringify(test);

  const oauth = require("mastercard-oauth1-signer");
  const authHeader = oauth.getAuthorizationHeader(
    uri,
    method,
    payload,
    consumerKey,
    signingKey
  );

  // let test = {
  //   transactions: {
  //     transactionId: "ee421c25-f928-4bf6-b884-3600b76b860d",
  //     mcc: "3997",
  //     amount: {
  //       value: spending,
  //       currencyCode: "USD",
  //     },
  //   },
  // };

  console.log(JSON.stringify(test));

  fetch("https://sandbox.api.mastercard.com/doconomy/transaction-footprints", {
    method: "POST",
    body: JSON.stringify(test),
    headers: {
      "content-type": "application/json",
      Authorization: authHeader,
    },
  })
    .then((response) => response.text())
    .then(text => {
      res.end(text);
    })
    .catch((err) => console.log(err));
}

http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    // getCurrencies();
    getFootprint(100, res);
    // res.end("Hello World!");
  })
  .listen(8080);

// app.post("/giveFoot", (req, res) => {

// })

// app.listen(8080, (req, res) => {
//   console.log("Server Running");
// });
