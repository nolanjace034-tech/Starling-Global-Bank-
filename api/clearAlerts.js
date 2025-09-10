const { readUsers, writeUsers } = require('./_db');
module.exports = (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({message:'Method not allowed'});
  const { email } = req.body;
  if (!email) return res.status(400).json({message:'Missing email'});
  const users = readUsers();
  const u = users.find(x=>x.email===email);
  if (!u) return res.status(404).json({message:'Not found'});
  u.alerts = [];
  writeUsers(users);
  return res.json({ ok:true });
};
