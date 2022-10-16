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