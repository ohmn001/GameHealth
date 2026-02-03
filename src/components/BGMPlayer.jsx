import React, { useState, useRef, useEffect } from 'react';
import './BGMPlayer.css';

const BGMPlayer = ({ audioSrc = '/audio/bgm.mp3' }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.3;
      audio.loop = true;
      audio.muted = true;
      
      // Start playing muted
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.log('Even muted autoplay failed:', err);
      });
    }
  }, []);

  // Unmute on first user click anywhere
  useEffect(() => {
    const handleFirstClick = () => {
      const audio = audioRef.current;
      if (audio && isPlaying) {
        audio.muted = false;
        setIsMuted(false);
      }
    };

    document.addEventListener('click', handleFirstClick, { once: true });
    return () => document.removeEventListener('click', handleFirstClick);
  }, [isPlaying]);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.muted = false;
      setIsMuted(false);
    } else {
      audio.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <>
      {/* Audio Element - autoplay muted */}
      <audio
        ref={audioRef}
        src={audioSrc}
        preload="auto"
        loop
        muted
      />

      {/* Mute/Unmute Button */}
      <button 
        className="bgm-toggle ready"
        onClick={toggleMute}
        title={isMuted ? 'เปิดเสียง' : 'ปิดเสียง'}
      >
        <span className="bgm-icon">
          {isMuted ? '🔇' : '🔊'}
        </span>
      </button>
    </>
  );
};

export default BGMPlayer;
