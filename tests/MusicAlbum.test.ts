import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { AlbumCover } from '../src/components/albumDisplays/AlbumCover';
import { AlbumArtist } from '../src/components/albumDisplays/AlbumArtist';

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
    const p = el.shadowRoot!.querySelector('p');

    expect(img?.getAttribute('src')).toBe('');
    expect(p?.textContent).toBe('');
  });

  it('renders with provided properties', async () => {
    const el = await fixture<AlbumCover>(html`
      <album-cover
        image-src="test.jpg"
        title="Test Album"
        sub-title="Test Artist"
      ></album-cover>
    `);

    expect(el.imageSrc).toBe('test.jpg');
    expect(el.title).toBe('Test Album');
    expect(el.subTitle).toBe('Test Artist');

    const img = el.shadowRoot!.querySelector('img');
    const h3 = el.shadowRoot!.querySelector('h3');
    const p = el.shadowRoot!.querySelector('p');

    expect(img?.getAttribute('src')).toBe('test.jpg');
    expect(h3?.textContent).toBe('Test Album');
    expect(p?.textContent).toBe('Test Artist');
  });

  it('dispatches album-selected event on click', async () => {
    const el = await fixture<AlbumCover>(html`
      <album-cover
        image-src="test.jpg"
        title="Test Album"
        sub-title="Test Artist"
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
      subTitle: 'Test Artist',
      imageSrc: 'test.jpg',
    });
  });
});
describe('AlbumArtist', () => {
  it('is defined', () => {
    const el = document.createElement('album-artist');
    expect(el).toBeInstanceOf(AlbumArtist);
  });

  it('renders with default properties', async () => {
    const el = await fixture<AlbumArtist>(html`<album-artist></album-artist>`);
    expect(el.imageSrc).toBe('');
    expect(el.artistName).toBe('');
    expect(el.albumsCount).toBe('');
    const img = el.shadowRoot!.querySelector('img');
    const p = el.shadowRoot!.querySelector('p');

    expect(img?.getAttribute('src')).toBe('');
    expect(p?.textContent).toBe(' Albums');
  });

  it('renders with provided properties', async () => {
    const el = await fixture<AlbumArtist>(html`
      <album-artist
        image-src="test.jpg"
        artist-name="Test Name"
        albums-count="3"
      ></album-artist>
    `);

    expect(el.imageSrc).toBe('test.jpg');
    expect(el.artistName).toBe('Test Name');
    expect(el.albumsCount).toBe('3');

    const img = el.shadowRoot!.querySelector('img');
    const h3 = el.shadowRoot!.querySelector('h3');
    const p = el.shadowRoot!.querySelector('p');

    expect(img?.getAttribute('src')).toBe('test.jpg');
    expect(h3?.textContent).toBe('Test Name');
    expect(p?.textContent).toBe('3 Albums');
  });

  it('dispatches album-selected event on click', async () => {
    const el = await fixture<AlbumArtist>(html`
      <album-artist
        image-src="test.jpg"
        artist-name="Test Name"
        Albums-count="3"
      ></album-artist>
    `);

    let eventDetail: unknown;
    el.addEventListener('album-selected', ((e: CustomEvent) => {
      eventDetail = e.detail;
    }) as EventListener);

    const container = el.shadowRoot!.querySelector('div');
    container?.click();

    expect(eventDetail).toEqual({
      artistName: 'Test Name',
      albumsCount: '3',
      imageSrc: 'test.jpg',
    });
  });
});
