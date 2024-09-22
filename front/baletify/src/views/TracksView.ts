import { Track, TrackModel } from '../models/TrackModel'

export class TrackView {
  private model: TrackModel;
  private tracksContainer: HTMLDivElement;
  private playingDiv: HTMLDivElement;
  private notPlayingDiv: HTMLDivElement;
  private playingCover: HTMLImageElement;
  private playingTitle: HTMLSpanElement;
  private playingArtist: HTMLSpanElement;
  private audioElement: HTMLAudioElement;
  private progressBar: HTMLInputElement;
  private passedTime: HTMLElement;
  private remainedTime: HTMLElement;
  private playPauseButton: HTMLImageElement;
  private previousButton: HTMLImageElement;
  private nextButton: HTMLImageElement;
  private repeatButton: HTMLImageElement;
  private isRepeating: boolean = true;
  private isShuffling: boolean = false;
  private shuffledTracks: Track[] = [];
  private shuffleButton: HTMLImageElement;

  constructor(model: TrackModel) {
    this.model = model;
    this.tracksContainer = document.querySelector('.track-list') as HTMLDivElement;
    this.playingDiv = document.querySelector('.playing-div') as HTMLDivElement;
    this.notPlayingDiv = document.querySelector('.not-playing-div') as HTMLDivElement;
    this.playingCover = document.getElementById('playing-cover') as HTMLImageElement;
    this.playingTitle = document.getElementById('playing-title') as HTMLSpanElement;
    this.playingArtist = document.getElementById('playing-artist') as HTMLSpanElement;
    this.audioElement = document.getElementById('audio-element') as HTMLAudioElement;
    this.progressBar = document.getElementById('progress-bar') as HTMLInputElement;
    this.passedTime = document.querySelector('.passed') as HTMLElement;
    this.remainedTime = document.querySelector('.remained') as HTMLElement;
    this.playPauseButton = document.getElementById('play-pause-button') as HTMLImageElement;
    this.previousButton = document.getElementById('previous-button') as HTMLImageElement;
    this.nextButton = document.getElementById('next-button') as HTMLImageElement;
    this.repeatButton = document.getElementById('repeat-button') as HTMLImageElement;
    this.shuffleButton = document.getElementById('shuffle-button') as HTMLImageElement;

    this.model.addObserver(() => this.render());
    this.addEventListeners();
    this.render();
  }


  private async handleTrackClick(track: Track) {
    this.model.setCurrentTrack(track);
    const mediaSource = await this.model.streamTrack(track);
    this.audioElement.src = URL.createObjectURL(mediaSource);
    this.audioElement.play();
    this.updatePlayPauseIcon();
  }

  private addEventListeners() {
    this.audioElement.addEventListener('timeupdate', () => {
      const currentTime = this.audioElement.currentTime;
      const duration = this.audioElement.duration;
      this.progressBar.value = (currentTime / duration * 100).toString();
      this.passedTime.textContent = this.formatTime(currentTime);
      this.remainedTime.textContent = '-' + this.formatTime(duration - currentTime);
    });

    this.progressBar.addEventListener('input', () => {
      const duration = this.audioElement.duration;
      const newTime = (this.progressBar.valueAsNumber / 100) * duration;
      this.audioElement.currentTime = newTime;
    });

    this.playPauseButton.addEventListener('click', () => {
      if (this.audioElement.paused) {
        this.audioElement.play();
      } else {
        this.audioElement.pause();
      }
      this.updatePlayPauseIcon();
    })

    this.previousButton.addEventListener('click', () => {
      this.playPreviousTrack();
    });

    this.nextButton.addEventListener('click', () => {
      this.playNextTrack();
    });

    this.repeatButton.addEventListener('click', () => {
      this.toggleRepeat();
    });

    this.shuffleButton.addEventListener('click', () => {
      this.toggleShuffle();
    });

    this.audioElement.addEventListener('ended', () => {
      if (this.isRepeating) {
        this.audioElement.currentTime = 0;
        this.audioElement.play();
      } else {
        this.playNextTrack();
      }
    });
  }

  private formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }

  private updatePlayPauseIcon() {
    if (this.audioElement.paused) {
      this.playPauseButton.src = "src/assets/images/play.svg"
    } else {
      this.playPauseButton.src = "src/assets/images/pause.png"
    }
  }

  private toggleRepeat() {
    this.isRepeating = !this.isRepeating;
    this.repeatButton.src = this.isRepeating ? 'src/assets/images/Repeat.svg' : 'src/assets/images/no-repeat.svg';
  }

  private toggleShuffle() {
    this.isShuffling = !this.isShuffling;
    this.shuffleButton.src = this.isShuffling ? 'src/assets/images/shuffle.svg' : 'src/assets/images/no-shuffle.png';
    if (this.isShuffling) {
      this.shuffledTracks = this.shuffleArray([...this.model.getTracks()]);
    } else {
      this.shuffledTracks = [];
    }
  }
  private shuffleArray(array: Track[]): Track[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  private playPreviousTrack() {
    const currentTrack = this.model.getCurrentTrack();
    if (!currentTrack) return;

    let previousTrack: Track;

    if (this.isShuffling) {
      const currentTrackIndex = this.shuffledTracks.indexOf(currentTrack);
      const previousTrackIndex = (currentTrackIndex - 1 + this.shuffledTracks.length) % this.shuffledTracks.length;
      previousTrack = this.shuffledTracks[previousTrackIndex];
    } else {
      const currentTrackIndex = this.model.getTracks().indexOf(currentTrack);
      const previousTrackIndex = (currentTrackIndex - 1 + this.model.getTracks().length) % this.model.getTracks().length;
      previousTrack = this.model.getTracks()[previousTrackIndex];
    }

    this.handleTrackClick(previousTrack);
  }

  private playNextTrack() {
    const currentTrack = this.model.getCurrentTrack();
    if (!currentTrack) return;

    let nextTrack: Track;

    if (this.isShuffling) {
      const currentTrackIndex = this.shuffledTracks.indexOf(currentTrack);
      const nextTrackIndex = (currentTrackIndex + 1) % this.shuffledTracks.length;
      nextTrack = this.shuffledTracks[nextTrackIndex];
    } else {
      const currentTrackIndex = this.model.getTracks().indexOf(currentTrack);
      const nextTrackIndex = (currentTrackIndex + 1) % this.model.getTracks().length;
      nextTrack = this.model.getTracks()[nextTrackIndex];
    }

    this.handleTrackClick(nextTrack);

  }

  private render() {
    const tracks = this.model.getTracks();
    const currentTrack = this.model.getCurrentTrack();

    if (currentTrack) {
      this.playingDiv.style.display = 'flex';
      this.notPlayingDiv.style.display = 'none';
      this.playingCover.src = currentTrack.track_thumb;
      this.playingTitle.textContent = currentTrack.track_name;
      this.playingArtist.textContent = currentTrack.composer;
      this.tracksContainer.style.marginTop = '18px';
    } else {
      this.playingDiv.style.display = 'none';
      this.notPlayingDiv.style.display = 'flex';
      this.tracksContainer.style.marginTop = '57px';
    }

    this.tracksContainer.innerHTML = ''
    tracks.forEach((track) => {
      const trackElement = document.createElement('div');
      trackElement.className = 'track';
      trackElement.innerHTML = `
        <div class="track-info">
          <img class="track-cover" src="${track.track_thumb}" alt="${track.track_name}" />
          <div class="track-title-artist">
            <div class="track-title">${track.track_name}</div>
            <div class="track-artist">${track.composer}</div>
          </div>
        </div>
        <div class="track-duration">${track.track_time}</div>
      `;
      trackElement.addEventListener('click', () => {
        this.handleTrackClick(track);
      })
      this.tracksContainer.appendChild(trackElement);
    })

  }
}