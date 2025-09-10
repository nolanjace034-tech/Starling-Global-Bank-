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
