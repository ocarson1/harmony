package server.deserializationObjects;

import java.util.List;

public class RecommendationObj {
  public List<ID> tracks;

  public static class ID {
    public String id;
    public Album album;
    public String duration_ms;
  }

  public static class Album {
    public String release_date;
  }
}
