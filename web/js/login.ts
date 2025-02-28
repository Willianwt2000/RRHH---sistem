
const user = document.getElementById("username") as HTMLInputElement;
const password = document.getElementById("password") as HTMLInputElement;
const loginForm = document.querySelector("#loginForm") as HTMLFormElement;
const message = document.getElementById("message") as HTMLDivElement; // Elemento para mostrar mensajes

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Evitar que el formulario se envíe

  const userNameValue: string = user.value;
  const userPasswordValue: string = password.value;

  try {
    // Enviar datos al backend
    const response = await fetch("http://localhost:8000/account/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userNameValue,
        password: userPasswordValue,
      }),
    });
    if (!response.ok) {
      throw new Error("Fail")
    }
    const data = await response.json();

    if (data.success) {
      alert("Inicio de sesión exitoso");
      localStorage.setItem("token", data.token);
      window.location.href = "/web/html/home.html"; 

    } else {
      message.textContent = data.message; 
      message.style.color = "red";

      alert("Datos incorrectos")
      
      user.value = "";
      password.value = "";
    }
  } catch (error) {
    message.textContent = "Error al conectar con el servidor"; //! error del mensaje
    message.style.color = "red";
  }
});