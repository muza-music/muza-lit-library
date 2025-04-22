import { LitElement, css, svg } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('icon-left-arrow')
export class IconLeftArrow extends LitElement {
  static styles = css`
    :host {
      text-align: center;
      display: block;
    }
  `;

  render() {
    return svg`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7"/>
      </svg>
    `;
  }
}
