import React from 'react'

export default function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <h1>Welcome to SimBank v2</h1>
      <p> banking app.</p>
    </div>
  )
}
import React from 'react'
import TopBar from './TopBar'
import Send from './Send'
import Transactions from './Transactions'
import Toast from './Toast'

export default function App() {
  return (
    <div>
      <TopBar />
      <Send />
      <Transactions />
      <Toast />
    </div>
  )
}
