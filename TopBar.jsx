
import React from 'react'

export default function TopBar({ me, users, userId, onSwitch, onRoute, notificationsCount }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white shadow-sm">
      <div className="flex items-center gap-3">
        <img src="/src/assets/logo.svg" className="w-10 h-10 rounded-lg" alt="logo" />
        <div>
          <div className="text-xs text-gray-500">Welcome</div>
          <div className="font-semibold">{me.name}</div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={() => onRoute('notifications')} className="relative" title="Notifications">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
          {notificationsCount > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">{notificationsCount}</span>}
        </button>
        <select value={userId} onChange={e => onSwitch(e.target.value)} className="border rounded px-2 py-1">
          {Object.keys(users).filter(k => k !== 'admin').map(k => (
            <option key={k} value={k}>{users[k].name}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
