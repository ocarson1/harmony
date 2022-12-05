package server.handlers;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import server.APIUtility;
import server.ServerResponse;
import server.SongID;
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

      APIUtility songUrl = new APIUtility(url);

      String id = songIDFromJSON(songUrl.getAPIRequest(token)).getSongID();
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

  public static SongID songIDFromJSON(String json) throws IOException {
    Moshi moshi = new Moshi.Builder().build();

    JsonAdapter<SongID> songIDJsonAdapter = moshi.adapter(SongID.class);
    return songIDJsonAdapter.fromJson(json);
  }
}
