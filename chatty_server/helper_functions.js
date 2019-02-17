require('dotenv').config()

const uuidv1 = require('uuid/v1');
const GphApiClient = require('giphy-js-sdk-core');
const client = GphApiClient(process.env.GIPHY_APIKEY);



function msgHandling(message) {
  return new Promise (function (resolve, reject) {
    message['id'] = uuidv1();
    let sync = true;
    
    if(message.type === 'incomingMessage') {
      // checks if the message contains a Giphy command
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
  msgHandling,
  numberOfUsersMsg,
  assignUserColor
}

