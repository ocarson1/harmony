package server.handlers;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import server.APIUtility;
import server.Firebase;
import server.ServerResponse;
import server.deserializationObjects.GenreObj;
import server.deserializationObjects.TrackObj;
import server.deserializationObjects.TrackObj.Image;
import spark.QueryParamsMap;
import spark.Request;
import spark.Response;
import spark.Route;

/**
 *
 */
public class GetTrackHandler implements Route {

  private final Firebase f;
  public GetTrackHandler(Firebase f) {
    this.f = f;
  }

  /**
   *
   * @param request
   * @param response
   * @return
   * @throws Exception
   */
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
      String urlTrack = "https://api.spotify.com/v1/tracks/" + id;

      APIUtility trackURL = new APIUtility(urlTrack);

      Moshi moshi = new Moshi.Builder().build();
      JsonAdapter<TrackObj> trackAdapter = moshi.adapter(TrackObj.class);

      String JSONBody = trackURL.getAPIRequest(token);
      TrackObj trackObj = trackAdapter.fromJson(JSONBody);

      String title = trackObj.name;
      String album = trackObj.album.name;
      String artistId = trackObj.artists.get(0).id;
      String preview = trackObj.preview_url;
      String releaseYear = trackObj.album.release_date.substring(0, 4);
      List<Image> imgURLs = trackObj.album.images;

      String imgURL = imgURLs.get(0).url;

      resp.put("title", title);
      resp.put("id", id);
      resp.put("album", album);
      resp.put("artist_id", artistId);
      resp.put("preview_url", preview);
      resp.put("img_url", imgURL);
      resp.put("release_date", releaseYear);

      String urlArtist = "https://api.spotify.com/v1/artists/" + artistId;
      APIUtility artistURL = new APIUtility(urlArtist);
      Moshi moshi2 = new Moshi.Builder().build();
      JsonAdapter<GenreObj> genreAdapter = moshi2.adapter(GenreObj.class);
      String JSONBodyGenre = artistURL.getAPIRequest(token);
      GenreObj genreObj = genreAdapter.fromJson(JSONBodyGenre);

      List<String> genres = genreObj.genres;
      resp.put("genres", genres);

      this.addSongMetadata(id, resp);

      resp.put("result", "success");

      return new ServerResponse().serialize(resp);

    } catch (Exception e) {
      System.out.println(e.getMessage());
      resp.put("result", "error_bad_token");
      return new ServerResponse().serialize(resp);
    }
  }

  /**
   * Helper method to add a song's metadata to the SongInfo collection.
   * @param songID
   * @param resp
   */
  private void addSongMetadata(String songID, Map<String, Object> resp) {
    this.f.addSongInfo(songID, resp);
  }

  /**
   *
   * @param JSONBody
   * @return
   * @throws IOException
   */
  public TrackObj getTrackObj(String JSONBody) throws IOException {
    Moshi moshi = new Moshi.Builder().build();
    JsonAdapter<TrackObj> trackAdapter = moshi.adapter(TrackObj.class);

    return trackAdapter.fromJson(JSONBody);
  }

  /**
   *
   * @param JSONBody
   * @return
   * @throws IOException
   */
  public GenreObj getGenreObj (String JSONBody) throws IOException {
    Moshi moshi = new Moshi.Builder().build();
    JsonAdapter<GenreObj> genreAdapter = moshi.adapter(GenreObj.class);

    return genreAdapter.fromJson(JSONBody);
  }
}
