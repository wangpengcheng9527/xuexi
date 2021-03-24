<template>
  <div>
    <!-- :data="roleList" 当前角色表格数据  -->
    <el-table
      :data="roleList"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="ID"> </el-table-column>
      <el-table-column prop="rolename" label="角色名称"> </el-table-column>

      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.status == 1">正常</el-tag>
          <el-tag type="warning" v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click="edit(scope.row)"
            type="primary"
            icon="el-icon-edit"
            size="small"
          ></el-button>
          <el-button
            @click="del(scope.row.id)"
            type="danger"
            icon="el-icon-delete"
            size="small"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
//结构辅助函数

import { mapState, mapActions } from "vuex";
//导入接口办法
import { delRole } from "../../request/role";
export default {
  props: ["info"],
  data() {
    return {};
  },
  computed: {
    ...mapState({ roleList: (state) => state.role.RoleList }),
  },
  created() {
    //获取后台数据
    this.getRoleListAction();
  },
  methods: {
    ...mapActions("role", ["getRoleListAction"]),
    edit(row) {
      // 1.显示弹框
      this.info.isShow = true;
      this.info.isAdd = false;
      // 2.把数据传递到Index.vue
      this.$emit("setFromInfo", row);
    },
    del(id) {
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 删除操作
          delRole(id).then((res) => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: res.msg,
              });
              // 刷新列表
              this.getRoleListAction();
            } else {
              this.$message({
                type: "error",
                message: res.msg,
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },

  components: {},
};
</script>
<style scoped>
</style>