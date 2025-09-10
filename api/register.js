const { readUsers, writeUsers } = require('./_db');
module.exports = (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({message:'Method not allowed'});
  const { name, email, password } = req.body;
  if (!email || !password || !name) return res.status(400).json({message:'Missing fields'});
  const users = readUsers();
  if (users.find(u=>u.email===email)) return res.status(400).json({message:'Email exists'});
  const newUser = { id: Date.now(), name, email, password, balance: 0, transactions: [], alerts: [] };
  users.push(newUser);
  writeUsers(users);
  return res.json(newUser);
};
