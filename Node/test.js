var http = require('http');

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

http.createServer(function (req, res) {

  res.writeHead(200, {'Content-Type': 'text/html'});
  getCurrencies();
  res.end('Hello World!');
}).listen(8080);