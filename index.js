const inputForm = document.getElementById("user-form");
const enteredDOB = document.getElementById("dob");

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
enteredDOB.min = `${currentYear - 55}-01-01`;
enteredDOB.max = `${currentYear - 18}-12-31`;

// Add your other JavaScript code here (e.g., getEntries, displayEntries, saveInputForm, etc.)
const getEntries = () => {
  const inputData = localStorage.getItem("user-entries");
  return inputData ? JSON.parse(inputData) : [];
};

let inputEntries = getEntries();

const displayEntries = () => {
  const tableEntries = inputEntries.map(createTableRow).join("\n");

  const table = `<table border="10px">
    <tr>
      <th>Name</th>
      <th>Email Address</th>
      <th>Password</th>
      <th>Dob</th>
      <th>Accepted terms?</th>
    </tr>
    ${tableEntries}
  </table>`;

  document.getElementById("user-entries").innerHTML = table;
};

const createTableRow = (entry) => {
  const { name, email, password, dob, acceptTermsAndConditions } = entry;
  return `
    <tr>
      <td>${name}</td>
      <td>${email}</td>
      <td>${password}</td>
      <td>${dob}</td>
      <td>${acceptTermsAndConditions}</td>
    </tr>
  `;
};

const saveInputForm = (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptTermsAndConditions = document.getElementById("tick_mark").checked;

  const inputData = {
    name,
    email,
    password,
    dob,
    acceptTermsAndConditions,
  };

  inputEntries.push(inputData);

  localStorage.setItem("user-entries", JSON.stringify(inputEntries));
  displayEntries();
};

inputForm.addEventListener("submit", saveInputForm);
displayEntries();
