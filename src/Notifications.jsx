
import React from 'react'

export default function Notifications({ list, onClear }) {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold">Notifications</h3>
        <button onClick={onClear} className="text-sm text-brand">Clear</button>
      </div>
      <div className="space-y-2">
        {list.map(n => (
          <div key={n.id} className="bg-white p-3 rounded-lg shadow">
            <div className="text-sm">{n.message}</div>
            <div className="text-xs text-gray-400">{new Date(n.date).toLocaleString()}</div>
          </div>
        ))}
        {list.length === 0 && <div className="text-gray-500">No notifications</div>}
      </div>
    </div>
  )
}
