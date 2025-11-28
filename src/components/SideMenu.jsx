import './SideMenu.css'

function SideMenu({ customization, updateCustomization, onAddToCart }) {
  const designOptions = [
    { value: 'dinosaur', label: 'Small Dinosaurs', icon: '🦕' },
    { value: 'animals', label: 'Animals', icon: '🐾' },
    { value: 'cat', label: 'Cat Puppets', icon: '🐱' },
    { value: 'dog', label: 'Dog Puppets', icon: '🐶' }
  ]

  const colorOptions = [
    { value: '#FF6B9D', label: 'Pink' },
    { value: '#4ECDC4', label: 'Mint' },
    { value: '#95E1D3', label: 'Aqua' },
    { value: '#F38181', label: 'Coral' },
    { value: '#AA96DA', label: 'Lavender' },
    { value: '#FCBAD3', label: 'Rose' },
    { value: '#A8E6CF', label: 'Green' },
    { value: '#FFD3A5', label: 'Peach' }
  ]

  const handleSexChange = (sex) => {
    updateCustomization('sex', sex)
  }

  const handleDesignSelect = (detail) => {
    // Only one design detail can be selected at a time
    const newDetail = customization.designDetail === detail ? null : detail
    updateCustomization('designDetail', newDetail)
  }

  const handleNameChange = (e) => {
    updateCustomization('babyName', e.target.value)
  }

  const handleColorChange = (color) => {
    updateCustomization('color', color)
  }

  return (
    <div className="side-menu">
      <div className="menu-section">
        <h2 className="menu-title">Customize Your Gift</h2>
      </div>

      <div className="menu-section">
        <h3 className="section-title">Baby's Sex</h3>
        <div className="sex-selector">
          <button
            className={`sex-button ${customization.sex === 'boy' ? 'active' : ''}`}
            onClick={() => handleSexChange('boy')}
          >
            👶 Boy
          </button>
          <button
            className={`sex-button ${customization.sex === 'girl' ? 'active' : ''}`}
            onClick={() => handleSexChange('girl')}
          >
            👧 Girl
          </button>
          <button
            className={`sex-button ${customization.sex === 'neutral' ? 'active' : ''}`}
            onClick={() => handleSexChange('neutral')}
          >
            🎀 Neutral
          </button>
        </div>
      </div>

      <div className="menu-section">
        <h3 className="section-title">Design Details</h3>
        <div className="design-options">
          {designOptions.map(option => (
            <button
              key={option.value}
              className={`design-button ${customization.designDetail === option.value ? 'active' : ''}`}
              onClick={() => handleDesignSelect(option.value)}
            >
              <span className="design-icon">{option.icon}</span>
              <span className="design-label">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="menu-section">
        <h3 className="section-title">Baby's Name</h3>
        <input
          type="text"
          className="name-input"
          placeholder="Enter baby's name"
          value={customization.babyName}
          onChange={handleNameChange}
          maxLength={20}
        />
      </div>

      <div className="menu-section">
        <h3 className="section-title">Color Choice</h3>
        <div className="color-options">
          {colorOptions.map(color => (
            <button
              key={color.value}
              className={`color-button ${customization.color === color.value ? 'active' : ''}`}
              onClick={() => handleColorChange(color.value)}
              style={{ backgroundColor: color.value }}
              title={color.label}
            >
              {customization.color === color.value && (
                <span className="checkmark">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="menu-section action-section">
        <button className="add-to-cart-button" onClick={onAddToCart}>
          Add to Cart - $29.99
        </button>
      </div>
    </div>
  )
}

export default SideMenu

