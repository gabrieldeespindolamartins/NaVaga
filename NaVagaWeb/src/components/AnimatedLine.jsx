import React from 'react'

const AnimatedLine = () => {
  return (
    <div>
        <div className="absolute top-75 left-0 w-full -z-10 h-10"
            style={{
            background: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.3) 0 40px, transparent 0 80px)',
            animation:'move 2s linear infinite'
            }}
        />
        <style>{`
            @keyframes move {
            to { background-position: 80px 0; }
            }
        `}</style>
    </div>
  )
}

export default AnimatedLine