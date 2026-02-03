import { useState, useEffect } from 'react'
import './App.css'
import Card from './components/Card'
import BGMPlayer from './components/BGMPlayer'
import { supabase } from './lib/supabase'

function App() {
  const [menus, setMenus] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentMenu, setCurrentMenu] = useState(null)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isShuffling, setIsShuffling] = useState(false)

  useEffect(() => {
    fetchMenus()
  }, [])

  const fetchMenus = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .schema('holistic_health_group_school_proj')
        .from('foods')
        .select('title, description, image_url, benefit, tags')
      
      if (error) throw error
      setMenus(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

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

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <p style={{ color: '#ffd700', fontSize: '1.5rem' }}>กำลังโหลดเมนู...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column' }}>
        <p style={{ color: '#ff0055', fontSize: '1.2rem' }}>เกิดข้อผิดพลาด: {error}</p>
        <button onClick={fetchMenus} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>ลองใหม่</button>
      </div>
    )
  }

  return (
    <>
      <div className="stars"></div>
      <BGMPlayer audioSrc="/audio/bgm.mp3" />
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

        <div className="card-section" style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: isFlipped && currentMenu ? 'space-between' : 'center',
          gap: '5rem',
          width: '100%',
          maxWidth: '1600px',
          transition: 'justify-content 0.3s'
        }}>
          <div style={{ transform: isShuffling ? 'scale(0.95)' : 'scale(1)', transition: 'transform 0.3s' }}>
            <Card
              isFlipped={isFlipped}
              onFlip={() => { }}
              content={currentMenu}
            />
          </div>

          {isFlipped && currentMenu && (
            <div className="details-panel" style={{
              padding: '1rem 0',
              width: '800px',
              maxHeight: '480px',
              overflowY: 'auto',
              animation: 'slideInRight 0.6s ease-out 0.3s both'
            }}>
              <h3 style={{ color: '#ffd700', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
                <span>🥗</span> วัตถุดิบ
              </h3>
              <div style={{ marginBottom: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {currentMenu.tags?.map((tag, index) => (
                  <span key={index} style={{
                    background: 'rgba(255, 215, 0, 0.15)',
                    border: '1px solid rgba(255, 215, 0, 0.4)',
                    padding: '0.4rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    color: '#ffd700'
                  }}>{tag}</span>
                )) || <span style={{ opacity: 0.6 }}>ไม่มีวัตถุดิบ</span>}
              </div>

              <h3 style={{ color: '#64b5f6', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
                <span>📝</span> รายละเอียด
              </h3>
              <p style={{ fontSize: '1rem', lineHeight: '1.7', color: 'rgba(255,255,255,0.85)', marginBottom: '1.5rem' }}>{currentMenu.description}</p>

              <h3 style={{ color: '#ff6b9d', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
                <span>❤️</span> ประโยชน์ต่อร่างกาย
              </h3>
              <p style={{ fontSize: '1rem', lineHeight: '1.7', color: 'rgba(255,255,255,0.85)' }}>{currentMenu.benefit}</p>
            </div>
          )}
        </div>

        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexDirection: 'column', alignItems: 'center' }}>
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

      </main>

      <footer style={{ marginTop: '2rem', fontSize: '0.8rem', opacity: 0.5, marginBottom: '1rem' }}>
        © 2026 Mystic Food Tarot
      </footer>
    </>
  )
}

export default App
