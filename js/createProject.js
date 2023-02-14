document
  .getElementById("createProject")
  .addEventListener("submit", createProject);

function createProject(event) {
  event.preventDefault();

  token = localStorage.getItem("token");

  if (token === null) {
    alert("You must log in");
    window.location.replace("login.html");
  }

  let name = document.getElementById("projectName").value;

  fetch("http://34.133.255.193:5000/projects/create/", {
    method: "POST",
    cache: "no-cache",
    headers: {
      "content-type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({ name: name }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status !== "success") {
        document.getElementById("status").style.display = "block";
        document.getElementById("status").innerHTML = data.error;
        setTimeout(() => {
          document.getElementById("status").style.display = "none";
        }, 4000);
      }

      if (data.status === "success") {
        document.getElementById("status").style.display = "block";
        document.getElementById("status").innerHTML = data.message;
        if (data.username === "admin") {
          window.location.replace("admin.html");
        } else {
          window.location.replace("projects.html");
        }
      }
    })
    .catch((err) => console.log(err));
}
