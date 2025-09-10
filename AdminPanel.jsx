
import React, { useState } from 'react'

export default function AdminPanel({ users, onCreate, onCredit, onAuth, authed }) {
  const [newId, setNewId] = useState('')
  const [newName, setNewName] = useState('')
  const [starting, setStarting] = useState(0)
  const [credId, setCredId] = useState(Object.keys(users)[0])
  const [credAmount, setCredAmount] = useState(0)

  return (
    <div className="p-4">
      <h3 className="font-semibold mb-3">Admin</h3>
      {!authed && (
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm">Enter admin password</div>
          <div className="mt-2 flex gap-2">
            <input type="password" placeholder="password" className="flex-1 border rounded p-2"
              onKeyDown={(e)=>{ if(e.key==='Enter') onAuth(e.target.value)}} />
            <button onClick={()=>{ const pw = prompt('Admin password'); if(pw) onAuth(pw); }} className="bg-brand text-white px-3 py-2 rounded">Login</button>
          </div>
        </div>
      )}
      {authed && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded shadow">
            <div className="text-sm font-medium">Create user</div>
            <div className="mt-2 flex gap-2 flex-wrap">
              <input placeholder="id (e.g. userC)" value={newId} onChange={e=>setNewId(e.target.value)} className="border rounded p-2" />
              <input placeholder="Name" value={newName} onChange={e=>setNewName(e.target.value)} className="border rounded p-2" />
              <input type="number" placeholder="start" value={starting} onChange={e=>setStarting(e.target.value)} className="border rounded p-2 w-24" />
              <button onClick={()=>{ if(!newId||!newName) return alert('fill'); onCreate(newId,newName,starting); setNewId(''); setNewName(''); setStarting(0); }} className="bg-green-600 text-white px-3 py-2 rounded">Create</button>
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <div className="text-sm font-medium">Credit user</div>
            <div className="mt-2 flex gap-2 flex-wrap">
              <select value={credId} onChange={e=>setCredId(e.target.value)} className="border rounded p-2">
                {Object.keys(users).filter(k => k !== 'admin').map(k => <option key={k} value={k}>{users[k].name}</option>)}
              </select>
              <input type="number" value={credAmount} onChange={e=>setCredAmount(e.target.value)} className="border rounded p-2 w-36" />
              <button onClick={()=>{ onCredit(credId, credAmount); setCredAmount(0); }} className="bg-brand text-white px-3 py-2 rounded">Credit</button>
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <div className="text-sm font-medium">All accounts</div>
            <div className="mt-2 space-y-2">
              {Object.keys(users).filter(k=>k !== 'admin').map(k => (
                <div key={k} className="flex justify-between items-center p-2 border rounded">
                  <div>
                    <div className="font-medium">{users[k].name}</div>
                    <div className="text-xs text-gray-500">{users[k].accountNumber}</div>
                  </div>
                  <div className="font-semibold">₦{Number(users[k].balance).toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
