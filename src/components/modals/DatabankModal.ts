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
      width: 100%;
      max-width: 40rem;
      padding: 1rem;
    }

    .modal-content {
      background-color: var(--modal-background);
      border-radius: 0.75rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      overflow: hidden;
    }

    .modal-header {
      padding: 1.5rem 1.5rem 1rem;
    }

    .modal-title {
      font-size: 2.25rem;
      font-weight: 700;
      color: var(--modal-text-color);
      margin: 0;
      text-align: center;
    }

    .modal-body {
      padding: 0 1.5rem;
      text-align: left;
    }

    .modal-text {
      font-size: 1.125rem;
      color: var(--modal-secondary-text);
      margin-bottom: 1.5rem;
      line-height: 1.5;
      padding-left: 2rem;
      padding-right: 2rem;
    }

    .modal-footer {
      display: flex;
      justify-content: space-between;
      padding: 1.5rem;
      border-top: 1px solid var(--border-color);
      margin-top: 1rem;
    }

    .button-container {
      display: flex;
      gap: 0.75rem;
    }

    .button {
      font-size: 1rem;
      font-weight: 500;
      padding: 0.75rem 1.5rem;
      border-radius: 0.375rem;
      border: none;
      cursor: pointer;
      transition: background-color 0.2s;
      white-space: nowrap;
    }

    .button-red {
      background-color: var(--button-red-background);
      color: var(--button-text-color);
    }

    .button-blue {
      background-color: var(--button-blue-background);
      color: var(--button-text-color);
    }

    .button-gray {
      background-color: var(--button-gray-background);
      color: var(--modal-text-color);
    }

    .hidden {
      display: none;
    }
    
    @media (max-width: 640px) {
      .modal-title {
        font-size: 1.75rem;
      }
      
      .modal-footer {
        flex-direction: column;
        gap: 1rem;
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
            <!-- Modal header -->
            <div class="modal-header">
              <h3 class="modal-title">Auto-Fill Your Song Details?</h3>
            </div>
            
            <!-- Modal body -->
            <div class="modal-body">
              <p class="modal-text">
                We'll Use The Artist And Album Name You Entered To Match 
                Your Release With Existing Records.
              </p>
              
              <p class="modal-text">
                If We Find A Match, Song Titles, Composers, And More Will Be 
                Filled In Automatically.
              </p>
              
              <p class="modal-text">
                You Can Still Edit Everything Later.
              </p>
            </div>
            
            <!-- Modal footer -->
            <div class="modal-footer">
              <button
                class="button button-red"
                @click=${this._handleGoBack}
              >
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