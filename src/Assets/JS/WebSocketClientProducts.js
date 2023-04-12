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
  /* delete */
  const deleteInput = document.getElementById("delete").id;
  console.log(deleteInput);
  socket.on("delete_product", (id) => {
    let ID = productManager.deleteProduct(parseInt(id));
    socket.emit("delete_product", ID);
  });
  /* delete */
});
