package unitTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.util.ArrayList;
import java.util.List;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.junit.jupiter.api.Test;
import server.SongID;
import server.SongID.Item;
import server.TrackObj;
import server.TrackObj.Image;
import server.handlers.GetRecentSongHandler;

public class UnitTestRecent {

  @Test
  public void testUnitRecentDeserialize() throws IOException, ParseException {
    JSONParser parser = new JSONParser();

    Reader reader = new FileReader("data/recentResponse.json");
    JSONObject jsonObject = (JSONObject) parser.parse(reader);
    String jsonBody = jsonObject.toJSONString();
    jsonBody = jsonBody.replaceAll("\\\\", "");

    GetRecentSongHandler handle = new GetRecentSongHandler();
    SongID idObj = handle.getIDObj(jsonBody);

    List<Item> items = idObj.items;
    String id = items.get(0).track.id;
    assertEquals("0JfsIu62NVXNQl2s7ATN37", id);
  }
}
