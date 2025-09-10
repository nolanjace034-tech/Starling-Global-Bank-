const fs = require('fs');
const path = require('path');
const USERS_FILE = path.join(__dirname, 'users.json');

function readUsers(){
  try { return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8')); } catch(e){ return []; }
}
function writeUsers(users){ fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2)); }

module.exports = { readUsers, writeUsers };
