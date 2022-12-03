package server.handlers;

import java.util.HashMap;
import java.util.Map;
import server.Firebase;
import spark.QueryParamsMap;
import spark.Request;
import spark.Response;
import spark.Route;

public class UserLocationHandler implements Route {

  private Firebase f;
  private Map<String, Object> userMap;

  public UserLocationHandler(Firebase f) {
    this.f = f;
    this.userMap = new HashMap<>();
  }

  @Override
  public Object handle(Request request, Response response) throws Exception {
    try {
      QueryParamsMap params = request.queryMap();
      if (!params.hasKey("location") || !params.hasKey("id")) {
        return new Exception("Missing params.");
      }
      String location = params.get("location").value();
      String id = params.get("id").value();

      this.userMap.put("location", location);
      this.userMap.put("id", id);

      this.f.addUser(this.userMap);
      return f;
    } catch (Exception e) {
      e.printStackTrace();
      return new Exception(e.getMessage());
    }
  }

  public Map<String, Object> getUserMap() {
    return new HashMap<>(this.userMap);
  }
}
