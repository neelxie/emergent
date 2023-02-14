function inbox() {
  token = localStorage.getItem("token");

  if (token === null) {
    alert("You must log in");
    window.location.replace("login.html");
  }
  fetch("http://34.133.255.193:5000/projects/user/", {
    headers: {
      Authorization: `Token ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        console.log(data);
        let allProjects = "";
        data.data.forEach((project) => {
          allProjects += `
          <div class="card mb-3 shadow" style="max-width: 18rem">
          <a href="via.html?value=${project.name}" class="card-body text-succes">
            <p class="card-text"></p>
            <h5 class="card-title">${project.name}</h5>
          </a>
          <div class="card-footer bg-transparent border-success">
            <div></div>
            <div class="dropdown text-end">
              <a
                href="#"
                class="d-block link-dark text-decoration-none"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-three-dots-vertical"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
                  />
                </svg>
              </a>
              <ul class="dropdown-menu text-small" style="">
                <li>
                  <div
                    class="open-modal dropdown-item"
                    data-target="#userModal"
                  >
                    Add User
                  </div>
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <a class="dropdown-item" href="settings.html"
                    >Project Details</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>`;
        });
        if (data.status === 400) {
          document.getElementById("blank").style.display = "block";
          document.getElementById("blank").innerHTML = data.error;
        }
        if (data.status === 401) {
          document.getElementById("blank").style.display = "block";
          document.getElementById("blank").innerHTML = data.error;
          window.location.replace("index.html");
        }
        document.getElementById("projectList").innerHTML = allProjects;
      }
    });
}
