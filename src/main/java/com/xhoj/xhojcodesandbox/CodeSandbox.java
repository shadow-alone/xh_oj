package com.xhoj.xhojcodesandbox;


import com.xhoj.xhojcodesandbox.model.ExecuteCodeRequest;
import com.xhoj.xhojcodesandbox.model.ExecuteCodeResponse;

/**
 * 代码沙箱接口定义
 */
public interface CodeSandbox {

    /**
     * 执行代码
     *
     * @param executeCodeRequest
     * @return
     */
    ExecuteCodeResponse executeCode(ExecuteCodeRequest executeCodeRequest);
}
