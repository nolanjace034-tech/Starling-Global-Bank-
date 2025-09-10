
import React from 'react'

export default function Toast({ message }) {
  if (!message) return null
  return (
    <div className="fixed right-4 top-20 bg-white shadow rounded p-3">{message}</div>
  )
}
