import React, { useState } from 'react'
export default function Login({ onLogin, onSwitch, onAdmin }){
  const [email, setEmail] = useState('a@bank.com')
  const [password, setPassword] = useState('123456')
  const [loading, setLoading] = useState(false)
  async function handle(){
    setLoading(true)
    const res = await fetch('/api/login', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email, password }) })
    const data = await res.json()
    setLoading(false)
    if (res.ok) onLogin(data)
    else alert(data.message || 'Login failed')
  }
  return (
    <div className="card">
      <h2>Login</h2>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" />
      <button onClick={handle} disabled={loading}>{loading ? '...' : 'Login'}</button>
      <p style={{marginTop:8}}>Don't have account? <a href="#" onClick={e=>{e.preventDefault(); onSwitch();}}>Sign up</a></p>
      <p style={{marginTop:8}}>Admin? <a href="#" onClick={e=>{e.preventDefault(); onAdmin();}}>Admin login</a></p>
    </div>
  )
}
