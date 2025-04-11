import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

@customElement('album-artist')
export class AlbumArtist extends LitElement {
  static styles = css`
    :host {
      --primary-text-color: var(--muza-primary-text-color, #333333);
      --secondary-text-color: var(--muza-secondary-text-color, #5f5f5f);
      --tertiary-text-color: var(--muza-tertiary-text-color, #aaa);
      --border-radius-sm: var(--muza-border-radius-sm, 4px);
      --border-radius-md: var(--muza-border-radius-md, 8px);
      --box-shadow: var(--muza-box-shadow, 0 2px 4px rgba(0, 0, 0, 0.1));
      --spacing-xs: var(--muza-spacing-xs, 4px);
      --spacing-sm: var(--muza-spacing-sm, 8px);
      --spacing-md: var(--muza-spacing-md, 12px);
      --spacing-xl: var(--muza-spacing-xl, 24px);
      --primary-font-size: var(--muza-primary-font-size, 14px);
      --secondary-font-size: var(--muza-secondary-font-size, 12px);
      --font-weight-normal: var(--muza-font-weight-normal, 400);
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: left;
      padding: var(--spacing-md) var(--spacing-xl) var(--spacing-md) 0;
      border-radius: var(--border-radius-md);
    }

    .image-container {
      position: relative;
      width: 170px;
      height: 170px;
      margin-bottom: var(--spacing-sm);
      cursor: pointer;
    }

    img {
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius-md);
      border-radius: 100%;
      margin-bottom: 0;
      box-shadow: var(--box-shadow);
    }

    h3 {
      font-size: var(--primary-font-size);
      color: var(--primary-text-color);
      font-weight: var(--font-weight-normal);
      margin: 0 0 calc(var(--spacing-xs) * 0.75) 0;
      cursor: pointer;
      display: flex;
    }

    p {
      font-size: var(--secondary-font-size);
      color: var(--tertiary-text-color);
      font-weight: var(--font-weight-normal);
      margin: 0;
      cursor: pointer;
    }
    icon-playlist {
      margin-right: 4px;
      width: 17px;
    }
  `;

  @property({ type: String, attribute: 'image-src' })
  imageSrc = '';

  @property({ type: String, attribute: 'artist-name' })
  artistName = '';

  @property({ type: String, attribute: 'albums-count' })
  albumsCount = '';

  private handleTrackClick() {
    const event = new CustomEvent('album-selected', {
      detail: {
        artistName: this.artistName,
        albumsCount: this.albumsCount,
        imageSrc: this.imageSrc,
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  render() {
    return html`
      <div @click=${this.handleTrackClick}>
        <div class="image-container">
          <img src=${this.imageSrc} alt=${this.artistName} />
          </div>
        </div>
        <h3>${unsafeHTML(this.artistName)}</h3>
        <p>${this.albumsCount} Albums</p>
      </div>
    `;
  }
}
