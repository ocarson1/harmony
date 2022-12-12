package server.handlers;

import java.util.HashMap;
import java.util.Map;
import server.Firebase;
import server.ServerResponse;
import spark.QueryParamsMap;
import spark.Request;
import spark.Response;
import spark.Route;

public class GetAllSongsHandler implements Route {

  private final Firebase f;

  public GetAllSongsHandler(Firebase f) {
    this.f = f;
  }

  @Override
  public Object handle(Request request, Response response) throws Exception {
    return null;
  }

//  @Override
//  public Object handle(Request request, Response response) throws Exception {
//    Map<String, Object> resp = new HashMap<>();
//    try {
//
//    } catch (Exception e) {
//      System.out.println(e.getMessage());
//      e.printStackTrace();
//      resp.put("result", "error_bad_token");
//      return new ServerResponse().serialize(resp);
//    }
//  }
}
