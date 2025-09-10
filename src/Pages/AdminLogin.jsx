import React, { useState } from 'react'
export default function AdminLogin({ onAuth, onBack }){
  const [email, setEmail] = useState('admin@bank.com')
  const [password, setPassword] = useState('admin123')
  const [loading, setLoading] = useState(false)
  async function handle(){
    setLoading(true)
    const res = await fetch('/api/login', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email, password }) })
    const data = await res.json()
    setLoading(false)
    if (res.ok && data.isAdmin) onAuth()
    else alert('Admin login failed')
  }
  return (
    <div className="card">
      <h2>Admin Login</h2>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Admin email" />
      <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" />
      <button onClick={handle} disabled={loading}>{loading ? '...' : 'Login as Admin'}</button>
      <p style={{marginTop:8}}><a href="#" onClick={e=>{e.preventDefault(); onBack();}}>Back</a></p>
    </div>
  )
}
