package server.deserializationObjects;

import java.util.List;

public class SongID {
  public List<Item> items;

  public static class Item {
    public Track track;
  }

  public static class Track {
    public String id;
  }
}

