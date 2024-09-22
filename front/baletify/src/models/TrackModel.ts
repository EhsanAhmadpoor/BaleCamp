import { IndexedDB } from '../utils/IndexedDB';

export interface Track {
  id: number,
  track_name: string,
  track_time: string,
  track_url: string,
  track_thumb: string,
  nonce: string,
  composer: string
}

export class TrackModel {
  private tracks: Track[] = [];
  private currentTrack: Track | null = null;
  private observers: Array<() => void> = [];
  private indexedDB: IndexedDB;
  private mediaSource: MediaSource | null = null;
  private sourceBuffer: SourceBuffer | null = null;

  constructor() {
    this.indexedDB = new IndexedDB('TrackDatabase');
    this.loadTracks();
  }

  private async loadTracks() {
    const response = await fetch('src/data/tracks.json');
    const data = await response.json();
    this.tracks = [...data];
    this.notifyObservers();
  }
  public getTracks(): Track[] {
    return this.tracks;
  }
  public getCurrentTrack() {
    return this.currentTrack;
  }
  public async getTrackUrl(track: Track): Promise<string> {
    const cachedBlob = await this.indexedDB.getTrack(track.id);
    if (cachedBlob) {
      return URL.createObjectURL(cachedBlob);
    } else {
      return track.track_url;
    }
  }
  public async streamTrack(track: Track): Promise<MediaSource> {
    this.mediaSource = new MediaSource();
    const url = URL.createObjectURL(this.mediaSource);

    this.mediaSource.addEventListener('sourceopen', async () => {
      this.sourceBuffer = this.mediaSource!.addSourceBuffer('audio/mpeg');
      const response = await fetch(track.track_url);
      const reader = response.body!.getReader();

      const pump = async () => {
        const { done, value } = await reader.read();
        if (done) {
          this.mediaSource!.endOfStream();
          return;
        }
        this.sourceBuffer!.appendBuffer(value);
        await new Promise((resolve) => {
          this.sourceBuffer!.addEventListener('updateend', resolve, { once: true });
        });
        pump();
      };

      pump();
    });

    return this.mediaSource;
  }
  public setCurrentTrack(track: Track) {
    this.currentTrack = track;
    this.notifyObservers();
  }
  public addObserver(observer: () => void) {
    this.observers.push(observer);
  }
  public notifyObservers() {
    this.observers.forEach((observer) => {
      observer();
    });
  }
}