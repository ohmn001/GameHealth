import { useState } from 'react'
import './App.css'
import Card from './components/Card'
import { menus } from './data/menus'

function App() {
  const [currentMenu, setCurrentMenu] = useState(null)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isShuffling, setIsShuffling] = useState(false)

  const handleDraw = () => {
    if (isFlipped) {
      setIsFlipped(false)
      setTimeout(() => {
        startShuffle()
      }, 600)
    } else {
      startShuffle()
    }
  }

  const startShuffle = () => {
    setIsShuffling(true)
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * menus.length)
      setCurrentMenu(menus[randomIndex])
      setIsShuffling(false)
      setIsFlipped(true)
    }, 1000)
  }

  const handleReset = () => {
    setIsFlipped(false)
    setTimeout(() => {
      setCurrentMenu(null)
    }, 800)
  }

  return (
    <>
      <div className="stars"></div>
      <header style={{ textAlign: 'center', marginBottom: '2rem', zIndex: 10 }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Food Tarot</h1>
        <p style={{ opacity: 0.8 }}>ค้นหาเมนูพรหมลิขิตของคุณ</p>
      </header>

      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        perspective: '1000px'
      }}>

        <div style={{ transform: isShuffling ? 'scale(0.95)' : 'scale(1)', transition: 'transform 0.3s' }}>
          <Card
            isFlipped={isFlipped}
            onFlip={() => { }}
            content={currentMenu}
          />
        </div>

        <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem', flexDirection: 'column', alignItems: 'center' }}>
          {!isFlipped && !isShuffling && (
            <button
              onClick={handleDraw}
              style={{
                background: 'linear-gradient(45deg, #ffd700, #ffaa00)',
                border: 'none',
                padding: '1rem 3rem',
                borderRadius: '50px',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                color: '#2a1b3d',
                boxShadow: '0 0 20px rgba(255, 215, 0, 0.4)',
                transform: 'translateY(0)',
                transition: 'all 0.2s'
              }}
            >
              🔮 ทำนายเมนู
            </button>
          )}

          {isShuffling && (
            <p style={{ fontFamily: 'var(--font-display)', color: '#ffd700', animation: 'pulse 1s infinite' }}>
              กำลังสับไพ่...
            </p>
          )}

          {isFlipped && (
            <button
              onClick={handleReset}
              style={{
                background: 'transparent',
                border: '2px solid rgba(255,255,255,0.3)',
                padding: '0.8rem 2rem',
                borderRadius: '50px',
                color: 'white',
                marginTop: '1rem'
              }}
            >
              เลือกใหม่
            </button>
          )}
        </div>

        {isFlipped && currentMenu && (
          <div className="details-panel" style={{
            marginTop: '2rem',
            background: 'rgba(0,0,0,0.6)',
            padding: '1.5rem',
            borderRadius: '15px',
            width: '90%',
            maxWidth: '400px',
            border: '1px solid rgba(118, 0, 188, 0.5)',
            animation: 'fadeIn 1s ease-out'
          }}>
            <h3 style={{ color: '#ffd700', marginBottom: '0.5rem' }}>✨ วัตถุดิบหลัก</h3>
            <p style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>{currentMenu.ingredients.join(', ')}</p>

            <h3 style={{ color: '#ff0055', marginBottom: '0.5rem' }}>❤️ ประโยชน์ต่อร่างกาย</h3>
            <p style={{ fontSize: '0.9rem' }}>{currentMenu.benefits}</p>
          </div>
        )}

      </main>

      <footer style={{ marginTop: '2rem', fontSize: '0.8rem', opacity: 0.5, marginBottom: '1rem' }}>
        © 2026 Mystic Food Tarot
      </footer>
    </>
  )
}

export default App
