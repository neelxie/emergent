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
      output += `<li>${item.username}</li>`;
    });
    document.getElementById("appUsers").innerHTML = output;
  })
  .catch((error) => {
    console.error(error);
    document.getElementById("appUsers").innerHTML = `<li>${error}</li>`;
  });
