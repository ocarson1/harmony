package server;

import java.util.List;

public class SongID {
  public List<Item> items;

  public static class Item {
    public Track track;
  }

  public static class Track {
    public String id;
  }
//
//  public String getSongID() {
//    return this.items.track.songID;
//  }
  /*

public class TrackObj {
  public String name;
  public String preview_url;
  //public Image images;
  public Album album;

  public static class Album {
    public List<Image> images;
    public String name;
  }

  public static class Image{
    public int height;
    public String url;
    public int width;
  }
   */
}

