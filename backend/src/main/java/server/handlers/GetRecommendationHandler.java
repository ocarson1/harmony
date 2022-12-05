package server.handlers;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import server.APIUtility;
import server.ServerResponse;
import server.handlers.RecommendationObj.ID;
import spark.QueryParamsMap;
import spark.Request;
import spark.Response;
import spark.Route;

public class GetRecommendationHandler implements Route {

  @Override
  public Object handle(Request request, Response response) throws Exception {
    Map<String, Object> resp = new HashMap<>();
    try {
      QueryParamsMap params = request.queryMap();
      if (!params.hasKey("token") || !params.hasKey("ids")) {
        resp.put("result", "error_bad_request");
        return new ServerResponse().serialize(resp);
      }
      String token = params.get("token").value();
      //split individual song ids and store in array
      String[] ids = params.get("ids").value().split(",");

      System.out.println(ids.toString());
      if (ids.length <= 2) {
        return new ServerResponse().serialize(resp);
      }

      String url = "https://api.spotify.com/v1/recommendations?seed_tracks=";
      for (int i=0; i<ids.length; i++) {
        url += ids[i] + "&";
      }
      url = url.substring(0, ids.length - 1);
      System.out.println(url);
      APIUtility recURL = new APIUtility(url);

      Moshi moshi = new Moshi.Builder().build();
      JsonAdapter<RecommendationObj> recAdapter = moshi.adapter(RecommendationObj.class);

      String JSONBody = recURL.getAPIRequest(token);
      RecommendationObj recObj = recAdapter.fromJson(JSONBody);

      List<ID> tracks = recObj.tracks;

      resp.put("result", "success");
      resp.put("id", tracks);
      return new ServerResponse().serialize(resp);

    } catch (Exception e) {
      System.out.println(e.getMessage());
      e.printStackTrace();
      resp.put("result", "error_bad_token");
      return new ServerResponse().serialize(resp);
    }
  }

  /**
   * Gets a response from an API using an input query.
   *
   * @param url - the query to make a request from the API endpoint.
   * @return - the HTTP response from the input query to the endpoint.
   * @throws URISyntaxException - when the query uses incorrect syntax.
   * @throws IOException - when we cannot successfully get a response from a request sent because of
   *     input format.
   * @throws InterruptedException - when the request gets interrupted so we cannot get the response.
   */
  public HttpResponse<String> getResponse(String url)
      throws URISyntaxException, IOException, InterruptedException {
    try {
      HttpRequest req = HttpRequest.newBuilder().uri(new URI(url)).GET().build();
      return HttpClient.newBuilder().build().send(req, HttpResponse.BodyHandlers.ofString());
    } catch (URISyntaxException e) {
      e.printStackTrace();
      throw new URISyntaxException(url, "invalid api call");
    } catch (IOException e) {
      e.printStackTrace();
      throw new IOException();
    } catch (InterruptedException e) {
      e.printStackTrace();
      throw new InterruptedException();
    }
  }

}
