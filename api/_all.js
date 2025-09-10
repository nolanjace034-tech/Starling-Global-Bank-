const { readUsers } = require('./_db');
module.exports = (req, res) => {
  const users = readUsers();
  const safe = users.map(u=>{ const { password, ...rest } = u; return rest; });
  res.json(safe);
};
