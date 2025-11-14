import { useEffect, useRef } from 'react'
import './Canvas.css'

// Helper function to convert hex to RGB
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

// Calculate relative luminance
function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(val => {
    val = val / 255
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

// Calculate contrast ratio between two colors
function getContrastRatio(color1, color2) {
  const rgb1 = hexToRgb(color1)
  const rgb2 = hexToRgb(color2)
  
  if (!rgb1 || !rgb2) return 1
  
  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b)
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b)
  
  const lighter = Math.max(lum1, lum2)
  const darker = Math.min(lum1, lum2)
  
  return (lighter + 0.05) / (darker + 0.05)
}

// Get text color with maximum contrast
function getContrastText(backgroundColor) {
  const whiteContrast = getContrastRatio(backgroundColor, '#FFFFFF')
  const blackContrast = getContrastRatio(backgroundColor, '#000000')
  
  return whiteContrast > blackContrast ? '#FFFFFF' : '#000000'
}

function Canvas({ customization }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw background (light gray for contrast)
    ctx.fillStyle = '#f5f5f5'
    ctx.fillRect(0, 0, width, height)

    // Draw product base (simplified representation)
    const centerX = width / 2
    const centerY = height / 2

    // Draw circle with selected color
    const circleRadius = 180
    ctx.fillStyle = customization.color
    ctx.strokeStyle = '#333333'
    ctx.lineWidth = 3
    
    ctx.beginPath()
    ctx.arc(centerX, centerY, circleRadius, 0, 2 * Math.PI)
    ctx.fill()
    ctx.stroke()

    // Draw baby name if provided (inside the circle with contrast color)
    if (customization.babyName) {
      const textColor = getContrastText(customization.color)
      ctx.fillStyle = textColor
      ctx.font = 'bold 48px Arial'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      
      // Wrap text if too long
      const maxWidth = circleRadius * 1.6
      const words = customization.babyName.split(' ')
      let line = ''
      let y = centerY
      
      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' '
        const metrics = ctx.measureText(testLine)
        const testWidth = metrics.width
        
        if (testWidth > maxWidth && i > 0) {
          ctx.fillText(line, centerX, y)
          line = words[i] + ' '
          y += 55
        } else {
          line = testLine
        }
      }
      ctx.fillText(line, centerX, y)
    }

    // Draw sex indicator
    const sexIcons = {
      'boy': '👶',
      'girl': '👧',
      'neutral': '🎀'
    }
    const sexIcon = sexIcons[customization.sex] || '👶'
    ctx.font = '60px Arial'
    ctx.textAlign = 'center'
    ctx.fillText(sexIcon, centerX, centerY + 120)

    // Draw design detail if selected
    if (customization.designDetail) {
      const detailIcons = {
        'dinosaur': '🦕',
        'animals': '🐾',
        'cat': '🐱',
        'dog': '🐶'
      }
      const icon = detailIcons[customization.designDetail] || '✨'
      ctx.font = '50px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(icon, centerX, centerY - 120)
    }

  }, [customization])

  return (
    <div className="canvas-wrapper">
      <canvas 
        ref={canvasRef}
        width={800}
        height={1000}
        className="preview-canvas"
      />
    </div>
  )
}

export default Canvas

