package server.deserializationObjects;

import java.util.List;

public class UserObj {

  public String display_name;
  public List<Image> images;

  public static class Image {
    public String url;
  }
}
