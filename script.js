
document.getElementById("continue").addEventListener("click", function () {
  // Collecting PIN code from input fields
  const pinCodeElements = document.querySelectorAll("#inputs-view .input");
  const confirmPinElements = document.querySelectorAll("#inputs-hide .input");
  //  console.log(pinCodeElements);
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


  const page1 = document.querySelector(".page1");
  const page2 = document.querySelector(".page2");

  // Fetching data from the API

  fetch(`https://api.postalpincode.in/pincode/${pinCode}`)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      const statusElement = page2.querySelector(".status");

      if (data[0].Status === "Success"){
        const postOffice = data[0].PostOffice[0];

        page2.querySelector(".status").textContent = "Data fetched successfully!";
        page2.querySelector(".status").style.color = "green"; 
        page2.querySelector(".name").textContent = `Name: ${postOffice.Name}`;
        page2.querySelector(".state").textContent = `State: ${postOffice.State}`;
        page2.querySelector(".deliveryStatus").textContent = `Delivery Status: ${postOffice.DeliveryStatus}`;
        page2.querySelector(".dist").textContent = `District: ${postOffice.District}`;
        page2.querySelector(".city").textContent = `City: ${postOffice.Block}`;
        page2.querySelector(".country").textContent = `Country: ${postOffice.Country}`;
        page2.querySelector(".pincode").textContent = `PIN Code: ${pinCode}`;

        page2.style.transform = "translateX(0%)";
        page1.style.transform = "translateX(-110%)";
      } else {
        const statusElement = page2.querySelector(".status");
        statusElement.textContent ="No delivary information found";
        statusElement.style.color = "red";

        page2.style.transform = "translateX(0%)";
        page1.style.transform = "translateX(-110%)";
      }
    })
    .catch((error) => {
      const statusElement = page2.querySelector('.status');
      statusElement.textContent = `Error: ${error.message}`;
      statusElement.style.color = "red"; 
      page2.style.transform = "translateX(0%)";
      page1.style.transform = "translateX(-110%)";
    
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





