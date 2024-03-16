<template>
  <div id="doquestion">
    <a-row class="grid-demo" :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-tabs default-active-key="question">
          <a-tab-pane key="question" title="题目">
            <a-card v-if="question" :title="question.title">
              <a-descriptions title="判题条件" :column="{ xs: 1, md: 2, lg: 3 }">
                <a-descriptions-item label="时间限制">
                  {{ question.judgeConfig.timeLimit }}
                </a-descriptions-item>
                <a-descriptions-item label="内存限制">
                  {{ question.judgeConfig.memoryLimit }}
                </a-descriptions-item>
                <a-descriptions-item label="堆栈限制">
                  {{ question.judgeConfig.stackLimit }}
                </a-descriptions-item>
              </a-descriptions>
              <MdViewer :value="question.content || ''" />
              <template #extra>
                <a-space wrap>
                  <a-tag v-for="(tag, index) of question.tags" :key="index" color="green">{{ tag }}
                  </a-tag>
                </a-space>
              </template>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="comment" title="评论" disabled> 评论区</a-tab-pane>
          <a-tab-pane key="answer" title="答案"> 暂时无法查看答案</a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :md="12" :xs="24">
        <div id="language">
          <h4>请选择语言：</h4>
          <a-space>
            <a-select :style="{ width: '300px' }" v-model="form.language" placeholder="Please select ..."
              defaultValue="java">
              <a-option>java</a-option>
              <a-option>cpp</a-option>
              <a-option>go</a-option>
              <a-option>html</a-option>
            </a-select>
          </a-space>
        </div>
        <div>
          <CodeEditor :value="form.code" :language="form.language" :handleChange="onChange" />
          <div id="commitArea">
            <a-button type="primary" style="min-width: 200px" @click="doSubmit">
              提交代码
            </a-button>
          </div>

        </div>
      </a-col>

    </a-row>
  </div>
</template>

<script setup lang="ts">
import CodeEditor from '@/components/CodeEditor.vue';
import { QuestionControllerService, QuestionVO } from '../../../generated';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import message from '@arco-design/web-vue/es/message';
import MdViewer from '@/components/Mdviewer.vue'

const question = ref();

const route = useRoute();

const loadQuestion = async () => {
  const id = route.query.id;
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(id as any);
  if (res.code == 0) {
    question.value = res.data
  } else {
    message.error(res.message as string)
  }

}

onMounted(() => {
  loadQuestion();
})

const form = ref({
  language: '',
  code: '',
  questionId: 0

})

const questionid = route.query.id;

const onChange = (v: string) => {
  form.value.code = v;

}


const doSubmit = async () => {
  form.value = {
    ...form.value,
    questionId: questionid as any
  }
  const res = await QuestionControllerService.doQuestionSubmitUsingPost(form.value);
  if (res.code === 0) {
     message.success("提交成功")
  }
  else{
    message.error("提交失败"+res.message)
  }
}
</script>

<style scoped>
#doquestion {
  max-width: 1500px;
}

#commitArea {

  margin-top: 20px;
}

#language {
  display: flex;
}
</style>