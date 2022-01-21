//  Retrieving HTML Elements From The DOM

const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm Password");

// Functions To Update Class and Message For Errors

function showError(input, message) {
  // Get Parent Element of The Input Field (.formControl)
  const controlForm = input.parentElement;
  // Overwrite The Class -- Add Error
  controlForm.className = "formControl erorr";
  // Get The Small Element For Error Message
  const small = controlForm.querySelector("small");
  small.innerText = message;
}

function showSuccess(input) {
  // Get Parent Element of The Input Field (.formControl)
  const controlForm = input.parentElement;
  // Overwrite The Class -- Add Error
  controlForm.className = "formControl success";
}
function checkRequired(inputArray) {
  inputArray.forEach(function (input) {
    if (input.value === "") {
      showError(input, `${getFieldid(input)} is Required`);
    } else {
      showSuccess(input);
    }
  });
}

// Function To Check Email Validation

function checkEmail(input) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else if (email.value === "") {
    showError(input, "Email is Required");
  } else {
    showError(input, "Please Provide a Valid Email");
  }
}

// Function To Check Length of Username and Password
function checkLength(input, min) {
  if (input.value.length < min && input.value.length > 1) {
    showError(
      input,
      `${getFieldid(input)} Should Atleast ${min} Characters Long`
    );
  } else if (input.value === "") {
    showError(input, `${getFieldid(input)} is Required`);
  } else {
    showSuccess(input);
  }
}

// Function To Check Confirm Password Match

function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Password Do Not Match");
  }
}

// Fuction To Get id of input Field and Capitalizing

function getFieldid(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Creating Event Listener For Register Button

form.addEventListener("submit", function (e) {
  // Stop Page From Re-Loading
  e.preventDefault();

  checkRequired([username, email, password, confirmPassword]);
  checkLength(username, 3, 10);
  checkLength(password, 8);
  checkEmail(email);
  checkPasswordsMatch(password, confirmPassword);
});
