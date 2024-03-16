<template>
    <div id=foraddquestionm>
        <h2>提交题目</h2>
        <a-form :model="form" style="width: 800px;">
            <a-form-item field="title" label="请输入题目">
                <a-input v-model="form.title" placeholder="请输入题目" />
            </a-form-item>
            <a-form-item field="content" label="题目内容">
                <MdEditor :value="form.content" :handleChange="onContentChange" />
            </a-form-item>
            <a-form-item field="answer" label="题目答案">
                <MdEditor :value="form.answer" :handleChange="onAnswerChange" />
            </a-form-item>
            <a-form-item field="tags" label="标签">
                <a-input-tag v-model="form.tags" :style="{ width: '320px' }" placeholder="Please Enter" />
            </a-form-item>
            <!-- 判题配置 -->
            <a-form-item label="判题配置" :content-flex="false" :merge-props="false">
                <a-space direction="vertical" style="min-width: 480px">
                    <a-form-item field="judgeConfig.timeLimit" label="时间限制">
                        <a-input-number v-model="form.judgeConfig.timeLimit" placeholder="请输入时间限制" mode="button"
                            size="large" />
                    </a-form-item>
                    <a-form-item field="judgeConfig.memoryLimit" label="内存限制">
                        <a-input-number v-model="form.judgeConfig.memoryLimit" placeholder="请输入内存限制" mode="button"
                            size="large" />
                    </a-form-item>
                    <a-form-item field="judgeConfig.stackLimit" label="堆栈限制">
                        <a-input-number v-model="form.judgeConfig.stackLimit" placeholder="请输入堆栈限制" mode="button"
                            size="large" />
                    </a-form-item>
                </a-space>
            </a-form-item>
            <!-- 测试用例配置 -->
            <a-form-item label="测试用例配置" :content-flex="false" :merge-props="false">
                <a-form-item v-for="(judgeCaseItem, index) of form.judgeCase" :key="index" no-style>
                    <a-space direction="vertical" style="min-width: 640px">
                        <a-form-item :field="`form.judgeCase[${index}].input`" :label="`输入用例-${index}`" :key="index">
                            <a-input v-model="judgeCaseItem.input" placeholder="请输入测试输入用例" />
                        </a-form-item>
                        <a-form-item :field="`form.judgeCase[${index}].output`" :label="`输出用例-${index}`" :key="index">
                            <a-input v-model="judgeCaseItem.output" placeholder="请输入测试输出用例" />
                        </a-form-item>
                        <a-button status="danger" @click="handleDelete(index)">
                            删除
                        </a-button>
                    </a-space>
                </a-form-item>
                <div style="margin-top: 32px">
                    <a-button @click="handleAdd" type="outline" status="success">新增测试用例
                    </a-button>
                </div>
            </a-form-item>
            <div style="margin-top: 16px"></div>
            <a-form-item>
                <a-button type="primary" @click="handleSubmit" style="width: 200px;">提交</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script setup lang="ts">
import MdEditor from '@/components/MdEditor.vue';
import { QuestionControllerService } from '../../../generated';
import { onMounted, ref } from 'vue';
import message from '@arco-design/web-vue/es/message';
import { useRoute } from 'vue-router';



let form = ref(
    {
        title: "",
        content: "",
        answer: "",
        tags: [],
        judgeCase: [
            {
                input: "",
                output: ""
            }
        ],
        judgeConfig: {
            memoryLimit: 0,
            stackLimit: 0,
            timeLimit: 0
        },


    }
);


const onContentChange = (value: string) => {
    form.value.content = value;
};

const onAnswerChange = (value: string) => {
    form.value.answer = value;
};


const handleAdd = () => {
    form.value.judgeCase.push({
        "input": "",
        "output": ""
    })

};

const handleDelete = (index: number) => {
    form.value.judgeCase.splice(index)
}
const route = useRoute();
const path = route.path.includes("update")

const loadpage = async () => {
    if (path) {
        const id = route.query.id;
        const res = await QuestionControllerService.getQuestionByIdUsingGet(id as any);
        if (res.code === 0) {
            form.value = res.data as any;
            // json 转 js 对象
            if (!form.value.judgeCase) {
                form.value.judgeCase = [
                    {
                        input: "",
                        output: "",
                    },
                ];
            } else {
                form.value.judgeCase = JSON.parse(form.value.judgeCase as any);
            }
            if (!form.value.judgeConfig) {
                form.value.judgeConfig = {
                    memoryLimit: 1000,
                    stackLimit: 1000,
                    timeLimit: 1000,
                };
            } else {
                form.value.judgeConfig = JSON.parse(form.value.judgeConfig as any);
            }
            if (!form.value.tags) {
                form.value.tags = [];
            } else {
                form.value.tags = JSON.parse(form.value.tags as any);
            }
        } else {
            message.error("加载失败，" + res.message);
        }
    }
}

onMounted(() => {
    loadpage();
})
const handleSubmit = async () => {
    if (path) {
        const res = await QuestionControllerService.updateQuestionUsingPost(form.value);
        if (res.code == 0) {
            message.success("修改成功")
        } else {
            message.error("修改失败" + res.message)
        }
    }
    else {
        const res = await QuestionControllerService.addQuestionUsingPost(form.value);
        if (res.code == 0) {
            message.success("添加成功")
        } else {
            message.error("添加" + res.message)
        }
    }

};






</script>

<style scoped></style>