package server.handlers;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import java.io.IOException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import server.APIUtility;
import server.Firebase;
import server.ServerResponse;
import server.deserializationObjects.RecommendationObj;
import server.deserializationObjects.RecommendationObj.ID;
import spark.QueryParamsMap;
import spark.Request;
import spark.Response;
import spark.Route;

/**
 * Returns a list of recommended songs based on the songs inputted.
 * The "recommended" songs are determined through a sorting algorithm.
 */
public class GetRecommendationHandler implements Route {

  private final Firebase f;

  public GetRecommendationHandler(Firebase f) {
    this.f = f;
  }

  /**
   * Invoked when the getRecs endpoint is called. The request must include a token and list of song IDs.
   * @param request - the request object for the getRecs endpoint with HTTP request information.
   * @param response - the response object that allows response modification.
   * @return the serialized Map of String to Object containing the result.
   * @throws Exception - if an error is encountered in the retrieval process
   */
  @Override
  public Object handle(Request request, Response response) throws Exception {
    Map<String, Object> resp = new HashMap<>();
    try {
      QueryParamsMap params = request.queryMap();
      if (!params.hasKey("token") || !params.hasKey("songIds")) {
        resp.put("result", "error_bad_request");
        return new ServerResponse().serialize(resp);
      }
      String token = params.get("token").value();
      //split individual song ids and store in array
      String[] ids = params.get("songIds").value().split(",");
      Set<String> artists = new HashSet<>();
      Set<String> genres = new HashSet<>();
      //String[] artists = params.get("artistIds").value().split(",");
      //String[] genres = params.get("genres").value().split(",");
      System.out.println("here");
      for (String id: ids) {
        Map<String, Object> songData = this.f.getData("songInfo", id);
        artists.add(String.valueOf(songData.get("artist_id")));
        ArrayList<String> genreList = (ArrayList<String>)songData.get("genres");
        for (String genre: genreList) {
          genreList.set(genreList.indexOf(genre), genre.replace(" ", ""));
        }
        genres.addAll(new HashSet<>(genreList));
      }

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
      System.out.println(url);

      APIUtility recURL = new APIUtility(url);

      Moshi moshi = new Moshi.Builder().build();
      JsonAdapter<RecommendationObj> recAdapter = moshi.adapter(RecommendationObj.class);

      String JSONBody = recURL.getAPIRequest(token);
      RecommendationObj recObj = recAdapter.fromJson(JSONBody);

      List<ID> tracks = recObj.tracks;
      //List<Song>
      //CreatePlaylist createPlaylist = new CreatePlaylist(tracks);
      //System.out.println(createPlaylist.toString());

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
