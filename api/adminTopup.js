const { readUsers, writeUsers } = require('./_db');
module.exports = (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({message:'Method not allowed'});
  const { adminEmail, adminPassword, targetEmail, amount } = req.body;
  const users = readUsers();
  const admin = users.find(u=>u.email===adminEmail && u.password===adminPassword && u.isAdmin);
  if (!admin) return res.status(403).json({message:'Not authorized'});
  const target = users.find(u=>u.email===targetEmail);
  if (!target) return res.status(404).json({message:'Target user not found'});
  const a = Number(amount);
  if (isNaN(a) || a <= 0) return res.status(400).json({message:'Invalid amount'});
  target.balance = (target.balance||0) + a;
  const alert = { id: 'n_'+Date.now(), message: `₦${a} credited by admin`, date: new Date().toISOString() };
  target.alerts = target.alerts || [];
  target.alerts.unshift(alert);
  writeUsers(users);
  return res.json({ ok:true, target });
};
