function updateScore() {
  let value = document.getElementById("amount").value;
  let mcc = document.querySelector('input[name = mcc]:checked').value;
  console.log("mcc:"+mcc);  
  console.log(value);


  data = {"money": value, "mcc": mcc};
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
