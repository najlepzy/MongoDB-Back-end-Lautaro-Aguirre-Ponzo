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

const deleteButton = document.getElementById("delete_button");
deleteButton.onclick = function () {
  const id = document.getElementById("product_id").value;

  deleteProduct(id);
};

function deleteProduct(id) {}
/* delete */
