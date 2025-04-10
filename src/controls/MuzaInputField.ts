import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('muza-input-field')
export class MuzaInputField extends LitElement {
  // Generic props object that accepts any properties
  @property({ type: Object })
  props: Record<string, unknown> = {};

  static styles = css`
    :host {
      --input-color: var(--muza-primary-text-color, #333333);
      --input-bg: var(--muza-input-bg, #ffffff);
      --input-border: var(--muza-border-color, #a9a9a9);
      --input-border-radius: var(--muza-border-radius-sm, 4px);
      --input-placeholder: var(--muza-tertiary-text-color, #aaa);
      --input-focus-border: var(--muza-secondary-text-color, #5f5f5f);
      --input-disabled-bg: var(--muza-input-disabled-bg, #f3f4f6);
      --input-error-border: var(--muza-input-error-border, #e53935);
      --input-success-border: var(--muza-input-success-border, #4caf50);
      --input-label-color: var(--muza-secondary-text-color, #5f5f5f);
      --input-helper-color: var(--muza-tertiary-text-color, #aaa);

      display: block;
      font-family: inherit;
      margin-bottom: var(--muza-spacing-md, 12px);
    }

    .input-container {
      position: relative;
    }

    label {
      display: block;
      margin-bottom: var(--muza-spacing-xs, 4px);
      font-size: var(--muza-secondary-font-size, 12px);
      font-weight: var(--muza-font-weight-medium, 500);
      color: var(--input-label-color);
    }

    input {
      width: 100%;
      padding: 0.625rem 0.75rem;
      font-size: var(--muza-primary-font-size, 14px);
      color: var(--input-color);
      background-color: var(--input-bg);
      border: 1px solid var(--input-border);
      border-radius: var(--input-border-radius);
      box-sizing: border-box;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }

    input::placeholder {
      color: var(--input-placeholder);
    }
    input:focus {
      outline: none;
      border-color: var(--input-focus-border);
      box-shadow: 0 0 0 1px var(--input-focus-border);
    }
    input:disabled {
      background-color: var(--input-disabled-bg);
      cursor: not-allowed;
      opacity: 0.5;
    }

    .helper-text {
      margin-top: var(--muza-spacing-xs, 4px);
      font-size: var(--muza-secondary-font-size, 12px);
      color: var(--input-helper-color);
    }

    /* States */
    input.error {
      border-color: var(--input-error-border);
    }
    input.error:focus {
      box-shadow: 0 0 0 1px var(--input-error-border);
    }
    input.success {
      border-color: var(--input-success-border);
    }
    input.success:focus {
      box-shadow: 0 0 0 1px var(--input-success-border);
    }
    .helper-text.error {
      color: var(--input-error-border);
    }
    .helper-text.success {
      color: var(--input-success-border);
    }

    /* Sizes */
    input.small {
      padding: 0.4rem 0.5rem;
      font-size: calc(var(--muza-primary-font-size, 14px) - 2px);
    }
    input.large {
      padding: 0.75rem 1rem;
      font-size: calc(var(--muza-primary-font-size, 14px) + 2px);
    }

    /* Icons */
    .leading-icon,
    .trailing-icon {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      color: var(--input-placeholder);
      pointer-events: none;
    }
    .leading-icon {
      left: 0.75rem;
    }
    .trailing-icon {
      right: 0.75rem;
    }
    input.has-leading-icon {
      padding-left: 2.5rem;
    }
    input.has-trailing-icon {
      padding-right: 2.5rem;
    }
  `;

  private _handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.props = { ...this.props, value: input.value };

    this.dispatchEvent(
      new CustomEvent('input-change', {
        detail: { value: input.value, name: this.props.name },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    // Extract props with defaults
    const {
      label = '',
      required = false,
      name = '',
      leadingIcon = '',
      type = 'text',
      value = '',
      placeholder = '',
      disabled = false,
      state = 'default',
      size = 'medium',
      trailingIcon = '',
      helperText = '',
    } = this.props;

    return html`
      <div class="input-wrapper">
        ${label
          ? html`<label for="input-${name}"
              >${label}
              ${required ? html`<span class="required">*</span>` : ''}</label
            >`
          : ''}
        <div class="input-container">
          ${leadingIcon
            ? html`<span class="leading-icon"
                ><i class="fa-solid fa-${leadingIcon}"></i
              ></span>`
            : ''}
          <input
            id="input-${name}"
            type="${type}"
            .value="${value}"
            name="${name}"
            placeholder="${placeholder}"
            ?required="${required}"
            ?disabled="${disabled}"
            class="${state} ${size} ${leadingIcon
              ? 'has-leading-icon'
              : ''} ${trailingIcon ? 'has-trailing-icon' : ''}"
            @input="${this._handleInput}"
          />
          ${trailingIcon
            ? html`<span class="trailing-icon"
                ><i class="fa-solid fa-${trailingIcon}"></i
              ></span>`
            : ''}
        </div>
        ${helperText
          ? html`<div class="helper-text ${state}">${helperText}</div>`
          : ''}
      </div>
    `;
  }
}
