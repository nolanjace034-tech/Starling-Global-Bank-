import React, { useEffect, useState } from 'react'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Dashboard from './pages/Dashboard.jsx'
export default function App(){
  const [user, setUser] = useState(null)
  const [view, setView] = useState('login') // login | signup | dashboard
  useEffect(()=>{
    const s = sessionStorage.getItem('simbank_user')
    if (s) setUser(JSON.parse(s))
  },[])
  useEffect(()=>{
    if (user) {
      sessionStorage.setItem('simbank_user', JSON.stringify(user))
      setView('dashboard')
    }
  }, [user])
  return (
    <div className="container">
      <div className="header"><h1>SimBank</h1></div>
      <div style={{paddingBottom:80}}>
        {view === 'login' && <Login onLogin={(u)=>{ setUser(u); }} onSwitch={()=>setView('signup')} />}
        {view === 'signup' && <Signup onSignup={(u)=>{ setUser(u); }} onSwitch={()=>setView('login')} />}
        {view === 'dashboard' && user && <Dashboard user={user} onLogout={()=>{ sessionStorage.removeItem('simbank_user'); setUser(null); setView('login'); }} onUserUpdate={(u)=> setUser(u)} />}
      </div>
    </div>
  )
}
