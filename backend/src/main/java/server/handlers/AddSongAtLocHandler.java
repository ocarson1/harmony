package server.handlers;


import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
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
 * Adds a song at a specified location (lat and lon).
 */
public class AddSongAtLocHandler implements Route {

  private Firebase f;

  /**
   * The AddSongAtLocHandler constructor initializes the Firebase instance variable.
   * @param f
   */
  public AddSongAtLocHandler(Firebase f) {
    this.f = f;
  }

  /**
   * Invoked when the addSongAtLoc endpoint is called. The request must include the song id,
   * the latitude, and the longitude.
   * @param request - the request object for the endpoint with HTTP request information.
   * @param response - the response object that allows response modification.
   * @return - serialized Map to String
   * @throws Exception - if an error is encountered in the retrieval process
   * Example query: localhost:3232/addSongAtLoc
   * TODO: ADD SONG USING TOKEN
   */
  @Override
  public Object handle(Request request, Response response) throws Exception {
//    Map<String, Object> geoMap = new HashMap<>();
//    Map<String, Object> innerGeometryMap = new HashMap<>();
//    Map<String, Object> propertiesMap = new HashMap<>();
//    Map<String, Object> resp = new HashMap<>();
    Map<String, Object> resp = new HashMap<>();
    try {
      QueryParamsMap params = request.queryMap();
      if (!params.hasKey("token") || !params.hasKey("id") || !params.hasKey("lat") || !params.hasKey("lon")) {
        resp.put("result", "error_bad_request");
        return new ServerResponse().serialize(resp);
      } else if (params.get("id").value().equals("") || params.get("lat").value().equals("")
          || params.get("lon").value().equals("") || params.get("token").value().equals("")) {
        resp.put("result", "error_no_token");
        return new ServerResponse().serialize(resp);
      }
      String id = params.get("id").value();
      String token = params.get("token").value();
      double lat = Double.parseDouble(params.get("lat").value());
      double lon = Double.parseDouble(params.get("lon").value());

      HashMap<String, Object> dataMap = new HashMap<>();

      //store the token
      dataMap.put("token", token);

      dataMap.put("id", id);

      //store track metadata
      Map<String, Object> trackMetadata = this.getTrackMetadata(id, token);
      dataMap.put("track_data", trackMetadata);

      //store user location
      Map<String, Object> loc = this.getSongLocGJSON(id, lat, lon);
      dataMap.put("userGeoJSON", loc);

      resp.put("data", dataMap);
      resp.put("result", "success");

      this.f.addSong(token, resp);
      return new ServerResponse().serialize(resp);
    } catch (Exception e) {
      System.out.println(e.getMessage());
      resp.put("result", "error_bad_request");
      return new ServerResponse().serialize(resp);
    }
  }

  /**
   * Helper method to add the song's location to a GeoJSON formatted map.
   * @param id - song ID
   * @param lat - latitude
   * @param lon - longitude
   * @return - Map of String to Object
   */
  private Map<String, Object> getSongLocGJSON(String id, double lat, double lon) {
    Map<String, Object> geoMap = new HashMap<>();
    Map<String, Object> innerGeometryMap = new HashMap<>();
    Map<String, Object> propertiesMap = new HashMap<>();

    geoMap.put("type", "Feature");
    innerGeometryMap.put("type", "Point");
    List<Double> coords = new ArrayList<>();
    coords.add(lat);
    coords.add(lon);
    innerGeometryMap.put("coordinates", coords);
    geoMap.put("geometry", innerGeometryMap);
    propertiesMap.put("name", id);
    geoMap.put("properties", propertiesMap);

    return geoMap;
  }

  /**
   * Helper method to get the track's metadata.
   * @param id - song id
   * @param token - access token
   * @return - Map of String to Object containing track metadata
   * @throws URISyntaxException - if URI is incorrectly formed
   * @throws IOException - if file cannot be found
   * @throws InterruptedException - if processing is interrupted
   */
  private Map<String, Object> getTrackMetadata(String id, String token)
      throws URISyntaxException, IOException, InterruptedException {
    Map<String, Object> resp = new HashMap<>();
    String urlTrack = "https://api.spotify.com/v1/tracks/" + id;

    APIUtility trackURL = new APIUtility(urlTrack);

    Moshi moshi = new Moshi.Builder().build();
    JsonAdapter<TrackObj> trackAdapter = moshi.adapter(TrackObj.class);

    String JSONBody = trackURL.getAPIRequest(token);
    TrackObj trackObj = trackAdapter.fromJson(JSONBody);

    String title = trackObj.name;
    String album = trackObj.album.name;
    String artistId = trackObj.artists.get(0).id;
    String artistName = trackObj.artists.get(0).name;
    String preview = trackObj.preview_url;
    String releaseYear = trackObj.album.release_date.substring(0, 4);
    List<Image> imgURLs = trackObj.album.images;
    String imgURL = imgURLs.get(0).url;

    resp.put("title", title);
    resp.put("album", album);
    resp.put("preview_url", preview);
    resp.put("artist", artistName);
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
    System.out.println(resp);
    this.addSongMetadata(id, resp);
    return resp;
  }

  /**
   * Helper method to add a song's metadata to the SongInfo collection.
   * @param songID
   * @param resp
   */
  private void addSongMetadata(String songID, Map<String, Object> resp) {
    this.f.addSongInfo(songID, resp);
  }
}
