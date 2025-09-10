
import React from 'react'

export default function Transactions({ me, users }) {
  return (
    <div className="p-4">
      <h3 className="font-semibold mb-3">All transactions</h3>
      <div className="space-y-2">
        {me.transactions.map(tx => (
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
      </div>
    </div>
  )
}
