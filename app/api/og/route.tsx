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
          alignItems: 'center',
          justifyContent: 'center',
          padding: 64,
          background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #12121a 100%)',
          color: '#ffffff',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            background: 'linear-gradient(90deg, #00ffff, #ff00ff)',
            backgroundClip: 'text',
            color: 'transparent',
            marginBottom: 16,
          }}
        >
          Saravanan Kalimuthu
        </div>
        <div style={{ fontSize: 32, fontWeight: 500, color: '#b4b4b4' }}>
          Senior Software Engineer @ PayPal
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 20,
            color: '#39ff14',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          Building systems that scale
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
