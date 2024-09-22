import { Track } from "../models/TrackModel";

export class IndexedDB {
  private dbName: string;
  private dbVersion: number;
  private db: IDBDatabase | null = null;

  constructor(dbName: string, dbVersion: number = 1) {
    this.dbName = dbName;
    this.dbVersion = dbVersion;
  }

  public async open(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onupgradeneeded = (event) => {
        const db = request.result;
        if (!db.objectStoreNames.contains('tracks')) {
          db.createObjectStore('tracks', { keyPath: 'id' });
        }
      };

      request.onsuccess = (event) => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onerror = (event) => {
        reject(`Error opening IndexedDB: ${request.error}`);
      };
    });
  }

  public async addTrack(track: Track, blob: Blob): Promise<void> {
    if (!this.db) {
      await this.open();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction('tracks', 'readwrite');
      const store = transaction.objectStore('tracks');
      const request = store.put({ ...track, blob });

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(`Error adding track: ${request.error}`);
      };
    });
  }

  public async getTrack(id: number): Promise<Blob | null> {
    if (!this.db) {
      await this.open();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction('tracks', 'readonly');
      const store = transaction.objectStore('tracks');
      const request = store.get(id);

      request.onsuccess = () => {
        resolve(request.result ? request.result.blob : null);
      };

      request.onerror = () => {
        reject(`Error getting track: ${request.error}`);
      };
    });
  }
}
