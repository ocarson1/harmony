package server.handlers;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import server.Firebase;
import server.ServerResponse;
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
    Map<String, Object> geoMap = new HashMap<>();
    Map<String, Object> innerGeometryMap = new HashMap<>();
    Map<String, Object> propertiesMap = new HashMap<>();
    Map<String, Object> resp = new HashMap<>();
    try {
      QueryParamsMap params = request.queryMap();
      if (!params.hasKey("id") || !params.hasKey("lat") || !params.hasKey("lon")) {
        resp.put("result", "error_bad_request");
        return new ServerResponse().serialize(resp);
      } else if (params.get("id").value().equals("") || params.get("lat").value().equals("")
          || params.get("lon").value().equals("")) {
        resp.put("result", "error_no_token");
        return new ServerResponse().serialize(resp);
      }
      String id = params.get("id").value();
      double lat = Double.parseDouble(params.get("lat").value());
      double lon = Double.parseDouble(params.get("lon").value());

      geoMap.put("type", "Feature");
      innerGeometryMap.put("type", "Point");
      List<Double> coords = new ArrayList<>();
      coords.add(lat);
      coords.add(lon);
      innerGeometryMap.put("coordinates", coords);
      geoMap.put("geometry", innerGeometryMap);
      propertiesMap.put("name", id);
      geoMap.put("properties", propertiesMap);
      this.f.addSong(id, geoMap);

      resp.put("result","success");
      resp.put("geoMap",geoMap);
      return new ServerResponse().serialize(resp);
    } catch (Exception e) {
      System.out.println(e.getMessage());
      resp.put("result", "error_bad_request");
      return new ServerResponse().serialize(resp);
    }
  }
}
