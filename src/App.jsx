import React, { useEffect, useState } from 'react'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Dashboard from './pages/Dashboard.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import AdminPanel from './pages/AdminPanel.jsx'

export default function App(){
  const [user, setUser] = useState(null)
  const [view, setView] = useState('login') // login|signup|dashboard|admin-login|admin-panel
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(()=>{
    const s = sessionStorage.getItem('simbank_user')
    if (s) { const parsed = JSON.parse(s); setUser(parsed); setView('dashboard'); }
  },[])

  useEffect(()=>{
    if (user) { sessionStorage.setItem('simbank_user', JSON.stringify(user)); setView('dashboard'); }
  },[user])

  return (
    <div className="container">
      <div className="header"><h1>SimBank</h1></div>
      <div style={{paddingBottom:80}}>
        {view==='login' && <Login onLogin={u=>setUser(u)} onSwitch={()=>setView('signup')} onAdmin={()=>setView('admin-login')} />}
        {view==='signup' && <Signup onSignup={u=>setUser(u)} onSwitch={()=>setView('login')} />}
        {view==='dashboard' && user && <Dashboard user={user} onLogout={()=>{ sessionStorage.removeItem('simbank_user'); setUser(null); setView('login'); }} onUserUpdate={u=>setUser(u)} />}
        {view==='admin-login' && <AdminLogin onAuth={()=>setView('admin-panel')} onBack={()=>setView('login')} />}
        {view==='admin-panel' && <AdminPanel onBack={()=>setView('login')} />}
      </div>
      <div className="footer">© SimBank Demo</div>
    </div>
  )
}
