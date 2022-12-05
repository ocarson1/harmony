package server;

public class SongID {

  private Item items;

  static class Item {
    private Track track;
  }

  static class Track {
    private String songID;
  }

  public String getSongID() {
    return this.items.track.songID;
  }
}

