const socket = io();

socket.emit("on_connect", "Client online");

socket.on("message", (data) => {
  console.log(data);
});

const Form = document.getElementById("myForm");
Form.addEventListener("submit", function (event) {
  event.preventDefault();
  const textInput = document.getElementById("text").value;
  console.log(textInput);
  socket.emit("create_product", { title:textInput});
  socket.emit("create_product", { title:textInput});
});
