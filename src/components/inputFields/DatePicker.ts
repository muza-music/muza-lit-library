import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../../icons/Date.ts';
@customElement('date-picker')
export class DatePicker extends LitElement {
  static styles = css`
    :host {
      display: block;
      background: #f0f0f0;
      padding: 12px 24px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      font-family: 'Founders Grotesk Semibold', sans-serif;
    }

    .container {
      position: relative; /* Enables absolute positioning inside it */
      width: 559px;
      height: 58px;
    }
    .text {
      position: absolute;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.3px;

      color: #111928;
      top: 0;
    }
    .text_in {
      font-family: 'Founders Grotesk Regular', sans-serif;
      font-size: 14px;
      font-weight: 400;
      letter-spacing: 0.5px;
    }

    .box {
      position: absolute;
      bottom: 0;
      padding-left: 15px;
      left: 0;
      right: 0;
      display: flex;
      gap: 10px;
      align-items: center;
      height: 38px;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      color: #666;
      background: white;
    }
  `;

  render() {
    return html`
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
      />
      <div class="container">
        <div class="text">Recording Date</div>
        <div class="box">
          <icon-date></icon-date>
          <p class="text_in">Select Date</p>
        </div>
      </div>
    `;
  }
}
