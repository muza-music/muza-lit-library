import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '../../controls/VolumeControl';

@customElement('page-header')
export class Header extends LitElement {
  static styles = css`
    :host {
      display: block;
      background: white;
      padding: 12px 24px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .topbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .search-container {
      position: relative;
      left: 20px;
      width: 480px;
    }

    .search-container i {
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      color: #9ca3af;
    }
    @font-face {
      font-family: 'Founders Grotesk';
      src: url('FoundersGrotesk-Semibold.ttf') format('truetype');
      font-weight: 600;
      font-style: normal;
    }

    input {
      width: 100%;
      padding: 8px 8px 8px 37px;
      border: 1px solid #e5e7eb;
      border-radius: 50px;
      height: 20px;

      font-size: 16px;
      font-family: 'Founders Grotesk', sans-serif;
      outline: none;
      background-color: #f9fafb;
      color: black;
    }

    input::placeholder {
      color: #9ca3af; /* Placeholder color (gray) */
      font-size: 16px;
      font-family: 'Founders Grotesk', sans-serif;
      font-weight: 400;
      opacity: 1; /* Ensures consistent opacity across browsers */
    }

    input:focus {
      border-color: #999;
    }

    .upload {
      display: flex;
      align-items: center;
      height: 20px;
      margin-right: 12px;
      color: #374151;
      font-size: 14px;
      width: 125px;
      gap: 10px;
      justify-content: flex-end; /* pushes all content to the right */
    }

    .user-menu {
      position: relative;
    }
    .upload-container {
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .user-icon {
      cursor: pointer;
      padding: 8px;
      border-radius: 50%;
      color: #666;
    }
    .avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #ccc; /* optional fallback */
    }

    .avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .user-icon:hover {
      background: #e0e0e0;
    }
    .p {
      font-size: 14px;
      font-weight: 400;
      color: #374151;
      color: red;
      background-color: #f9fafb;
    }
  `;

  private userIconClick() {
    const event = new CustomEvent('user-icon-click', {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private async fetchSidebarData() {
    const sidebarResponse = await fetch('data/sidebar.json');
    console.log(sidebarResponse);
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchSidebarData();
  }

  private handleSearch(e: Event) {
    const searchText = (e.target as HTMLInputElement).value;
    const event = new CustomEvent('search-change', {
      detail: { searchText },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  @property({ type: String, attribute: 'image-src' })
  imageSrc = '';

  render() {
    return html`
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
      />
      <div class="topbar">
        <div class="search-container">
          <i class="fa-solid fa-search"></i>
          <input
            type="text"
            placeholder="Search for Artists, Albums or Songs"
            @input=${this.handleSearch}
          />
        </div>
        <div class="upload-container">
          <div class="upload">
            <p>Upload Album</p>
            <div class="icon-upload" @click=${this.userIconClick}>
              <icon-upload></icon-upload>
            </div>
          </div>
          <div class="avatar">
            <img src=${this.imageSrc} alt="avatar" />
          </div>
        </div>
      </div>
    `;
  }
}
