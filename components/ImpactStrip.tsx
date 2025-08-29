export function ImpactStrip() {
  const items = [
    { k: 'Webhook gap closed', v: '10% merchants' },
    { k: 'API performance', v: '+1.5x' },
    { k: 'BLE migration', v: '-33% cost' },
    { k: 'Response time', v: '1200ms → 700ms' },
  ]
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map((it) => (
        <div key={it.k} className="subtle-card p-4">
          <div className="text-xs text-gray-500">{it.k}</div>
          <div className="mt-1 text-sm font-medium">{it.v}</div>
        </div>
      ))}
    </div>
  )
}
