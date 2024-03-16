package com.xhoj.xhojcodesandbox.unsafe;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

/**
 * 读取服务器文件（文件信息泄露）
 */
public class ReadFileError {

    public static void main(String[] args) throws InterruptedException, IOException {
        String userDir = System.getProperty("user.dir");
        System.out.println(userDir);
        String filePath = userDir + File.separator + "src/main/resources/application.properties";
        System.out.println(Paths.get(filePath));
        List<String> allLines = Files.readAllLines(Paths.get(filePath));
        System.out.println(String.join("\n", allLines));
    }
}
