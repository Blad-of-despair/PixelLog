import StatsBar from './StatsBar.jsx'

export default function Header({ entries }) {
  return (
    <header className="pixel-header">
      <div className="header-deco">&#x2726; &#x2661; &#x2726; &#x2B50; &#x2726; &#x2661; &#x2726;</div>
      <h1 className="logo">&#9608; PixelLog</h1>
      <p className="subtitle">~ what did i do today? ~</p>
      <StatsBar entries={entries} />
    </header>
  )
}
