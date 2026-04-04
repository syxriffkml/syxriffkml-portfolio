export default function Footer() {
  return (
    <footer style={{
      background: 'var(--color-text)',
      padding: '1.75rem 0',
      textAlign: 'center',
    }}>
      <div className="container">
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.9rem',
          color: 'var(--color-text-muted)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.3rem',
          flexWrap: 'wrap',
        }}>
          <span style={{ color: '#fff', fontWeight: 600 }}>designed &amp; built by Syariff Kamil</span>
          <span>·</span>
          <span>made with</span>
          <span style={{ color: '#FF7F6E', fontSize: '1rem' }}>♥</span>
          <span>·</span>
          <span>{new Date().getFullYear()}</span>
        </p>
      </div>
    </footer>
  )
}
