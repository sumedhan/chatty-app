const uuidv1 = require('uuid/v1');

function msgWithId(message) {
  message['id'] = uuidv1();
  return JSON.stringify(message);
}

module.exports = msgWithId;

