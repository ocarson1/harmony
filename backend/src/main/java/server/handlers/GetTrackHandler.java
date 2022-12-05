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
import server.TrackObj;
import server.TrackObj.Image;
import spark.QueryParamsMap;
import spark.Request;
import spark.Response;
import spark.Route;

public class GetTrackHandler implements Route {

  @Override
  public Object handle(Request request, Response response) throws Exception {
    Map<String, Object> resp = new HashMap<>();
    try {
      QueryParamsMap params = request.queryMap();
      if (!params.hasKey("token") || !params.hasKey("id")) {
        resp.put("result", "error_bad_request");
        return new ServerResponse().serialize(resp);
      } else if (params.get("token").value().equals("")) {
        resp.put("result", "error_no_token");
        return new ServerResponse().serialize(resp);
      }

      String token = params.get("token").value();
      String id = params.get("id").value();
      String url = "https://api.spotify.com/v1/tracks/" + id;

      APIUtility trackURL = new APIUtility(url);

      Moshi moshi = new Moshi.Builder().build();
      JsonAdapter<TrackObj> trackAdapter = moshi.adapter(TrackObj.class);

      String JSONBody = trackURL.getAPIRequest(token);
      TrackObj trackObj = trackAdapter.fromJson(JSONBody);
      //TrackObj trackObj = this.handleTrackReq(token, id);

      String title = trackObj.name;
      String album = trackObj.album.name;
      String preview = trackObj.preview_url;
      List<Image> imgURLs = trackObj.album.images;
      String imgURL = imgURLs.get(0).url;
      List<String> genres = new ArrayList<>();

      resp.put("result", "success");
      resp.put("title", title);
      resp.put("album", album);
      resp.put("preview_url", preview);
      resp.put("genres", genres);
      resp.put("img_url", imgURL);

      return new ServerResponse().serialize(resp);

    } catch (Exception e) {
      System.out.println(e.getMessage());
      e.printStackTrace();
      resp.put("result", "error_bad_token");
      return new ServerResponse().serialize(resp);
    }
  }

  public TrackObj getTrackObj(String JSONBody) throws IOException {
    Moshi moshi = new Moshi.Builder().build();
    JsonAdapter<TrackObj> trackAdapter = moshi.adapter(TrackObj.class);

    return trackAdapter.fromJson(JSONBody);
  }
}
