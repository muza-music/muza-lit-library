import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../icons/LeftArrow';

@customElement('back-button')
export class BackButton extends LitElement {
  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String })
  ariaLabel = 'Go back';

  static styles = css`
    :host {
      --button-bg: var(--muza-hover-background, #ededed);
      --button-color: var(--muza-secondary-text-color, #5f5f5f);
      --button-hover-bg: var(--muza-button-hover-background, #dddddd);

      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
    }

    button {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: var(--button-bg);
      color: var(--button-color);
      border: none;
      padding: 0;
      margin: 0;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s ease;
    }

    button:hover {
      background-color: var(--button-hover-bg);
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    button ::slotted(icon-left-arrow),
    .arrow {
      width: 16px;
      height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: inherit;
      fill: currentColor;
    }

    /* Style for the icon to ensure it's centered */
    icon-left-arrow {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `;

  private handleClick() {
    if (this.disabled) return;

    this.dispatchEvent(
      new CustomEvent('back', {
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <button
        ?disabled=${this.disabled}
        aria-label=${this.ariaLabel}
        @click=${this.handleClick}
      >
        <icon-left-arrow class="arrow"></icon-left-arrow>
      </button>
    `;
  }
}
