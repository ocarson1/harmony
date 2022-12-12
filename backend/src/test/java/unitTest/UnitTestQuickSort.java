package unitTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;
import server.deserializationObjects.RecommendationObj.ID;
import server.sort.Quicksort;

public class UnitTestQuickSort {

  private void printPopularity(List<ID> ids, String listName) {
    String listIds = "";
    for (ID id: ids) {
      listIds += id.popularity + ", ";
    }
    System.out.println("Popularities in " + listName+ " list: " + listIds);
  }

  @Test
  public void testSortEmpty() {
    List<ID> arr = new ArrayList<>();
    Quicksort quickSort = new Quicksort(arr);
    quickSort.quickSort(0, 0);
    assertEquals(new ArrayList<>(), arr);
  }

  @Test
  public void testSortOutOfOrder() {
    List<ID> arr = new ArrayList<>();
    ID x = new ID();
    x.popularity = 2;
    ID y = new ID();
    y.popularity = 35;
    ID z = new ID();
    z.popularity = 10;
    ID b = new ID();
    b.popularity = 3;
    ID a = new ID();
    a.popularity = 1;
    arr.add(x);
    arr.add(y);
    arr.add(z);
    arr.add(a);
    arr.add(b);

    this.printPopularity(arr, "original");

    List<ID> expected = new ArrayList<>();
    expected.add(a);
    expected.add(x);
    expected.add(b);
    expected.add(z);
    expected.add(y);

    Quicksort quickSort = new Quicksort(arr);
    quickSort.quickSort(0, arr.size() - 1);

    this.printPopularity(arr, "sorted");
    assertEquals(expected, arr);
  }
}
