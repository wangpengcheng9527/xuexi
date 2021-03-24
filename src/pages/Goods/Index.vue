<template>
  <el-card>
    <el-button
      @click="showModel"
      type="primary"
      icon="el-icon-circle-plus-outline"
      >新增</el-button
    >
    <el-divider></el-divider>
    <List :info="info" @setFromInfo="setFromInfo" :params="params" />
    <Model :info="info" ref="model" :params="params" />
  </el-card>
</template>

<script>
import List from "./List";
import Model from "./Model";
export default {
  data() {
    return {
      info: {
        isShow: false,
        isAdd: true,
      },
      params: {
        page: 1,
        size: 1,
      },
    };
  },
  created() {},
  methods: {
    showModel() {
      this.info.isShow = true;
      this.info.isAdd = true;
    },
    setFromInfo(obj) {
      // 把数据传递给Model,通过利用ref调用Model下的方法
      this.$refs.model.setFromInfo(obj);
    },
  },
  components: {
    List,
    Model,
  },
};
</script>
<style scoped>
</style>