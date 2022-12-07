import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import server.APIUtility;
import server.ServerResponse;
import server.SongID;
import spark.QueryParamsMap;
import spark.Request;
import spark.Response;
import spark.Route;

public class GetDataHandler implements Route {

  @Override
  public Object handle(Request request, Response response) throws Exception {
    Map<String, Object> resp = new HashMap<>();
  }


}