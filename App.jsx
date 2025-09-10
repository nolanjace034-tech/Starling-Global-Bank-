
import React, { useEffect, useMemo, useState } from 'react'
import TopBar from './components/TopBar.jsx'
import Dashboard from './components/Dashboard.jsx'
import Transactions from './components/Transactions.jsx'
import Send from './components/Send.jsx'
import Profile from './components/Profile.jsx'
import Notifications from './components/Notifications.jsx'
import AdminPanel from './components/AdminPanel.jsx'
import NavBar from './components/NavBar.jsx'
import Toast from './components/Toast.jsx'
import { loadData, saveData, genTx, STORAGE_KEY, NOTIFY_KEY } from './store/store.js'

export default function App() {
  const [data, setData] = useState(() => loadData())
  const [userId, setUserId] = useState('bankA')
  const [route, setRoute] = useState('dashboard')
  const [toId, setToId] = useState('bankB')
  const [toast, setToast] = useState(null)
  const [adminAuth, setAdminAuth] = useState(false)

  const me = useMemo(()=> data.users[userId], [data, userId])

  useEffect(() => {
    function onStorage(e) {
      if (e.key === STORAGE_KEY) {
        setData(loadData())
      }
      if (e.key === NOTIFY_KEY && e.newValue) {
        try {
          const payload = JSON.parse(e.newValue)
          if (payload.to && payload.to === userId) {
            setToast(`+₦${payload.amount} received from ${payload.fromName}`)
            setData(loadData())
            setTimeout(()=> setToast(null), 2500)
          }
        } catch {}
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [userId])

  function switchUser(id) {
    setUserId(id)
    setRoute('dashboard')
    const others = Object.keys(data.users).filter(k => k !== id && k !== 'admin')
    if (others.length) setToId(others[0])
  }

  function doSend({ toId, amount, note }) {
    if (!toId || Number(amount) <= 0) return alert('Enter recipient and valid amount')
    if (toId === userId) return alert('Cannot send to yourself')
    const d = structuredClone(data)
    const tx = genTx({ fromId: userId, toId, amount, note })

    d.users[userId].balance = Number(d.users[userId].balance) - Number(amount)
    d.users[userId].transactions.unshift({ ...tx, direction: 'out' })

    d.users[toId].balance = Number(d.users[toId].balance) + Number(amount)
    d.users[toId].transactions.unshift({ ...tx, direction: 'in' })

    const not = { id: `n_${Date.now()}`, message: `₦${amount} received from ${d.users[userId].name}`, date: new Date().toISOString(), txId: tx.id }
    d.users[toId].notifications.unshift(not)

    saveData(d)
    localStorage.setItem(NOTIFY_KEY, JSON.stringify({ to: toId, amount, from: userId, fromName: d.users[userId].name }))

    setData(d)
    setRoute('dashboard')
    setToast(`Sent ₦${amount} to ${d.users[toId].name}`)
    setTimeout(()=> setToast(null), 2000)
  }

  function clearNotificationsForMe() {
    const d = structuredClone(data)
    d.users[userId].notifications = []
    saveData(d)
    setData(d)
  }

  function createUser(newId, newName, startingBalance = 0) {
    const d = structuredClone(data)
    if (d.users[newId]) return alert('ID exists')
    d.users[newId] = {
      id: newId,
      name: newName,
      accountNumber: String(100000 + Object.keys(d.users).length + 1),
      balance: Number(startingBalance),
      avatarColor: 'bg-green-500',
      transactions: [],
      notifications: []
    }
    saveData(d)
    setData(d)
  }

  function creditUser(id, amount) {
    const d = structuredClone(data)
    d.users[id].balance = Number(d.users[id].balance) + Number(amount)
    const not = { id: `n_${Date.now()}`, message: `₦${amount} credited by admin`, date: new Date().toISOString(), txId: null }
    d.users[id].notifications.unshift(not)
    saveData(d)
    setData(d)
  }

  function tryAdmin(pw) {
    if (pw === data.admin.password) {
      setAdminAuth(true)
    } else alert('Wrong admin password')
  }

  // fix capitalization bug: True -> true
}


  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar
        me={me}
        users={data.users}
        userId={userId}
        onSwitch={switchUser}
        onRoute={setRoute}
        notificationsCount={me.notifications?.length || 0}
      />

      <div className="max-w-md mx-auto">
        {route === 'dashboard' && <Dashboard me={me} users={data.users} onRoute={setRoute} />}
        {route === 'transactions' && <Transactions me={me} users={data.users} />}
        {route === 'send' && <Send users={data.users} userId={userId} onSend={doSend} toId={toId} setToId={setToId} />}
        {route === 'profile' && <Profile me={me} />}
        {route === 'notifications' && <Notifications list={me.notifications} onClear={clearNotificationsForMe} />}
        {route === 'admin' && <AdminPanel users={data.users} onCreate={createUser} onCredit={creditUser} onAuth={tryAdmin} authed={adminAuth} />}
      </div>

      <NavBar route={route} setRoute={setRoute} />
      <Toast message={toast} />
    </div>
  )
}
