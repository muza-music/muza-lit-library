import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { AlbumCover } from '../src/components/albumDisplays/AlbumCover';

describe('AlbumCover', () => {
  it('is defined', () => {
    const el = document.createElement('album-cover');
    expect(el).toBeInstanceOf(AlbumCover);
  });

  it('renders with default properties', async () => {
    const el = await fixture<AlbumCover>(html`<album-cover></album-cover>`);

    expect(el.imageSrc).toBe('');
    expect(el.title).toBe('');
    expect(el.subTitle).toBe('');

    const img = el.shadowRoot!.querySelector('img');
    const h3 = el.shadowRoot!.querySelector('h3');
    const p = el.shadowRoot!.querySelector('p');

    expect(img?.getAttribute('src')).toBe('');
    expect(h3?.textContent).toBe('');
    expect(p?.textContent).toBe('');
  });

  it('renders with provided properties', async () => {
    const el = await fixture<AlbumCover>(html`
      <album-cover
        image-src="test.jpg"
        title="Test Album"
        sub-title="Test subTitle"
        artist="Test Artist"
      ></album-cover>
    `);

    expect(el.imageSrc).toBe('test.jpg');
    expect(el.title).toBe('Test Album');
    expect(el.subTitle).toBe('Test subTitle');

    const img = el.shadowRoot!.querySelector('img');
    const h3 = el.shadowRoot!.querySelector('h3');
    const p = el.shadowRoot!.querySelector('p');

    expect(img?.getAttribute('src')).toBe('test.jpg');
    expect(h3?.textContent).toBe('Test Album');
    expect(p?.textContent).toBe('Test subTitle');
  });

  it('dispatches album-selected event on click', async () => {
    const el = await fixture<AlbumCover>(html`
      <album-cover
        image-src="test.jpg"
        title="Test Album"
        sub-title="Test subTitle"
        artist="Test Artist"
      ></album-cover>
    `);

    let eventDetail: unknown;
    el.addEventListener('album-selected', ((e: CustomEvent) => {
      eventDetail = e.detail;
    }) as EventListener);

    const container = el.shadowRoot!.querySelector('div');
    container?.click();

    expect(eventDetail).toEqual({
      title: 'Test Album',
      subTitle: 'Test subTitle',
      artist: 'Test Artist',
      imageSrc: 'test.jpg',
    });
  });
});
