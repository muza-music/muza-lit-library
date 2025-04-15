import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';


@customElement('toggle-button')
export class ToggleButton extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }
    
    .toggle-wrapper {
      position: relative;
      display: inline-flex;
      align-items: center;
      cursor: pointer;
    }
    
    .toggle {
      position: relative;
      display: inline-block;
      width: 40px;
      height: 20px;
    }
    
    .toggle input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(--muza-slider-track-color, #c2c2c2);
      transition: var(--muza-transition-speed, 0.4s);
      border-radius: var(--muza-border-radius-lg, 34px);
    }
    
    .slider:before {
      position: absolute;
      content: "";
      height: 16px;
      width: 16px;
      left: 2px;
      bottom: 2px;
      background-color: var(--muza-toggle-handle-color, white);
      transition: var(--muza-transition-speed, 0.4s);
      border-radius: 50%;
    }
    
    input:checked + .slider {
      background-color: var(--muza-toggle-active-color, #3b82f6); 
    }
    
    input:focus + .slider {
      box-shadow: 0 0 1px var(--muza-toggle-active-color, #3b82f6);
    }
    
    input:checked + .slider:before {
      transform: translateX(20px);
    }
    
    .label {
      margin-left: var(--muza-spacing-sm, 8px);
      font-size: var(--muza-secondary-font-size, 12px);
      color: var(--muza-secondary-text-color, #5f5f5f);
    }
  `;

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: String })
  label = '';
  
  @property({ type: Boolean })
  disabled = false;

  private handleToggle() {
    if (this.disabled) return;
    
    this.checked = !this.checked;
    this.dispatchToggleChange();
  }

  private dispatchToggleChange() {
    const event = new CustomEvent('toggle-change', {
      detail: { checked: this.checked },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  render() {
    return html`
      <div class="toggle-wrapper" @click=${this.handleToggle}>
        <label class="toggle">
          <input 
            type="checkbox" 
            .checked=${this.checked} 
            ?disabled=${this.disabled}
            @change=${this.handleToggle}
          >
          <span class="slider"></span>
        </label>
        ${this.label ? html`<span class="label">${this.label}</span>` : ''}
      </div>
    `;
  }
}