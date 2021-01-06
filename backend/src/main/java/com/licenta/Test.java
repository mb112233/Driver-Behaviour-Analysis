package com.licenta;

import java.io.IOException;

public class Test {
    public static void main(String[] args) throws IOException, InterruptedException {
        String date="11/24/2019 2:02";
        String[] arr=date.split(" ");
        System.out.println(arr[1]);

    }
}
