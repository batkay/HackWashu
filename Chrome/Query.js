let total = 0;
let sadness = 0;
// let can = false;

chrome.storage.local.get(["totalSaved"], function (result) {
  if (result != null && result.totalSaved != undefined) {
    console.log("Value currently is " + result.totalSaved);
    total = result.totalSaved;
    document.getElementById("total").innerHTML = total;
    updateImage();
  }
});
chrome.storage.local.get(["sad"], function (result) {
  if (result != null && result.sad != undefined) {
    console.log("Value currently is " + result.sad);
    sadness = result.sad;
    updateImage();
  }
});

function updateSadness(subtract, update = true) {
  sadness -= subtract;
  if (sadness < 0) {
    sadness = 0;
  }
  if (update) {
    chrome.storage.local.set({ sad: sadness }, function () {
      console.log("Value is set to " + sadness);
    });
  }
  
}

function updateImage(click = false) {
  if (click) {
    document.getElementById("anime").src = "images/drag_cactus.gif";
    return;
  }
  //change image according to value
  if (sadness > 1000) {
    document.getElementById("anime").src = "images/dead_cactus.gif";
  } else if (sadness > 750) {
    document.getElementById("anime").src = "images/verysick_cactus.gif";
  } else if (sadness > 500) {
    document.getElementById("anime").src = "images/sick_cactus.gif";
  } else if (sadness > 250) {
    document.getElementById("anime").src = "images/main_cactus.gif";
  } else {
    document.getElementById("anime").src = "images/happy_cactus.gif";
  }
}

function drag(event) {
  updateImage(true);
  updateSadness(1, false);
  event.preventDefault();
  console.log(event.clientX);
  if (event.clientX != 0) {
    document.getElementById("anime").style.left = event.clientX - 50;
  }
  if (event.clientY != 0) {
    document.getElementById("anime").style.top = event.clientY - 50;
  }
}
function dragDrop(event) {
  updateSadness(0);
  updateImage();
}

// function switchCursor(event) {
//   if(can){
//     document.body.style.cursor = "images/watering_can.jpg";
//   }
//   else {
//     document.body.style.cursor = "pointer";
//   }

// }

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
      text = parseFloat(jsonic.transactionFootprints[0].carbonEmissionInOunces);
      console.log(text);
      document.getElementById("impact").innerHTML = text;
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

      chrome.storage.local.set({ totalSaved: total }, function () {
        console.log("Value is set to " + total);
      });
      updateSadness(-text);
      updateImage();
    })
    .catch((err) => console.log(err));
}

function resetScore() {
  total = 0;
  document.getElementById("total").innerHTML = total;

  chrome.storage.local.set({ totalSaved: total }, function () {
    console.log("Value is set to " + total);
  });
  
  updateSadness(sadness);
  updateImage();
}

document.getElementById("submit").addEventListener("click", updateScore, false);
document.getElementById("reset").addEventListener("click", resetScore, false);
document.getElementById("anime").addEventListener("drag", drag, false);
document.getElementById("anime").addEventListener("dragend", dragDrop, false);
document
  .getElementById("preview")
  .addEventListener("click", previewScore, false);
document.getElementById("link").addEventListener(
  "click",
  (event) => {
    event.preventDefault();
    updateSadness(500);
    updateImage();
    setTimeout(()=>{}, 1000);
    window.open("https://www.carbonfootprint.com/", "_blank");
  },
  false
);
// document.getElementById("water").addEventListener("click", switchCursor, false);
