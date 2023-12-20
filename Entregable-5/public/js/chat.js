const socketChatClient = io();

const button = document.querySelector("#submitButton");

button.addEventListener("click", (e)=>{
  e.preventDefault();
  const message = document.querySelector("#message");
  const email = document.querySelector("#email");
  const chatMessage = {
    user: email.value,
    message: message.value
  }
  socketChatClient.emit("chat_information", chatMessage)
  message.value = "";
})

socketChatClient.on("chat_allMessages", (data)=>{
  console.log(data)
})