
import React from 'react'

export default function Dashboard({ me, users, onRoute }) {
  return (
    <div className="p-4">
      <div className="bg-gradient-to-r from-brand to-blue-500 text-white rounded-2xl p-4 shadow-lg">
        <div className="text-xs">Available balance</div>
        <div className="text-2xl font-bold mt-2">₦{Number(me.balance).toLocaleString()}</div>
        <div className="flex gap-2 mt-4">
          <button onClick={() => onRoute('send')} className="flex-1 bg-white/10 px-3 py-2 rounded-lg">Send</button>
          <button onClick={() => alert('Airtime (simulated)')} className="flex-1 bg-white/10 px-3 py-2 rounded-lg">Airtime</button>
          <button onClick={() => alert('Bills (simulated)')} className="flex-1 bg-white/10 px-3 py-2 rounded-lg">Pay</button>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold mb-2">Quick actions</h3>
        <div className="grid grid-cols-4 gap-3">
          <button onClick={() => onRoute('send')} className="bg-white p-3 rounded-lg shadow text-center">Send</button>
          <button onClick={() => alert('Scan (simulated)')} className="bg-white p-3 rounded-lg shadow">Scan</button>
          <button onClick={() => onRoute('transactions')} className="bg-white p-3 rounded-lg shadow">Transactions</button>
          <button onClick={() => onRoute('profile')} className="bg-white p-3 rounded-lg shadow">Profile</button>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold mb-2">Recent transactions</h3>
        <div className="space-y-2">
          {me.transactions.slice(0,6).map(tx => (
            <div key={tx.id} className="bg-white p-3 rounded-lg shadow flex justify-between items-center">
              <div>
                <div className="font-medium">{tx.direction === 'in' ? `From ${users[tx.from].name}` : `To ${users[tx.to].name}`}</div>
                <div className="text-xs text-gray-500">{new Date(tx.date).toLocaleString()}</div>
              </div>
              <div className={tx.direction === 'in' ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                {tx.direction === 'in' ? '+' : '-'}₦{Number(tx.amount).toLocaleString()}
              </div>
            </div>
          ))}
          {me.transactions.length === 0 && <div className="text-gray-500">No transactions yet</div>}
        </div>
      </div>
    </div>
  )
}
