const homeSection = document.getElementById("homeSection");
const donationSection = document.getElementById("donationSection");
const aboutSection = document.getElementById("aboutSection");
const donationListSection = document.getElementById("donationListSection");

function hideAll() {
    homeSection.style.display = "none";
    donationSection.style.display = "none";
    aboutSection.style.display = "none";
    donationListSection.style.display = "none";
}

function showHome() {
    hideAll();
    homeSection.style.display = "flex";
}

function showDonation() {
    hideAll();
    donationSection.style.display = "block";
    generateCaptcha();
}

function showDonationList() {
    hideAll();
    donationListSection.style.display = "block";
    renderTable();
}

function showAbout() {
    hideAll();
    aboutSection.style.display = "block";
}

let captchaValue = 0;

function generateCaptcha() {
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    captchaValue = a + b;
    document.getElementById("captcha").innerHTML = `<b>${a} + ${b} = ?</b>`;
}

function validateCaptcha() {
    const userAnswer = parseInt(document.getElementById("captchaInput").value);
    if (userAnswer !== captchaValue) {
        alert("Incorrect CAPTCHA!");
        generateCaptcha();
        return;
    }
    addDonation();
}

function addDonation() {
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const amount = Number(document.getElementById("amount").value);

    if (!name || !phone || isNaN(amount) || amount <= 0) {
        alert("Enter valid details!");
        return;
    }

    // DEMO MODE (no backend)
    alert("Donation submitted successfully!");
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("captchaInput").value = "";

    showDonationList();
}

function renderTable() {
    document.getElementById("donationTableBody").innerHTML = "";
    document.getElementById("totalAmount").innerText = "0.00";
}

function downloadCSV() {
    alert("CSV download requires backend integration.");
}

showHome();
