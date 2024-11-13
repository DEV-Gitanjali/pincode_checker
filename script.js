

document.getElementById("continue").addEventListener("click", function () {
  // Collecting PIN code from input fields
  const pinCodeElements = document.querySelectorAll("#inputs-view .input");
  const confirmPinElements = document.querySelectorAll("#inputs-hide .input");

  const pinCode = Array.from(pinCodeElements)
    .map((input) => input.value)
    .join("");
  const confirmPinCode = Array.from(confirmPinElements)
    .map((input) => input.value)
    .join("");

  // Checking if PIN and confirm PIN match
  if (pinCode !== confirmPinCode) {
    alert("PIN codes do not match!");
    return;
  }

  // Checking if PIN code is 6 digits
  if (pinCode.length !== 6) {
    alert("Please enter a valid 6-digit PIN code.");
    return;
  }

  // Fetching data from the API

  fetch(`https://api.postalpincode.in/pincode/751010`)
    .then((response) => response.json())
    .then((data) => {
      if (data[0].Status === "Success") {
        const postOffice = data[0].PostOffice[0];

        document.querySelector(
          ".status"
        ).textContent = `Status: ${data[0].Status}`;
        document.querySelector(
          ".name"
        ).textContent = `Name: ${postOffice.Name}`;
        document.querySelector(
          ".state"
        ).textContent = `State: ${postOffice.State}`;
        document.querySelector(
          ".deliveryStatus"
        ).textContent = `Delivery Status: ${postOffice.DeliveryStatus}`;
        document.querySelector(
          ".dist"
        ).textContent = `District: ${postOffice.District}`;
        document.querySelector(
          ".city"
        ).textContent = `City: ${postOffice.Block}`;
        document.querySelector(
          ".country"
        ).textContent = `Country: ${postOffice.Country}`;
        document.querySelector(".pincode").textContent = `PIN Code: ${pinCode}`;
      } else {
        document.querySelector(".status").textContent =
          "No delivery information found.";
      }
    })
    .catch((error) => {
      document.querySelector(".status").textContent = `Error: ${error.message}`;
      document.querySelector(".error").style.display = "block";
    
    });
});

function setupAutoTab() {
  const inputs = document.querySelectorAll(".input");

  inputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      if (input.value.length === 1) {
        // Move to the next input if it exists
        if (index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      }
    });

    // Move to previous input on backspace if empty
    input.addEventListener("keydown", (event) => {
      if (event.key === "Backspace" && input.value === "") {
        if (index > 0) {
          inputs[index - 1].focus();
        }
      }
    });
  });
}

// Initialize auto-tab functionality
setupAutoTab();





