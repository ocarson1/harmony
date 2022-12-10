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
  public void testDocAlreadyExists() {
    Firebase db = new Firebase();

    assertEquals(db.docExists("songs", "BQCDV3LrZML7I9ay2H8h_Ci517Pl_NMBYxYccWKtd-XhxcZ2eGWb-nPVf2s2q0yLNnDv-WAPfDr29sXR6GN4sKtZIwgTQ1UvXyVYdeafDNGAC7RuiL6mCeNWW0b4mzGgpSUb8pbmICA6vXjgvO9pkfZPIyAMmxJLkZGfcl2zcNcg1GpbK6pHzXL9qrJoKEe4Bh0"), true);
  }

  @Test
  public void testGetData() throws ExecutionException, InterruptedException {
    Firebase db = new Firebase();
    Map<String, Object> map = db.getData("users", "Arman");
    assertEquals(map.get("song"), "Like A Tattoo - Sade");
  }

}
