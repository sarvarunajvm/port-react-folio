import React from 'react'

export function Spotlight({ className = '' }: { className?: string }) {
  return (
    <div className={`spotlight-container ${className}`} aria-hidden>
      <div className="spotlight-layer" style={{ background: 'radial-gradient(600px 300px at 20% 10%, #a5b4fc66, transparent 60%)' }} />
      <div className="spotlight-layer" style={{ background: 'radial-gradient(500px 250px at 80% 20%, #67e8f966, transparent 60%)' }} />
    </div>
  )
}

export default Spotlight

