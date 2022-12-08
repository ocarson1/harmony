package server.handlers;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import java.util.HashMap;
import java.util.Map;
import server.APIUtility;
import server.ServerResponse;
import server.deserializationObjects.RecommendationObj;
import server.deserializationObjects.UserObj;
import spark.QueryParamsMap;
import spark.Request;
import spark.Response;
import spark.Route;

public class GetUserProfileHandler implements Route {

  @Override
  public Object handle(Request request, Response response) throws Exception {
    Map<String, Object> resp = new HashMap<>();
    try {
      QueryParamsMap params = request.queryMap();
      if (!params.hasKey("token")) {
        resp.put("result", "error_bad_request");
        return new ServerResponse().serialize(resp);
      } else if (params.get("token").value().equals("")) {
        resp.put("result", "error_no_token");
        return new ServerResponse().serialize(resp);
      }
      String token = params.get("token").value();

      String url = "https://api.spotify.com/v1/me";
      APIUtility recURL = new APIUtility(url);

      Moshi moshi = new Moshi.Builder().build();
      JsonAdapter<UserObj> recAdapter = moshi.adapter(UserObj.class);

      String JSONBody = recURL.getAPIRequest(token);
      UserObj userObj = recAdapter.fromJson(JSONBody);

      resp.put("result", "success");
      //resp.put("id", tracks);
      return new ServerResponse().serialize(resp);

  } catch (Exception e) {
      System.out.println(e.getMessage());
      e.printStackTrace();
      resp.put("result", "error_bad_token");
      return new ServerResponse().serialize(resp);
    }
}
