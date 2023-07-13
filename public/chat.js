// const socket = io();

// let message = document.getElementById('message');
// let username = document.getElementById('username');
// let btn = document.getElementById('send');
// let output = document.getElementById('output');
// let actions = document.getElementById('actions');
// let usersList = document.getElementById('users-list');

// let typing = false;

// btn.addEventListener('click', sendMessage);

// message.addEventListener('keypress', (event) => {
//   if (event.key === 'Enter') {
//     sendMessage();
//     event.preventDefault();
//   }
// });

// message.addEventListener('keyup', () => {
//   if (message.value.trim() === '') {
//     typing = false;
//     socket.emit('chat:typing:end');
//   }
// });

// function sendMessage() {
//   if (message.value.trim() !== '') {
//     socket.emit('chat:message', {
//       username: username.value,
//       message: message.value
//     });
//     message.value = '';
//     typing = false;
//     socket.emit('chat:typing:end');
//   }
// }

// message.addEventListener('input', () => {
//   if (!typing) {
//     typing = true;
//     socket.emit('chat:typing', username.value);
//   }
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

// socket.on('users:update', (users) => {
//   updateUsersList(users);
// });

// function updateUsersList(users) {
//   usersList.innerHTML = '';
//   users.forEach((user) => {
//     const li = document.createElement('li');
//     li.textContent = user;
//     usersList.appendChild(li);
//   });
  
//   // Enviar el nombre de usuario al servidor
//   socket.emit('set:username', username.value);
// }





// const socket = io();

// let message = document.getElementById('message');
// let username = document.getElementById('username');
// let btn = document.getElementById('send');
// let output = document.getElementById('output');
// let actions = document.getElementById('actions');
// let usersList = document.getElementById('users-list');

// let typing = false;

// btn.addEventListener('click', sendMessage);

// message.addEventListener('keypress', (event) => {
//   if (event.key === 'Enter') {
//     sendMessage();
//     event.preventDefault();
//   }
// });

// message.addEventListener('keyup', () => {
//   if (message.value.trim() === '') {
//     typing = false;
//     socket.emit('chat:typing:end');
//   }
// });

// function sendMessage() {
//   if (message.value.trim() !== '') {
//     socket.emit('chat:message', {
//       username: username.value,
//       message: message.value
//     });
//     message.value = '';
//     typing = false;
//     socket.emit('chat:typing:end');
//   }
// }

// message.addEventListener('input', () => {
//   if (!typing) {
//     typing = true;
//     socket.emit('chat:typing', username.value);
//   }
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

// socket.on('users:update', (users) => {
//   updateUsersList(users);
// });

// function updateUsersList(users) {
//   usersList.innerHTML = '';
//   users.forEach((user) => {
//     let li = document.createElement('li');
//     li.textContent = user;
//     usersList.appendChild(li);
//   });
  
//   // Enviar el nombre de usuario al servidor
//   socket.emit('set:username', username.value);
// }

const socket = io();

let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');
let usersList = document.getElementById('users-list');

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

socket.on('users:update', (users) => {
  updateUsersList(users);
});

function updateUsersList(users) {
  usersList.innerHTML = '';
  users.forEach((user) => {
    let li = document.createElement('li');
    if (user.username) {
      li.textContent = user.username;
    } else {
      li.textContent = `Anonymous (${user.id})`;
    }
    usersList.appendChild(li);
  });
  
  // Enviar el nombre de usuario al servidor
  socket.emit('set:username', username.value);
}