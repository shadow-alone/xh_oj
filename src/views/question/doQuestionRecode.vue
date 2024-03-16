<template>
    <div id="doquestionrecode">
      <a-form :model="searchParams" layout="inline" style="margin-left: 200px;">
        <a-form-item field="id" label="题号" style="min-width: 240px">
          <a-input v-model="searchParams.questionId" placeholder="请输入题号" />
        </a-form-item>
        <a-form-item>
        <a-space>
            <a-select :style="{ width: '300px' }" v-model="searchParams.language" placeholder="请选择语言"
              defaultValue="java">
              <a-option>java</a-option>
              <a-option>cpp</a-option>
              <a-option>go</a-option>
              <a-option>html</a-option>
            </a-select>
          </a-space>
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

        <template #judgeInfo="{ record }">
          {{ JSON.stringify(record.judgeInfo)}}
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
import { formToJSON } from "axios";
  const tableRef = ref();
  const data = ref([])
  const total = ref(0)
  const searchParams = ref({
    questionId:undefined,
    language:"",
    pageSize: 10,
    current: 1,
  });

  const color="green"
  const columns = [
    {
      title: "题目ID",
      dataIndex: "questionId",
    },
    {
      title: "语言",
      dataIndex: "language",
    },
    {
      title: "执行结果",
      slotName: "judgeInfo",
    },
  
    {
      title: "执行状态",
      dataIndex: "status",
    },
    {
      title: "提交人ID",
      dataIndex: "userId",
    },
    {
      title: "题目创建时间",
      dataIndex: "createTime",
    },
    
  ];
  
  const loadData = async () => {
  
    const res = await QuestionControllerService.listQuestionSubmitByPageUsingPost(
      searchParams.value
    );
    if (res.code === 0) {
      data.value = res.data.records;
      total.value = res.data.total;
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
  
  </script>
  
  
  <style scoped>
  #doquestionrecode{
    width: 1300px;
    
  }
  </style>