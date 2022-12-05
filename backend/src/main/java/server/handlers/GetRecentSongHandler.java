package server.handlers;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import server.APIUtility;
import server.ServerResponse;
import server.Song;
import server.SongID;
import server.SongID.Item;
import server.TrackObj;
import server.TrackObj.Image;
import spark.QueryParamsMap;
import spark.Request;
import spark.Response;
import spark.Route;

public class GetRecentSongHandler implements Route {

  @Override
  public Object handle(Request request, Response response) throws Exception {
    Map<String, Object> resp = new HashMap<>();
    try {
      QueryParamsMap params = request.queryMap();
      if (!params.hasKey("token")) {
        resp.put("result", "error_bad_request");
        return new ServerResponse().serialize(resp);
      } else if (params.get("token").value().equals("")) {
        resp.put("result", "error_no_token");
        return new ServerResponse().serialize(resp);
      }
      String token = params.get("token").value();
      String url = "https://api.spotify.com/v1/me/player/recently-played?limit=1";

      APIUtility idURL = new APIUtility(url);

      Moshi moshi = new Moshi.Builder().build();
      JsonAdapter<SongID> trackAdapter = moshi.adapter(SongID.class);

      String JSONBody = idURL.getAPIRequest(token);
      SongID idObj = trackAdapter.fromJson(JSONBody);

      List<Item> items = idObj.items;
      String id = items.get(0).track.id;

//      String title = trackObj.name;
//      String album = trackObj.album.name;
//      String preview = trackObj.preview_url;
//      List<Image> imgURLs = trackObj.album.images;
//      String imgURL = imgURLs.get(0).url;
//      List<String> genres = new ArrayList<>();

//      resp.put("result", "success");
//      resp.put("title", title);
//      resp.put("album", album);
//      resp.put("preview_url", preview);
//      resp.put("genres", genres);
//      resp.put("img_url", imgURL);

//      APIUtility songUrl = new APIUtility(url);
//
//      String id =
      resp.put("result", "success");
      resp.put("id", id);
      return new ServerResponse().serialize(resp);

    } catch (Exception e) {
      System.out.println(e.getMessage());
      e.printStackTrace();
      resp.put("result", "error_bad_token");
      return new ServerResponse().serialize(resp);
    }
  }
  public SongID getIDObj(String JSONBody) throws IOException {
    Moshi moshi = new Moshi.Builder().build();
    JsonAdapter<SongID> trackAdapter = moshi.adapter(SongID.class);

    return trackAdapter.fromJson(JSONBody);
  }
}
