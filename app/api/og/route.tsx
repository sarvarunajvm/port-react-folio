import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const dynamic = 'force-static'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: 64,
          background: 'linear-gradient(135deg, #eef2ff 0%, #ecfeff 100%)',
          color: '#111827',
          fontSize: 48,
          fontWeight: 700,
        }}
      >
        <div>Saravanan Kalimuthu</div>
        <div style={{ fontSize: 28, fontWeight: 500, marginTop: 12 }}>
          Senior Software Engineer · Automations & Web Apps
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
