package com.xhoj.model.dto.questionsubmit;
import lombok.Data;
@Data
public class JudgeInfo {
    /**
    程序执行信息
    */
  private  String message;

    /**
     内存消耗
     */
    private  Long memory;

    /**
     消耗时间
     */
    private  Long time;

}
