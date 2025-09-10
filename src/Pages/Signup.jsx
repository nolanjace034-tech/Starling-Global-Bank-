import React, { useState } from 'react'
export default function Signup({ onSignup, onSwitch }){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  async function handle(){
    const res = await fetch('/api/register', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ name, email, password }) })
    const data = await res.json()
    if (res.ok) onSignup(data)
    else alert(data.message || 'Signup failed')
  }
  return (
    <div className="card">
      <h2>Create account</h2>
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" />
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" />
      <button onClick={handle}>Create account</button>
      <p style={{marginTop:8}}>Already have account? <a href="#" onClick={e=>{e.preventDefault(); onSwitch();}}>Login</a></p>
    </div>
  )
}
