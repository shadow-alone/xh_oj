<template>
  <div id="viewquestion">
    <a-form :model="searchParams" layout="inline" style="margin-left: 200px;">
      <a-form-item field="title" label="名称" style="min-width: 240px">
        <a-input v-model="searchParams.title" placeholder="请输入名称" />
      </a-form-item>
      <a-form-item field="tags" label="标签" style="min-width: 240px; margin-left: 150px;">
        <a-input-tag v-model="searchParams.tags" placeholder="请输入标签" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="doSubmit">搜索</a-button>
      </a-form-item>
    </a-form>
    
    <a-table :columns="columns" :data="data" :ref="tableRef" :pagination="{
      showTotal: true,
      pageSize: searchParams.pageSize,
      current: searchParams.current,
      total,
    }" @page-change="onPageChange">

      <template #tags="{ record }">
        <a-space wrap>
          <a-tag v-for="(tag, index) of record.tags" :key="index" :color="color">{{tag}}</a-tag>
        </a-space>
      </template>

      <template #acceptedRate="{ record }">
        {{record.submitNum==0?0:record.acceptedNum/record.submitNum }}%{{"("+record.acceptedNum+"/"+record.submitNum+")"}}
      </template>

      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD") }}
      </template>

      <template #optional="{ record }">
        <a-button type="primary" @click="doquestion(record.id)">做题</a-button>
      </template>
    </a-table>
  </div>
</template>



<script setup lang="ts">
import message from "@arco-design/web-vue/es/message";
import { Question, QuestionControllerService } from "../../../generated";
import { onMounted, ref, watchEffect } from "vue"
import { useRouter } from "vue-router";
import  moment from 'moment'
const tableRef = ref();
const data = ref([])
const total = ref()
const searchParams = ref({
  title:"",
  tags:[],
  pageSize: 10,
  current: 1,
});
const color="green"
const columns = [
  {
    title: "题号",
    dataIndex: "id",
  },
  {
    title: "题目名称",
    dataIndex: "title",
  },
  {
    title: "标签",
    slotName: "tags",
  },

  {
    title: "通过率",
    slotName: "acceptedRate",
  },

  {
    title: "题目创建时间",
    slotName: "createTime",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];

const loadData = async () => {

  const res = await QuestionControllerService.listQuestionVoByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    data.value = res.data.records;
    total.value = res.data.total as number;
  } else {
    message.error("加载失败，" + res.message);
  }
};

/**
 * 监听 searchParams 变量，改变时触发页面的重新加载
 */
watchEffect(() => {
  loadData();
});

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

const doSubmit=()=>{
  searchParams.value={
    ...searchParams.value,
    current: 1,
  }

}

const router = useRouter();

const doquestion = (id :any) => {
  router.push({
    path: "/question/do",
    query: {
      id: id,
    },
  });
};

</script>


<style scoped>
#viewquestion{
  width: 1300px;
  
}
</style>