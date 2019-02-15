const uuidv1 = require('uuid/v1');

function msgWithId(message) {
  message['id'] = uuidv1();
  return JSON.stringify(message);
}

function numberOfUsersMsg(connectedClients) {
  const message = {
    type: 'onlineUsers',
    content: connectedClients 
  }
  return JSON.stringify(message);
}

function assignUserColor() {
  const colors = ['#5B85AA', '#E3B505', '#72BDA3', '#BD1E1E','#00BFB2','#C64191', '#3C1518'];
  let randomIndex = Math.floor(Math.random()*colors.length);
  const message = {
    type: 'userColor',
    content: colors[randomIndex]
  }
  return JSON.stringify(message);

}


module.exports = {
  msgWithId,
  numberOfUsersMsg,
  assignUserColor
}

