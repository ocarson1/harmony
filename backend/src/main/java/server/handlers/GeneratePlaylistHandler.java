package server.handlers;

import java.util.HashMap;
import java.util.Map;
import spark.QueryParamsMap;
import spark.Request;
import spark.Response;
import spark.Route;

public class GeneratePlaylistHandler implements Route {


  @Override
  public Object handle(Request request, Response response) throws Exception {
    Map<String, Object> resp = new HashMap<>();
    try {
      QueryParamsMap params = request.queryMap();
      if (!params.hasKey("tracks")) {
        resp.put("result", "error_bad_parameters");
      } else if (params.get("tracks") == null) {
        resp.put("result", "error_no_track_seed");
      } else {

      }
    }
  }
}
