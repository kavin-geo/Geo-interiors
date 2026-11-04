export default function Wordmark({ footer = false }) {
  return (
    <a
      className={`wordmark${footer ? ' footer-wordmark' : ''}`}
      href="#home"
      aria-label="Geo Interiors home"
    >
      <span className="wordmark-symbol" aria-hidden="true">
        g<span>.</span>
      </span>
      <span className="wordmark-name">
        GEO
        <small>INTERIORS</small>
      </span>
    </a>
  )
}
