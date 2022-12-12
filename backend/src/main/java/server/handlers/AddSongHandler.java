package server.handlers;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import server.APIUtility;
import server.Firebase;
import server.ServerResponse;
import server.deserializationObjects.GenreObj;
import server.deserializationObjects.SongID;
import server.deserializationObjects.SongID.Item;
import server.deserializationObjects.TrackObj;
import server.deserializationObjects.TrackObj.Image;
import spark.QueryParamsMap;
import spark.Request;
import spark.Response;
import spark.Route;

public class AddSongHandler implements Route {

  private Firebase f;

  public AddSongHandler(Firebase f) {
    this.f = f;
  }

  /**
   *
   * @param request
   * @param response
   * @return
   * Example query: http://localhost:3232/add?token=[]&lat=[]&lon=[]
   */
  @Override
  public Object handle(Request request, Response response) {
    Map<String, Object> resp = new HashMap<>();
    QueryParamsMap params = request.queryMap();
      if (!params.hasKey("token")) {
        resp.put("result", "error_token_param");
      } else if(!params.hasKey("lat") || !params.hasKey("lon")) {
        resp.put("result", "error_lat_lon_params");
      } else if (params.get("token").value().equals("") || params.get("lat").value().equals("")
          || params.get("lon").value().equals("")) {
        resp.put("result", "error_invalid_params");
      } else {
        try {
          String token = params.get("token").value();
          resp.put("result", "success");

          double lat = Double.parseDouble(params.get("lat").value());
          double lon = Double.parseDouble(params.get("lon").value());

          HashMap<String, Object> dataMap = new HashMap<>();

          //store the token
          dataMap.put("token", token);

          //store id of track
          String id = this.getMostRecentSong(params.get("token").value());
          dataMap.put("id", id);

          //store track metadata
          Map<String, Object> trackMetadata = this.getTrackMetadata(id, token);
          dataMap.put("track-data", trackMetadata);

          //store user location
          Map<String, Object> loc = this.getSongLocGJSON(id, lat, lon);
          dataMap.put("userGeoJSON", loc);

          resp.put("data", dataMap);

          this.f.addSong(token, resp);

        } catch (Exception e) {
          e.printStackTrace();
          resp.put("result", "error_data_source");
        }
      }
      return new ServerResponse().serialize(resp);
  }

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
    return resp;
  }

  private String getMostRecentSong(String token)
      throws URISyntaxException, IOException, InterruptedException {
    try {
      String url = "https://api.spotify.com/v1/me/player/recently-played?limit=1";

      APIUtility idURL = new APIUtility(url);

      Moshi moshi = new Moshi.Builder().build();
      JsonAdapter<SongID> trackAdapter = moshi.adapter(SongID.class);

      String JSONBody = idURL.getAPIRequest(token);
      SongID idObj = trackAdapter.fromJson(JSONBody);

      List<Item> items = idObj.items;
      String id = items.get(0).track.id;
      return id;

    } catch (Exception e ) {
      return "invalid token";
    }
  }
  }

