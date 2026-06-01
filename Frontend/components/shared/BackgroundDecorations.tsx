'use client'

import Image from 'next/image'

const desktopDecorations = [
  { src: '/particles/particle.gif', top: '-10%', left: '8%', size: 40 },
  { src: '/particles/particle.gif', top: '-37%', left: '15%', size: 40 },
  //{ src: '/particles/dot.gif', top: '-18%', left: '50%', size: 80 },
  { src: '/particles/particle.gif', top: '-37%', left: '85%', size: 40 },
  { src: '/particles/particle.gif', top: '-10%', left: '94%', size: 40 },

  { src: '/particles/leaf.gif', top: '10%', left: '-4%', size: 50 },
  { src: '/particles/dot.gif', top: '50%', left: '-8%', size: 80 },
  { src: '/particles/leaf.gif', top: '85%', left: '-4%', size: 50 },

  { src: '/particles/leaf.gif', top: '10%', left: '100%', size: 50 },
  { src: '/particles/dot.gif', top: '50%', left: '102%', size: 80 },
  { src: '/particles/leaf.gif', top: '85%', left: '100%', size: 50 },

  { src: '/particles/particle.gif', top: '97%', left: '10%', size: 40 },
  { src: '/particles/particle.gif', top: '102%', left: '30%', size: 40 },
  { src: '/particles/dot.gif', top: '98%', left: '50%', size: 80 },
  { src: '/particles/particle.gif', top: '102%', left: '70%', size: 40 },
  { src: '/particles/particle.gif', top: '97%', left: '90%', size: 40 },
]

const mobileDecorations = [
  { src: '/particles/particle.gif', top: '-8%', left: '00%', size: 32 },
  { src: '/particles/particle.gif', top: '-8%', left: '90%', size: 32 },

  { src: '/particles/leaf.gif', top: '30%', left: '-10%', size: 40 },
  { src: '/particles/leaf.gif', top: '30%', left: '99%', size: 40 },

  { src: '/particles/dot.gif', top: '90%', left: '50%', size: 80 },

  { src: '/particles/particle.gif', top: '95%', left: '20%', size: 32 },
  { src: '/particles/particle.gif', top: '95%', left: '80%', size: 32 },
]


export default function BackgroundDecorations() {
  return (
  <div className="absolute inset-0 pointer-events-none overflow-visible z-0">
    <div className="hidden md:block">
      {desktopDecorations.map((d, i) => (
        <Image
          key={i}
          src={d.src}
          alt=""
          width={d.size}
          height={d.size}
          unoptimized
          className="absolute"
          style={{
            top: d.top,
            left: d.left,
          }}
        />
      ))}
    </div>

    <div className="block md:hidden">
      {mobileDecorations.map((d, i) => (
        <Image
          key={i}
          src={d.src}
          alt=""
          width={d.size}
          height={d.size}
          unoptimized
          className="absolute"
          style={{
            top: d.top,
            left: d.left,
          }}
        />
      ))}
    </div>
  </div>
)
}