package server;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import java.lang.reflect.Type;
import com.squareup.moshi.Types;
import java.util.Map;

public class ServerResponse {
  public String serialize(Map<String, Object> m) {
    Moshi moshi = new Moshi.Builder().build();
    Type mapAdapter = Types.newParameterizedType(Map.class, String.class, Object.class);
    JsonAdapter<Map<String, Object>> adapter = moshi.adapter(mapAdapter);
    return adapter.toJson(m);
  }
}
