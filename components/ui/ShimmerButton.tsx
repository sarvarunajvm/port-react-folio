import Link from 'next/link'
import React from 'react'

type Props = {
  href?: string
  onClick?: () => void
  children: React.ReactNode
  className?: string
}

export function ShimmerButton({ href, onClick, children, className = '' }: Props) {
  const cls = `accent-btn btn-shimmer px-4 py-2 text-sm ${className}`
  if (href) return <Link href={href} className={cls}>{children}</Link>
  return <button onClick={onClick} className={cls}>{children}</button>
}

export default ShimmerButton

