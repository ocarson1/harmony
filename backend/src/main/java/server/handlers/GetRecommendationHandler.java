package server.handlers;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import java.io.IOException;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import server.APIUtility;
import server.deserializationObjects.RecommendationObj;
import server.ServerResponse;
import server.deserializationObjects.RecommendationObj.ID;
import server.deserializationObjects.TrackObj;
import server.graph.CreatePlaylist;
import spark.QueryParamsMap;
import spark.Request;
import spark.Response;
import spark.Route;

public class GetRecommendationHandler implements Route {

  @Override
  public Object handle(Request request, Response response) throws Exception {
    Map<String, Object> resp = new HashMap<>();
    try {
      QueryParamsMap params = request.queryMap();
      if (!params.hasKey("token") || !params.hasKey("songIds") || !params.hasKey("artistIds") || !params.hasKey("genres")) {
        resp.put("result", "error_bad_request");
        return new ServerResponse().serialize(resp);
      }
      String token = params.get("token").value();
      //split individual song ids and store in array
      String[] ids = params.get("songIds").value().split(",");
      String[] artists = params.get("artistIds").value().split(",");
      String[] genres = params.get("genres").value().split(",");

      System.out.println(Arrays.toString(ids));
//      if (ids.length <= 2) {
//        resp.put("result", "not enough songs");
//        return new ServerResponse().serialize(resp);
//      }

      String url = "https://api.spotify.com/v1/recommendations?limit=4&seed_tracks=";
      for (String id : ids) {
        url += id + ",";
      }
      url = url.substring(0, url.length() - 1);
      url+="&seed_artists=";
      for (String artist : artists) {
        url += artist + ",";
      }
      url = url.substring(0, url.length() - 1);
      url+="&seed_genres=";
      for (String genre : genres) {
        url += genre + ",";
      }
      url = url.substring(0, url.length() - 1);

      APIUtility recURL = new APIUtility(url);

      Moshi moshi = new Moshi.Builder().build();
      JsonAdapter<RecommendationObj> recAdapter = moshi.adapter(RecommendationObj.class);

      String JSONBody = recURL.getAPIRequest(token);
      RecommendationObj recObj = recAdapter.fromJson(JSONBody);

      List<ID> tracks = recObj.tracks;
      CreatePlaylist createPlaylist = new CreatePlaylist(tracks);
      System.out.println(createPlaylist.toString());

      resp.put("result", "success");
      resp.put("id", tracks);
      return new ServerResponse().serialize(resp);

    } catch (Exception e) {
      System.out.println(e.getMessage());
      e.printStackTrace();
      resp.put("result", "error_bad_token");
      return new ServerResponse().serialize(resp);
    }
  }

  public RecommendationObj getRecObj(String JSONBody) throws IOException {
    Moshi moshi = new Moshi.Builder().build();
    JsonAdapter<RecommendationObj> recAdapter = moshi.adapter(RecommendationObj.class);

    return recAdapter.fromJson(JSONBody);
  }

}
