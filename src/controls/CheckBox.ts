import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('muza-checkbox')
export class MuzaCheckBox extends LitElement {
  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) label = '';
  @property({ type: String }) id = '';
  @property({ type: String }) name = '';
  @property({ type: String }) value = '';
  @property({ type: String }) size = 'default';
  @property({ type: String }) variant = 'default';

  static styles = css`
    :host {
      --checkbox-color: var(--muza-primary-text-color, #333333);
      --checkbox-bg: var(--muza-input-bg, #ffffff);
      --checkbox-border: var(--muza-border-color, #d1d5db);
      --checkbox-border-radius: var(--muza-border-radius-sm, 4px);
      --checkbox-hover-border: var(--muza-checkbox-checked-bg, #3b82f6);
      --checkbox-focus-border: var(--muza-checkbox-checked-bg, #3b82f6);
      --checkbox-checked-bg: var(--muza-checkbox-checked-bg, #2563eb);
      --checkbox-disabled-bg: var(--muza-input-disabled-bg, #f3f4f6);
      --checkbox-label-color: var(--muza-secondary-text-color, #374151);

      display: block;
      font-family: inherit;
    }

    .checkbox-container {
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    input[type='checkbox'] {
      position: relative;
      appearance: none;
      width: 16px;
      height: 16px;
      border: 1px solid var(--checkbox-border);
      border-radius: var(--checkbox-border-radius);
      background-color: var(--checkbox-bg);
      margin-right: 8px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    input[type='checkbox']:hover {
      border-color: var(--checkbox-hover-border);
    }

    input[type='checkbox']:focus {
      outline: none;
      border-color: var(--checkbox-focus-border);
      box-shadow: 0 0 0 1px var(--checkbox-focus-border);
    }

    input[type='checkbox']:checked {
      background-color: var(--checkbox-checked-bg);
      border-color: var(--checkbox-checked-bg);
    }

    input[type='checkbox']:checked::before {
      content: '';
      position: absolute;
      width: 8px;
      height: 8px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='white'%3E%3Cpath fill-rule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clip-rule='evenodd'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: center;
    }

    input[type='checkbox']:disabled {
      background-color: var(--checkbox-disabled-bg);
      border-color: var(--checkbox-border);
      cursor: not-allowed;
      opacity: 0.7;
    }

    label {
      color: var(--checkbox-label-color);
      font-size: var(--muza-primary-font-size, 14px);
      cursor: pointer;
    }

    .disabled label {
      opacity: 0.7;
      cursor: not-allowed;
    }

    /* Size variants */
    input[type='checkbox'].small {
      width: 12px;
      height: 12px;
    }

    input[type='checkbox'].small:checked::before {
      width: 6px;
      height: 6px;
    }

    input[type='checkbox'].large {
      width: 20px;
      height: 20px;
    }

    input[type='checkbox'].large:checked::before {
      width: 10px;
      height: 10px;
    }

    /* Bordered variant */
    .bordered {
      padding: 8px;
      border: 1px solid var(--checkbox-border);
      border-radius: var(--checkbox-border-radius);
      transition: all 0.2s ease;
    }

    .bordered:hover {
      border-color: var(--checkbox-hover-border);
    }

    .bordered:has(input[type='checkbox']:checked) {
      border-color: var(--checkbox-checked-bg);
    }
  `;

  private _handleChange(e: Event) {
    const target = e.target as HTMLInputElement;
    this.checked = target.checked;

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          checked: this.checked,
          value: this.value,
          name: this.name,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    const uniqueId =
      this.id || `muza-checkbox-${Math.random().toString(36).substring(2, 9)}`;
    const containerClasses = {
      'checkbox-container': true,
      disabled: this.disabled,
      bordered: this.variant === 'bordered',
    };

    return html`
      <div
        class="${Object.entries(containerClasses)
          .filter(([, value]) => value)
          .map(([key]) => key)
          .join(' ')}"
      >
        <input
          type="checkbox"
          id="${uniqueId}"
          name="${this.name}"
          value="${this.value}"
          class="${this.size}"
          ?checked="${this.checked}"
          ?disabled="${this.disabled}"
          @change="${this._handleChange}"
        />
        <label for="${uniqueId}">${this.label}</label>
      </div>
    `;
  }
}
