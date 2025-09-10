import React, { useEffect, useState } from 'react'
export default function Dashboard({ user, onLogout, onUserUpdate }){
  const [me, setMe] = useState(user)
  const [users, setUsers] = useState([])
  const [toEmail, setToEmail] = useState('b@bank.com')
  const [amount, setAmount] = useState('1000')
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)
  useEffect(()=>{ fetchUsers(); fetchMe(); }, [])
  async function fetchUsers(){
    const res = await fetch('/api/_all'); const data = await res.json(); setUsers(data || [])
  }
  async function fetchMe(){
    const res = await fetch('/api/getUser?email=' + encodeURIComponent(user.email)); const d = await res.json(); setMe(d); onUserUpdate(d)
  }
  async function doTransfer(){
    setLoading(true)
    const res = await fetch('/api/sendMoney', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ fromEmail: user.email, toEmail, amount, note }) })
    const d = await res.json(); setLoading(false)
    if (!res.ok) return alert(d.message || 'Transfer failed')
    alert('Transfer success, receiver alerted')
    fetchMe(); fetchUsers();
  }
  async function clearAlerts(){
    await fetch('/api/clearAlerts', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email: user.email }) })
    fetchMe()
  }
  return (
    <div>
      <div className="card" style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div>
          <div style={{fontWeight:700}}>{me.name}</div>
          <div style={{fontSize:12, color:'#555'}}>{me.email}</div>
        </div>
        <div style={{textAlign:'right'}}>
          <div style={{fontWeight:700}}>₦{Number(me.balance).toLocaleString()}</div>
          <div style={{fontSize:12}}><button onClick={onLogout}>Logout</button></div>
        </div>
      </div>
      <div className="card">
        <h3>Send money</h3>
        <select value={toEmail} onChange={e=>setToEmail(e.target.value)}>
          {users.filter(u=>u.email!==user.email).map(u=> <option key={u.email} value={u.email}>{u.name} — {u.email}</option>)}
        </select>
        <input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Amount" />
        <input value={note} onChange={e=>setNote(e.target.value)} placeholder="Note (optional)" />
        <button onClick={doTransfer} disabled={loading}>{loading ? '...' : 'Send'}</button>
      </div>
      <div className="card">
        <h3>Notifications ({(me.alerts||[]).length}) <button onClick={clearAlerts} style={{marginLeft:10}}>Clear</button></h3>
        {(me.alerts||[]).length===0 && <div>No alerts</div>}
        {(me.alerts||[]).map(a=> <div key={a.id} style={{padding:8, borderBottom:'1px solid #eee'}}><strong>{a.message}</strong><br/><small>{new Date(a.date).toLocaleString()}</small></div>)}
      </div>
      <div className="card">
        <h3>Transactions</h3>
        {(me.transactions||[]).length===0 && <div>No transactions yet</div>}
        {(me.transactions||[]).map(tx => <div key={tx.id} style={{padding:8, borderBottom:'1px solid #eee'}}>
          <div><strong>{tx.type === 'sent' ? 'Sent' : 'Received'} ₦{tx.amount}</strong></div>
          <div style={{fontSize:12, color:'#555'}}>{tx.type === 'sent' ? 'To ' + tx.to : 'From ' + tx.from}</div>
          <div style={{fontSize:11, color:'#888'}}>{new Date(tx.date).toLocaleString()}</div>
        </div>)}
      </div>
    </div>
  )
}
