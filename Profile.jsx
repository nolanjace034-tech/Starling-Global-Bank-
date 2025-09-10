
import React from 'react'

export default function Profile({ me }) {
  return (
    <div className="p-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center gap-3">
          <div className={`${me.avatarColor} w-14 h-14 rounded-full flex items-center justify-center text-white font-bold`}>
            {me.name.split(' ').map(s=>s[0]).slice(0,2).join('')}
          </div>
          <div>
            <div className="font-semibold">{me.name}</div>
            <div className="text-xs text-gray-500">Acct: {me.accountNumber}</div>
          </div>
        </div>
        <div className="mt-3">
          <div className="text-sm text-gray-500">Balance</div>
          <div className="text-xl font-bold">₦{Number(me.balance).toLocaleString()}</div>
        </div>
      </div>
    </div>
  )
}
