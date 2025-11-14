import { useState } from 'react'
import Canvas from '../components/Canvas'
import SideMenu from '../components/SideMenu'
import './Customize.css'

function Customize() {
  const [customization, setCustomization] = useState({
    sex: 'boy',
    designDetail: null,
    babyName: '',
    color: '#FF6B9D'
  })

  const updateCustomization = (key, value) => {
    setCustomization(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <div className="customize-page">
      <div className="customize-container">
        <div className="canvas-column">
          <Canvas customization={customization} />
        </div>
        <div className="menu-column">
          <SideMenu 
            customization={customization}
            updateCustomization={updateCustomization}
          />
        </div>
      </div>
    </div>
  )
}

export default Customize

