package server.sort;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import server.deserializationObjects.RecommendationObj.ID;

public class Quicksort {

  private List<ID> ids;

  public Quicksort(List<ID> ids) {
    this.ids = ids;
  }

  public int partition(List<ID> arr, int l, int h) {
    //retrieve pivot
    ID pivot = arr.get(h);

    int i = l - 1;
    for (int j = l; j<= h - 1; j++) {
      if (arr.get(j).popularity < pivot.popularity) {
        i++;
        this.swap(arr, i, j);
      }
    }
    this.swap(arr, i+1, h);
    return (i+1);
  }

  private void swap(List<ID> arr, int i, int j) {
    Collections.swap(arr, i, j);
  }

  public List<ID> quickSort(List<ID> arr, int l, int h) {
    if (l < h) {
      int partitionIndex = this.partition(arr, l, h);
      this.quickSort(arr, l, partitionIndex - 1);
      this.quickSort(arr, partitionIndex + 1, h);
    }
    return this.ids;
  }

//  // Function to print an array
//  public void printArray(List<ID> arr, int size)
//  {
//    for (int i = 0; i < size; i++)
//      System.out.print(arr.get(i).popularity + " ");
//
//    System.out.println();
//  }

//  // Driver Code
//  public static void main(String[] args)
//  {
//    List<ID> arr = new ArrayList<>();
//    ID x = new ID();
//    x.popularity = 2;
//    ID y = new ID();
//    y.popularity = 35;
//    ID z = new ID();
//    z.popularity = 10;
//    ID a = new ID();
//    a.popularity = 1;
//    arr.add(x);
//    arr.add(y);
//    arr.add(z);
//    arr.add(a);
//    int n = arr.size();
//
//    System.out.println("original array: ");
//    for (ID id: arr) {
//      System.out.println(id.popularity);
//    }
//
//    quickSort(arr, 0, n - 1);
//    System.out.println("Sorted array: ");
//    printArray(arr, n);
//
//    for (ID id: arr) {
//      System.out.println(id.id);
//    }
//  }
}
