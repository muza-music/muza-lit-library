import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('radio-button')
export class RadioButton extends LitElement {
  @property({ type: String }) name = '';
  @property({ type: String }) value = '';
  @property({ type: String }) label = '';
  @property({ type: Boolean }) checked = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) helperText = '';
  @property({ type: String }) size = 'default'; 

  static styles = css`
    :host {
      --radio-color: var(--muza-secondary-text-color, #5f5f5f);
      --radio-checked-color: var(--muza-primary-text-color, #333333);
      --radio-disabled-color: var(--muza-tertiary-text-color, #aaa);
      --radio-focus-ring: var(--muza-button-background, #eee);
      --radio-text-color: var(--muza-primary-text-color, #333333);
      --radio-helper-text-color: var(--muza-tertiary-text-color, #aaa);
      
      display: block;
      margin-bottom: var(--muza-spacing-sm, 8px);
    }

    .radio-container {
      display: flex;
      align-items: center;
      position: relative;
      cursor: pointer;
    }

    .radio-container.disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }

    .radio-input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }

    .radio-control {
      position: relative;
      height: 16px;
      width: 16px;
      margin-right: 8px;
      border: 2px solid var(--radio-color);
      border-radius: 50%;
      flex-shrink: 0;
      transition: all 0.2s ease-in-out;
    }

    .radio-container.large .radio-control {
      height: 20px;
      width: 20px;
    }

    .radio-input:checked ~ .radio-control {
      border-color: var(--radio-checked-color);
    }

    .radio-input:checked ~ .radio-control:after {
      content: '';
      position: absolute;
      display: block;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: var(--radio-checked-color);
    }

    .radio-container.large .radio-input:checked ~ .radio-control:after {
      width: 10px;
      height: 10px;
    }

    .radio-input:focus-visible ~ .radio-control {
      box-shadow: 0 0 0 4px var(--radio-focus-ring);
      outline: none;
    }

    .radio-input:disabled ~ .radio-control {
      border-color: var(--radio-disabled-color);
    }

    .radio-input:disabled:checked ~ .radio-control:after {
      background-color: var(--radio-disabled-color);
    }

    .radio-label {
      font-size: var(--muza-primary-font-size, 14px);
      color: var(--radio-text-color);
    }

    .radio-container.large .radio-label {
      font-size: var(--muza-heading-font-size, 18px);
    }

    .radio-input:disabled ~ .radio-label {
      color: var(--radio-disabled-color);
    }

    .helper-text {
      margin-top: 4px;
      font-size: var(--muza-secondary-font-size, 12px);
      color: var(--radio-helper-text-color);
      margin-left: 24px;
    }

    .radio-container.large + .helper-text {
      margin-left: 28px;
    }
  `;

  private handleChange(e: Event) {
    const target = e.target as HTMLInputElement;
    this.checked = target.checked;
    
    this.dispatchEvent(
      new CustomEvent('radio-change', {
        detail: {
          name: this.name,
          value: this.value,
          checked: this.checked
        },
        bubbles: true,
        composed: true
      })
    );
  }

  render() {
    return html`
      <label 
        class="radio-container ${this.size === 'large' ? 'large' : ''} ${this.disabled ? 'disabled' : ''}"
      >
        <input
          type="radio"
          class="radio-input"
          name="${this.name}"
          value="${this.value}"
          ?checked="${this.checked}"
          ?disabled="${this.disabled}"
          @change="${this.handleChange}"
        >
        <span class="radio-control"></span>
        <span class="radio-label">${this.label}</span>
      </label>
      ${this.helperText ? html`<div class="helper-text">${this.helperText}</div>` : ''}
    `;
  }
}