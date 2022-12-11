package server.deserializationObjects;

import java.util.List;

/**
 * Class used for deserialization of song ids.
 */
public class SongID {
  public List<Item> items;

  public static class Item {
    public Track track;
  }

  public static class Track {
    public String id;
  }
}

