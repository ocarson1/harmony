package unitTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import server.Firebase;
import server.deserializationObjects.SongID;
import server.deserializationObjects.SongID.Item;
import server.handlers.GetRecentSongHandler;

public class UnitTestFirebase {

  @Test
  public void testDocAlreadyExists() throws ExecutionException, InterruptedException {
    Firebase db = new Firebase();

    assertEquals(db.docExists("songs", "BQCDV3LrZML7I9ay2H8h_Ci517Pl_NMBYxYccWKtd-XhxcZ2eGWb-nPVf2s2q0yLNnDv-WAPfDr29sXR6GN4sKtZIwgTQ1UvXyVYdeafDNGAC7RuiL6mCeNWW0b4mzGgpSUb8pbmICA6vXjgvO9pkfZPIyAMmxJLkZGfcl2zcNcg1GpbK6pHzXL9qrJoKEe4Bh0"), true);
  }

  @Test
  public void testGetDataAdd() throws ExecutionException, InterruptedException {
    Firebase db = new Firebase();
    Map<String, Object> map = db.getData("songs", "BQDa_O7xGklla8H1l0jroDBVlnfDtkMajYP4a4R6A0Df_5K_HrjGrGFTtEkg4T-pU1B4ZtjMZ9q9QKgGHFPiaUUb1_CIXpc9ZEgC5Ke7tmO7DxHaR1-WhsLX7Ye6yQorrH9LJTVJSDeGAZ4UvQWO23Xypk3Q7yzz57_b1TGOB6X3omu6q8pJUNK8ZprS4PrWEjXhGQ6OT3ps");
    map.put("test", "hello");

    System.out.println(map);
  }

}
