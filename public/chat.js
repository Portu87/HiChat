// const socket = io();

// let message = document.getElementById('message');
// let username = document.getElementById('username');
// let btn = document.getElementById('send');
// let output = document.getElementById('output');
// let actions = document.getElementById('actions');

// let typing = false;

// btn.addEventListener('click', () => {
//   socket.emit('chat:message', {
//     username: username.value,
//     message: message.value
//   });
// });

// message.addEventListener('keypress', () => {
//   if (!typing) {
//     typing = true;
//     socket.emit('chat:typing', username.value);
//   }
// });

// message.addEventListener('keyup', () => {
//   typing = false;
// });

// socket.on('chat:message', (data) => {
//   actions.innerHTML = '';
//   output.innerHTML += `<p>
//     <strong>${data.username}</strong>: ${data.message}
//   </p>`;
// });

// socket.on('chat:typing', (data) => {
//   actions.innerHTML = `<p>
//     <em>${data} is typing a message</em> 
//   </p>`;
// });

// socket.on('chat:typing:end', () => {
//   actions.innerHTML = '';
// });

const socket = io();

let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

let typing = false;

btn.addEventListener('click', sendMessage);

message.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    sendMessage();
    event.preventDefault();
  }
});

message.addEventListener('keyup', () => {
  if (message.value.trim() === '') {
    typing = false;
    socket.emit('chat:typing:end');
  }
});

function sendMessage() {
  if (message.value.trim() !== '') {
    socket.emit('chat:message', {
      username: username.value,
      message: message.value
    });
    message.value = '';
    typing = false;
    socket.emit('chat:typing:end');
  }
}

message.addEventListener('input', () => {
  if (!typing) {
    typing = true;
    socket.emit('chat:typing', username.value);
  }
});

socket.on('chat:message', (data) => {
  actions.innerHTML = '';
  output.innerHTML += `<p>
    <strong>${data.username}</strong>: ${data.message}
  </p>`;
});

socket.on('chat:typing', (data) => {
  actions.innerHTML = `<p>
    <em>${data} is typing a message</em> 
  </p>`;
});

socket.on('chat:typing:end', () => {
  actions.innerHTML = '';
});
