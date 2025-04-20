import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('muza-slider')
export class MuzaSlider extends LitElement {
  static styles = css`
    :host {
      display: flex;
      align-items: center;
    }

    .slider {
      width: 100%;
      height: 24px;
      cursor: pointer;
      position: relative;
    }

    svg {
      width: 100%;
      height: 100%;
    }

    .track {
      stroke: var(--muza-slider-track-color, #ddd);
      stroke-width: 4;
      stroke-linecap: round;
    }

    .fill {
      stroke: var(--muza-slider-fill-color, #666);
      stroke-width: 4;
      stroke-linecap: round;
    }

    .handle {
      fill: var(--muza-slider-fill-color, #666);
      cursor: grab;
    }

    .handle:active {
      cursor: grabbing;
    }
  `;

  @property({ type: Number })
  value = 0;

  @property({ type: Number })
  min = 0;

  @property({ type: Number })
  max = 100;

  private isDragging = false;

  private dispatchValueChange() {
    const event = new CustomEvent('value-change', {
      detail: { value: this.value },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private handleSliderClick(e: MouseEvent) {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const handleRadius = 6;
    const minX = handleRadius;
    const maxX = rect.width - handleRadius;
    const x = Math.max(minX, Math.min(maxX, e.clientX - rect.left));
    const percentage = ((x - minX) / (maxX - minX)) * 100;

    this.value = Math.round(
      this.min + (percentage * (this.max - this.min)) / 100
    );
    this.dispatchValueChange();
  }

  private handleMouseDown = () => {
    this.isDragging = true;
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
  };

  private handleMouseMove = (e: MouseEvent) => {
    if (!this.isDragging) return;
    const slider = this.shadowRoot?.querySelector('.slider');
    if (!slider) return;

    const rect = slider.getBoundingClientRect();
    const handleRadius = 6;
    const minX = handleRadius;
    const maxX = rect.width - handleRadius;
    const x = Math.max(minX, Math.min(maxX, e.clientX - rect.left));
    const percentage = ((x - minX) / (maxX - minX)) * 100;

    this.value = Math.round(
      this.min + (percentage * (this.max - this.min)) / 100
    );
    this.dispatchValueChange();
  };

  private handleMouseUp = () => {
    this.isDragging = false;
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  };

  private mapValueToPosition(value: number): number {
    const normalizedValue = ((value - this.min) / (this.max - this.min)) * 100;
    return 6 + (normalizedValue * 88) / 100;
  }

  render() {
    return html`
      <div class="slider" @click=${this.handleSliderClick}>
        <svg viewBox="0 0 100 24">
          <line class="track" x1="2" y1="12" x2="98" y2="12" />
          <line
            class="fill"
            x1="2"
            y1="12"
            x2="${this.mapValueToPosition(this.value)}"
            y2="12"
          />
          <circle
            class="handle"
            cx="${this.mapValueToPosition(this.value)}"
            cy="12"
            r="6"
            @mousedown=${this.handleMouseDown}
          />
        </svg>
      </div>
    `;
  }
}
