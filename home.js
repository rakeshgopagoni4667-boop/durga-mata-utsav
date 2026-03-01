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

let donations = JSON.parse(localStorage.getItem("donations")) || [];
let captchaValue = 0;
let editIndex = null;

function generateCaptcha() {
    let a = Math.floor(Math.random() * 10);
    let b = Math.floor(Math.random() * 10);
    captchaValue = a + b;
    document.getElementById("captcha").innerHTML = `<b>${a} + ${b} = ?</b>`;
}

function validateCaptcha() {
    let userAnswer = parseInt(document.getElementById("captchaInput").value);
    if (userAnswer !== captchaValue) {
        alert("Incorrect CAPTCHA!");
        generateCaptcha();
        return;
    }
    addDonation();
}

function addDonation() {
    let name = document.getElementById("name").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let amount = Number(document.getElementById("amount").value);

    if (!name || !phone || amount <= 0) {
        alert("Enter valid details!");
        return;
    }

    if (editIndex !== null) {
        donations[editIndex] = { name, phone, amount };
        editIndex = null;
    } else {
        donations.push({ name, phone, amount });
    }

    localStorage.setItem("donations", JSON.stringify(donations));
    showDonationList();
}

function renderTable() {
    let body = document.getElementById("donationTableBody");
    body.innerHTML = "";
    let total = 0;

    donations.forEach((d, i) => {
        total += Number(d.amount);
        body.innerHTML += `
        <tr>
            <td>${i + 1}</td>
            <td>${d.name}</td>
            <td>${d.phone}</td>
            <td>₹ ${Number(d.amount).toFixed(2)}</td>
            <td>
                <button onclick="editDonation(${i})">Edit</button>
                <button onclick="deleteDonation(${i})">Delete</button>
            </td>
        </tr>`;
    });

    document.getElementById("totalAmount").innerText = total.toFixed(2);
}

function editDonation(i) {
    document.getElementById("name").value = donations[i].name;
    document.getElementById("phone").value = donations[i].phone;
    document.getElementById("amount").value = donations[i].amount;
    editIndex = i;
    showDonation();
}

function deleteDonation(i) {
    donations.splice(i, 1);
    localStorage.setItem("donations", JSON.stringify(donations));
    renderTable();
}

function downloadCSV() {
    let csv = "Sr No,Name,Phone,Amount\n";
    donations.forEach((d, i) => {
        csv += `${i + 1},${d.name},${d.phone},${d.amount}\n`;
    });

    let blob = new Blob([csv], { type: "text/csv" });
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "donations.csv";
    a.click();
}

showHome();
