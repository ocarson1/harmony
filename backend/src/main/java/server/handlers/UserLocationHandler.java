package server.handlers;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import java.util.HashMap;
import java.util.Map;
import server.APIUtility;
import server.Firebase;
import server.deserializationObjects.UserObj;
import spark.QueryParamsMap;
import spark.Request;
import spark.Response;
import spark.Route;

/**
 * Adds a user's ID and lat and lon values to the firebase database.
 */
public class UserLocationHandler implements Route {

  private Firebase f;
  private Map<String, Object> userMap;

  /**
   * Initializes the UserLocationHandler with the Firebase argument and the user's Map of String to Object.
   * @param f - the Firebase object instance
   */
  public UserLocationHandler(Firebase f) {
    this.f = f;
    this.userMap = new HashMap<>();
  }

  /**
   * Invoked when the userLoc endpoint is called. The request must include params of lat, lon,
   * and the user's id.
   * @param request - the request object for the userLoc endpoint with HTTP request information.
   * @param response - the response object that allows response modification.
   * @return the serialized Map of String to Object containing the result.
   * @throws Exception - if an error is encountered in the retrieval process
   */
  @Override
  public Object handle(Request request, Response response) throws Exception {
    try {
      QueryParamsMap params = request.queryMap();
      if (!params.hasKey("lat") || !params.hasKey("lon") || !params.hasKey("id")) {
        return new Exception("Missing params.");
      }
      String lat = params.get("lat").value();
      String lon = params.get("lon").value();
      String id = params.get("id").value();
//      String token = params.get("token").value();
//
//      String url = "https://api.spotify.com/v1/me";
//      APIUtility recURL = new APIUtility(url);
//
//      Moshi moshi = new Moshi.Builder().build();
//      JsonAdapter<UserObj> recAdapter = moshi.adapter(UserObj.class);
//
//      String JSONBody = recURL.getAPIRequest(token);
//      UserObj userObj = recAdapter.fromJson(JSONBody);

      this.userMap.put("lat", lat);
      this.userMap.put("lon", lon);
      this.userMap.put("id", id);

      this.f.addLocation(id, this.userMap);
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
