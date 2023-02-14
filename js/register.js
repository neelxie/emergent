document
  .getElementById("registerForm")
  .addEventListener("submit", registerForm);

function registerForm(event) {
  event.preventDefault();

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let firstname = document.getElementById("firstname").value;
  let lastname = document.getElementById("lastname").value;
  let username = document.getElementById("username").value;

  const user = {
    email: email,
    password: password,
    username: username,
    first_name: firstname,
    last_name: lastname,
  };

  fetch("http://34.133.255.193:5000/accounts/register/", {
    method: "POST",
    cache: "no-cache",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.message === "Successfully Registered") {
        document.getElementById("status").style.display = "none";
        window.location.replace("registerSuccess.html?email=" + email);
      } else {
        document.getElementById("status").style.display = "none";
        alert(Object.entries(data)[0]);
        document.getElementById("status").innerHTML = Object.entries(data)[0];
        setTimeout(() => {
          document.getElementById("status").style.display = "block";
        }, 4000);
      }
    })
    .catch((err) => console.log("Failed to Register"));
}
