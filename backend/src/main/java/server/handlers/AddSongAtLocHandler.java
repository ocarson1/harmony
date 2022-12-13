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

public class AddSongAtLocHandler implements Route {

  private Firebase f;

  public AddSongAtLocHandler(Firebase f) {
    this.f = f;
  }
  /*
  {
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [125.6, 10.1]
  },
  "properties": {
    "name": "Dinagat Islands"
  }
}
   */

  @Override
  public Object handle(Request request, Response response) throws Exception {
    Map<String, Object> geoMap = new HashMap<>();
    Map<String, Object> innerGeometryMap = new HashMap<>();
    Map<String, Object> propertiesMap = new HashMap<>();
    Map<String, Object> resp = new HashMap<>();
    try {
      QueryParamsMap params = request.queryMap();
      if (!params.hasKey("id") || !params.hasKey("lat") || !params.hasKey("lon") || !params.hasKey("token")) {
        resp.put("result", "error_bad_request");
        return new ServerResponse().serialize(resp);
      } else if (params.get("id").value().equals("") || params.get("lat").value().equals("")
          || params.get("lon").value().equals("") || params.get("token").value().equals("")) {
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
      resp.put("data",geoMap);
      return new ServerResponse().serialize(resp);
    } catch (Exception e) {
      System.out.println(e.getMessage());
      resp.put("result", "error_bad_request");
      return new ServerResponse().serialize(resp);
    }
  }
}
