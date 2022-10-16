let total = 0;

chrome.storage.sync.get(["totalSaved"], function (result) {
  if (result != null && result.totalSaved != undefined) {
    console.log("Value currently is " + result.totalSaved);
    total = result.totalSaved;
    document.getElementById("total").innerHTML = total;
    updateImage();
  }
});

function updateImage() {
  //change image according to value
  if (total > 1000) {
    document.getElementById("anime").src = "verysick_cactus.gif";
  } else if (total > 750) {
    document.getElementById("anime").src = "sick_cactus.gif";
  } else if (total > 500) {
    document.getElementById("anime").src = "main_cactus.gif";
  } else if (total > 250) {
    document.getElementById("anime").src = "happy_cactus.gif";
  } else {
    document.getElementById("anime").src = "veryhappy_cactus.gif";
  }
}

function previewScore() {
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
    //  total += text;

      console.log(text);
    //  console.log(total);

      document.getElementById("impact").innerHTML = text;

    //  document.getElementById("total").innerHTML = total;

    //  chrome.storage.sync.set({ totalSaved: total }, function () {
    //    console.log("Value is set to " + total);
    //  });
    //  updateImage();
    })
    .catch((err) => console.log(err));
}

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
      updateImage();
    })
    .catch((err) => console.log(err));
}

function resetScore() {
  total = 0;
  document.getElementById("total").innerHTML = total;

  chrome.storage.sync.set({ totalSaved: total }, function () {
    console.log("Value is set to " + total);
  });
  updateImage();
}

document.getElementById("submit").addEventListener("click", updateScore, false);
document.getElementById("reset").addEventListener("click", resetScore, false);
