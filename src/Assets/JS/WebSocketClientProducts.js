const socket = io();

socket.emit("on_connect", "Client online");

socket.on("message", (data) => {
  console.log(data);
});

const form = document.getElementById("myForm");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const textInput = document.getElementById("text").value;
  console.log(textInput);
  /* create */
  socket.emit("create_product", { title: textInput });
  /* create */
  form.reset();
});
/* delete */
const remove = document.getElementById("remove");
form.addEventListener("remove", function (event) {
  event.preventDefault();
  const textInput = document.getElementById("text").value;
  socket.emit("delete_product", { product: product.id });
  form.reset();
  console.log("Removed");
});
/* delete */



