
import React from 'react'

export default function NavBar({ route, setRoute }) {
  return (
    <div className="fixed bottom-4 left-0 right-0 flex justify-center">
      <div className="w-full max-w-md flex gap-2 px-4">
        <button onClick={()=>setRoute('dashboard')} className={`flex-1 py-3 rounded-lg ${route==='dashboard' ? 'bg-brand text-white' : 'bg-white'}`}>Home</button>
        <button onClick={()=>setRoute('transactions')} className={`flex-1 py-3 rounded-lg ${route==='transactions' ? 'bg-brand text-white' : 'bg-white'}`}>Tx</button>
        <button onClick={()=>setRoute('send')} className={`flex-1 py-3 rounded-lg ${route==='send' ? 'bg-brand text-white' : 'bg-white'}`}>Send</button>
        <button onClick={()=>setRoute('admin')} className={`flex-1 py-3 rounded-lg ${route==='admin' ? 'bg-brand text-white' : 'bg-white'}`}>Admin</button>
      </div>
    </div>
  )
}
