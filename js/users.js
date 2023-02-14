
function showDropDown(event, element, itemId, isVerified) {
  let dropdownHTML;
  console.log("TFFFF");

  if (isVerified) {
    dropdownHTML = `
      <ul class="dropdown-menu text-small" style="">
        <li>
          <div
            class="open-modal dropdown-item"
            data-target="#userModal"
            onclick="deactivateUser(${itemId})"
          >
            Deactivate
          </div>
        </li>
      </ul>
    `;
  } else {
    dropdownHTML = `
      <ul class="dropdown-menu text-small" style="">
        <li>
          <div
            class="open-modal dropdown-item"
            data-target="#userModal"
            onclick="verifyUser(${itemId})"
          >
            Verify
          </div>
        </li>
      </ul>
    `;
  }

  element.insertAdjacentHTML("beforeend", dropdownHTML);
}

function verifyUser() {
  // Implement your verify user logic here
}

function deactivateUser() {
  // Implement your deactivate user logic here
}
async function getData() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.replace("./login.html");
  }

  try {
    const response = await fetch("http://localhost:8000/accounts/users/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Error: API responded with non-200 status code");
    }
    const data = await response.json();
    if (!data) {
      return Promise.reject("Error: Data returned is null");
    }
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}

getData()
  .then((data) => {
    let output = "";
    data.forEach((item) => {
      output += `<tr>
      <td class="senders"> ${item.username} </td>
      <td >${item.email} </td>
      <td class="senders">${item.verified}</td>
      <td onclick="showDropDown(event, this, ${item.id}, ${item.verified})">${item.verified}</td>
      <td class="dropdown text-end">
        <a
          href="#"
          class="d-block link-dark text-decoration-none"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
       </svg>
      </a>
      <ul class="dropdown-menu text-small" style="">
        <li>
          <div
            class="open-modal dropdown-item"
            data-target="#userModal"
          >
            Verify
          </div>
        </li>
      </ul>
    </td>
  </tr>`;
    });
    document.getElementById("appUsers").innerHTML = output;
  })
  .catch((error) => {
    console.error(error);
    document.getElementById("appUsers").innerHTML = `<li>${error}</li>`;
  });
