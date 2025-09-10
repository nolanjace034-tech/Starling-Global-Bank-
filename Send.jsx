
import React, { useState } from 'react'

export default function Send({ users, userId, onSend, toId, setToId }) {
  const [amount, setAmount] = useState(0)
  const [note, setNote] = useState('')

  return (
    <form onSubmit={(e)=>{ e.preventDefault(); onSend({ toId, amount, note })}} className="p-4 space-y-3">
      <h3 className="font-semibold">Send money</h3>
      <div>
        <label className="text-xs text-gray-600">To</label>
        <select value={toId} onChange={e=>setToId(e.target.value)} className="w-full border rounded p-2 mt-1">
          {Object.keys(users).filter(k => k !== userId && k !== 'admin').map(k => (
            <option key={k} value={k}>{users[k].name} — {users[k].accountNumber}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-xs text-gray-600">Amount</label>
        <input type="number" value={amount} onChange={e=>setAmount(e.target.value)} className="w-full border rounded p-2 mt-1" />
      </div>
      <div>
        <label className="text-xs text-gray-600">Note</label>
        <input value={note} onChange={e=>setNote(e.target.value)} className="w-full border rounded p-2 mt-1" />
      </div>
      <div className="flex gap-2">
        <button type="submit" className="flex-1 bg-brand text-white rounded py-2">Send</button>
        <button type="button" onClick={()=>history.back()} className="flex-1 border rounded py-2">Cancel</button>
      </div>
    </form>
  )
}
