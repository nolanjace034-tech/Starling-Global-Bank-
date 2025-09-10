const { readUsers } = require('./_db');
module.exports = (req, res) => {
  const email = req.query.email || req.body.email;
  if (!email) return res.status(400).json({message:'Missing email'});
  const users = readUsers();
  const u = users.find(x => x.email === email);
  if (!u) return res.status(404).json({message:'Not found'});
  const { password, ...safe } = u;
  return res.json(safe);
};
