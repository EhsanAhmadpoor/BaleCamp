import { TrackModel, Track } from "../models/TrackModel";
import { TrackView } from "../views/TracksView";

export class TrackController {
  private model: TrackModel;
  private view: TrackView;

  constructor() {
    this.model = new TrackModel();
    this.view = new TrackView(this.model);
  }

}