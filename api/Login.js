const { readUsers } = require('./_db');
module.exports = (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({message:'Method not allowed'});
  const { email, password } = req.body;
  const users = readUsers();
  const u = users.find(x => x.email === email && x.password === password);
  if (!u) return res.status(400).json({message:'Invalid credentials'});
  const { password: pw, ...safe } = u;
  return res.json(safe);
};
