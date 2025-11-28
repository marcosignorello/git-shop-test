import { useEffect, useRef, useState } from 'react'
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
  const containerRef = useRef(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Handle resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    window.addEventListener('orientationchange', updateDimensions)
    
    // Use ResizeObserver for more accurate container size tracking
    const resizeObserver = new ResizeObserver(updateDimensions)
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }
    
    return () => {
      window.removeEventListener('resize', updateDimensions)
      window.removeEventListener('orientationchange', updateDimensions)
      resizeObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container || dimensions.width === 0) return

    // Calculate responsive canvas size
    const containerWidth = dimensions.width || container.clientWidth
    const containerHeight = dimensions.height || container.clientHeight
    
    // Base dimensions (aspect ratio 4:5)
    const baseWidth = 800
    const baseHeight = 1000
    const aspectRatio = baseWidth / baseHeight
    
    // Calculate size to fit container while maintaining aspect ratio
    let canvasWidth = Math.min(baseWidth, containerWidth - 32) // 32px for padding
    let canvasHeight = canvasWidth / aspectRatio
    
    // If height doesn't fit, scale by height instead
    if (canvasHeight > containerHeight - 32) {
      canvasHeight = Math.min(baseHeight, containerHeight - 32)
      canvasWidth = canvasHeight * aspectRatio
    }
    
    // Set canvas size
    canvas.width = canvasWidth
    canvas.height = canvasHeight
    canvas.style.width = `${canvasWidth}px`
    canvas.style.height = `${canvasHeight}px`

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

    // Draw circle with selected color (scale based on canvas size)
    const scale = Math.min(width / 800, height / 1000)
    const circleRadius = 180 * scale
    ctx.fillStyle = customization.color
    ctx.strokeStyle = '#333333'
    ctx.lineWidth = 3 * scale
    
    ctx.beginPath()
    ctx.arc(centerX, centerY, circleRadius, 0, 2 * Math.PI)
    ctx.fill()
    ctx.stroke()

    // Draw baby name if provided (inside the circle with contrast color)
    if (customization.babyName) {
      const textColor = getContrastText(customization.color)
      ctx.fillStyle = textColor
      ctx.font = `bold ${48 * scale}px Arial`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      
      // Wrap text if too long
      const maxWidth = circleRadius * 1.6
      const words = customization.babyName.split(' ')
      let line = ''
      let y = centerY
      const lineHeight = 55 * scale
      
      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' '
        const metrics = ctx.measureText(testLine)
        const testWidth = metrics.width
        
        if (testWidth > maxWidth && i > 0) {
          ctx.fillText(line, centerX, y)
          line = words[i] + ' '
          y += lineHeight
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
    ctx.font = `${60 * scale}px Arial`
    ctx.textAlign = 'center'
    ctx.fillText(sexIcon, centerX, centerY + 120 * scale)

    // Draw design detail if selected
    if (customization.designDetail) {
      const detailIcons = {
        'dinosaur': '🦕',
        'animals': '🐾',
        'cat': '🐱',
        'dog': '🐶'
      }
      const icon = detailIcons[customization.designDetail] || '✨'
      ctx.font = `${50 * scale}px Arial`
      ctx.textAlign = 'center'
      ctx.fillText(icon, centerX, centerY - 120 * scale)
    }

  }, [customization, dimensions])

  return (
    <div className="canvas-wrapper" ref={containerRef}>
      <canvas 
        ref={canvasRef}
        className="preview-canvas"
      />
    </div>
  )
}

export default Canvas

