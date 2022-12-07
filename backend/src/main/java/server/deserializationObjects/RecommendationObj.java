package server.deserializationObjects;

import java.util.List;

public class RecommendationObj {
  public List<ID> tracks;

  public static class ID {
    public String id;
  }
}
