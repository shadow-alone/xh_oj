package com.xhoj.judge;

import com.xhoj.judge.strategy.DefaultJudgeStrategy;
import com.xhoj.judge.strategy.JavaLanguageJudgeStrategy;
import com.xhoj.judge.strategy.JudgeContext;
import com.xhoj.judge.strategy.JudgeStrategy;
import com.xhoj.judge.codesandbox.model.JudgeInfo;
import com.xhoj.model.entity.QuestionSubmit;
import org.springframework.stereotype.Service;

/**
 * 判题管理（简化调用）
 */
@Service
public class JudgeManager {

    /**
     * 执行判题
     *
     * @param judgeContext
     * @return
     */
    JudgeInfo doJudge(JudgeContext judgeContext) {
        QuestionSubmit questionSubmit = judgeContext.getQuestionSubmit();
        String language = questionSubmit.getLanguage();
        JudgeStrategy judgeStrategy = new DefaultJudgeStrategy();
        if ("java".equals(language)) {
            judgeStrategy = new JavaLanguageJudgeStrategy();
        }
        return judgeStrategy.doJudge(judgeContext);
    }

}
