document.getElementById('loginForm').addEventListener('submit', loginForm);

function loginForm(event){
  event.preventDefault();

  let email = document.getElementById('email').value
  let password = document.getElementById('password').value;

  const user = {
    "email": email,
    "password": password
  }

  fetch('http://localhost:8000/accounts/login/', {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  .then(res => res.json())
  .then((data) => {
    console.log(data)
    if (data.token !== null){
      document.getElementById('status').style.display = 'none';
      localStorage.setItem('token', data.token);
      window.location.replace('projects.html');
    } else {
      document.getElementById('status').style.display = 'none';
      alert(data.error)
      document.getElementById('status').innerHTML = data.error;
      setTimeout(() => {
        document.getElementById('status').style.display = 'block';
      }, 4000)
    }
  })
  .catch((err) => console.log("nothing"))
}