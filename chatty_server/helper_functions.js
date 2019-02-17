const uuidv1 = require('uuid/v1');
var GphApiClient = require('giphy-js-sdk-core');
client = GphApiClient("bBJLLvHgb38L7eLB258AicSzWKc3VcTn");

function msgWithId(message) {
  return new Promise(function (resolve, reject) {
    message['id'] = uuidv1();
    let sync = true;
    // checks if the message contains a Giphy command
    if(message.type === 'incomingMessage') {
      if(message.content.startsWith('/giphy')) {
        sync = false;
        let [cmd, search] = message.content.split(' ');
        client.search('gifs', {rating: 'g', q:search, limit: 1})
        .then((response) => {
          message.content = response.data[0].images.original.url;
          resolve(JSON.stringify(message))
        })
        .catch((err) => {
          reject(err);
        })
      }
    }
    if(sync) {
      resolve(JSON.stringify(message));
    }
  })
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

