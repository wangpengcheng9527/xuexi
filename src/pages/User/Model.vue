<template>
  <el-dialog
    @close="reset"
    :title="info.isAdd ? '新增' : '编辑'"
    :visible.sync="info.isShow"
  >
    <el-form
      :model="formInfo"
      label-width="120px"
      ref="formInfo"
      :rules="rules"
    >
      <el-form-item label="角色">
        <el-select v-model="formInfo.roleid" placeholder="请选择角色">
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :label="item.rolename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="账号" prop="username">
        <el-input v-model="formInfo.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="formInfo.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="formInfo.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="2">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <!--  -->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit">提交</el-button>
      <el-button @click="info.isShow = false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { addUser, editUser } from "../../request/user";

export default {
  props: ["info", "params"],
  data() {
    return {
      formInfo: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请选择密码", trigger: "blur" }],
      },
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },

  computed: {
    ...mapState({ userList: (state) => state.user.userList }),
    ...mapState({ roleList: (state) => state.role.RoleList }),
  },
  created() {
    //获取菜单列表 用来渲染到列表上

    this.getRoleListAction();
  },
  methods: {
    ...mapActions("role", ["getRoleListAction"]),
    ...mapActions("user", ["getUserListAction"]),
    submit() {
      this.$refs.formInfo.validate((valid) => {
        if (valid) {
          if (this.info.isAdd) {
            // -----------新增--------------------
            addUser(this.formInfo).then((res) => {
              if (res.code == 200) {
                // 1.弹出成功提示
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                // 2.刷新列表
                this.getUserListAction(this.params);
                // 3.关闭弹出框
                this.info.isShow = false;
              } else {
                // 1.弹出失败提示
                this.$message({
                  message: res.msg,
                  type: "error",
                });
              }
            });
            // -------------------------------
          } else {
            // -----------编辑--------------

            editUser(this.formInfo).then((res) => {
              if (res.code == 200) {
                // 1.弹出成功提示
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                // 2.刷新列表
                this.getUserListAction(this.params);
                // 3.关闭对话框
                this.info.isShow = false;
              } else {
                // 1.弹出失败提示
                this.$message({
                  message: res.msg,
                  type: "error",
                });
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置输入框
    reset() {
      this.formInfo = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
    },
    setFromInfo(obj) {
      // 把obj赋值给this.formInfo
      // 拷贝
      this.formInfo = { ...obj };
      this.formInfo.password = "";
    },
  },
  components: {},
};
</script>
<style scoped>
</style>