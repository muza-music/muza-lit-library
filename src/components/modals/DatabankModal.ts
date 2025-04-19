import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('databank-modal')
export class DataBankModal extends LitElement {
  @property({ type: Boolean }) isOpen = false;

  static styles = css`
    :host {
      --modal-background: var(--muza-modal-background, #ffffff);
      --modal-text-color: var(--muza-text-color, #000000);
      --modal-secondary-text: var(--muza-tertiary-text-color, #6b7280);
      --button-red-background: var(--muza-red-background, #dc2626);
      --button-blue-background: var(--muza-blue-background, #3b82f6);
      --button-gray-background: var(--muza-gray-background, #f3f4f6);
      --button-text-color: var(--muza-button-text-color, #ffffff);
      --overlay-background: var(--muza-overlay-background, rgba(0, 0, 0, 0.5));
      --border-color: var(--muza-border-color, #e5e7eb);
      --title-font-family: var(
        --muza-title-font-family,
        'Founders Grotesk Text Test',
        system-ui,
        sans-serif
      );
    }

    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(--overlay-background);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 50;
    }

    .modal-container {
      width: 625px;
      height: 331px;
      border-radius: 8px;
      border-width: 1px;
      padding-top: 8px;
      padding-bottom: 12px;
      gap: 12px;
      overflow: hidden;
    }

    .modal-content {
      background-color: var(--modal-background);
      border-radius: 8px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    .modal-upper {
      width: 588px;
      height: 251px;
      border-radius: 8px;
      padding-top: 6px;
      padding-right: 16px;
      padding-bottom: 6px;
      padding-left: 16px;
      gap: 6px;
    }

    .modal-header {
      padding: 24px 24px 12px;
      text-align: center;
    }

    .modal-title {
      width: 460px;
      height: 32px;
      font-family: var(--title-font-family);
      font-size: 32px;
      font-weight: 700;
      line-height: 100%;
      letter-spacing: -0.03em;
      color: var(--modal-text-color);
      margin: 0 auto;
      text-align: center;
      text-transform: capitalize;
    }

    .modal-body {
      padding: 0 24px;
      text-align: left;
    }

    .modal-text {
      font-size: 16px;
      color: var(--modal-secondary-text);
      margin-bottom: 16px;
      line-height: 1.5;
    }

    .modal-footer {
      width: 588px;
      height: 68px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 10px;
      padding-right: 24px;
      padding-bottom: 10px;
      padding-left: 24px;
      border-top: 1px solid var(--border-color);
    }

    .button-container {
      width: 278px;
      height: 34px;
      display: flex;
      gap: 10px;
    }

    .button {
      font-size: 14px;
      font-weight: 500;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .button-red {
      width: 72px;
      height: 34px;
      background-color: var(--button-red-background);
      color: var(--button-text-color);
      padding: 2px 3px;
      gap: 2px;
    }

    .button-blue {
      width: 138px;
      height: 34px;
      background-color: var(--button-blue-background);
      color: var(--button-text-color);
      padding: 2px 3px;
      gap: 2px;
    }

    .button-gray {
      width: 130px;
      height: 34px;
      background-color: var(--button-gray-background);
      color: var(--modal-text-color);
      padding: 2px 3px;
      gap: 2px;
    }

    .hidden {
      display: none;
    }

    @media (max-width: 640px) {
      .modal-container {
        width: 100%;
        max-width: 588px;
        height: auto;
      }

      .modal-upper {
        width: 100%;
        height: auto;
      }

      .modal-title {
        width: 100%;
        font-size: 28px;
      }

      .modal-footer {
        width: 100%;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        height: auto;
        padding-top: 16px;
        padding-bottom: 16px;
      }

      .button-container {
        width: 100%;
        justify-content: space-between;
      }

      .button-red {
        width: 100%;
      }
    }
  `;

  private _handleGoBack() {
    this.dispatchEvent(new CustomEvent('go-back'));
  }

  private _handleManualFill() {
    this.dispatchEvent(new CustomEvent('manual-fill'));
  }

  private _handleAutoFill() {
    this.dispatchEvent(new CustomEvent('auto-fill'));
  }

  render() {
    if (!this.isOpen) {
      return html``;
    }

    return html`
      <div class="modal-overlay">
        <div class="modal-container">
          <div class="modal-content">
            <div class="modal-upper">
              <!-- Modal header -->
              <div class="modal-header">
                <h3 class="modal-title">Auto-Fill Your Song Details?</h3>
              </div>

              <!-- Modal body -->
              <div class="modal-body">
                <p class="modal-text">
                  We'll Use The Artist And Album Name You Entered To Match Your
                  Release With Existing Records.
                </p>

                <p class="modal-text">
                  If We Find A Match, Song Titles, Composers, And More Will Be
                  Filled In Automatically.
                </p>

                <p class="modal-text">You Can Still Edit Everything Later.</p>
              </div>
            </div>

            <!-- Modal footer -->
            <div class="modal-footer">
              <button class="button button-red" @click=${this._handleGoBack}>
                Go back
              </button>

              <div class="button-container">
                <button
                  class="button button-gray"
                  @click=${this._handleManualFill}
                >
                  No I'll do it manually
                </button>

                <button
                  class="button button-blue"
                  @click=${this._handleAutoFill}
                >
                  Yes please Auto-Fill
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
