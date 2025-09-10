import React, { useEffect, useState } from 'react'
export default function AdminPanel({ onBack }){
  const [users, setUsers] = useState([])
  const [target, setTarget] = useState('a@bank.com')
  const [amount, setAmount] = useState('1000')
  useEffect(()=>{ fetchUsers(); }, [])
  async function fetchUsers(){ const res = await fetch('/api/_all'); const d = await res.json(); setUsers(d||[]); }
  async function topUp(){
    const res = await fetch('/api/adminTopup', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ adminEmail:'admin@bank.com', adminPassword:'admin123', targetEmail: target, amount }) })
    const d = await res.json()
    if (!res.ok) return alert(d.message||'Failed')
    alert('Top-up successful')
    fetchUsers()
  }
  return (
    <div>
      <div className="card">
        <h3>All users</h3>
        {users.map(u=> <div key={u.email} style={{padding:8,borderBottom:'1px solid #eee'}}><strong>{u.name}</strong> — {u.email} <div>₦{Number(u.balance||0).toLocaleString()}</div></div>)}
      </div>
      <div className="card">
        <h3>Top up user</h3>
        <select value={target} onChange={e=>setTarget(e.target.value)}>{users.map(u=> <option key={u.email} value={u.email}>{u.name} — {u.email}</option>)}</select>
        <input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Amount" />
        <button onClick={topUp}>Top up</button>
        <div style={{marginTop:8}}><button onClick={onBack}>Back to site</button></div>
      </div>
    </div>
  )
}
