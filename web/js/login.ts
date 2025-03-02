
const user = document.querySelector("#username") as HTMLInputElement;
const password = document.querySelector("#password") as HTMLInputElement;
const loginForm = document.querySelector("#loginForm") as HTMLFormElement;
const messageContainer = document.querySelector("#message") as HTMLDivElement; // Elemento para mostrar mensajes

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
      messageContainer.innerText = data.message; 
      messageContainer.style.color = "red";
      messageContainer.style.display = "block";

      alert("Datos incorrectos")
      
      user.value = "";
      password.value = "";
    }
  } catch (error) {
    messageContainer.innerText = "Error al conectar con el servidor"; //! error del mensaje
    messageContainer.style.color = "red";
    messageContainer.style.display = "block";
    password.style.borderColor = "red"
  }
});