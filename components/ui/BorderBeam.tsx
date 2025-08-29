import React from 'react'

export function BorderBeam({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <div className={`border-beam ${className}`}>{children}</div>
}

export default BorderBeam

