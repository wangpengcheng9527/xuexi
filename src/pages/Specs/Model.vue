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
      <el-form-item label="属性名" prop="specsname">
        <el-input v-model="formInfo.specsname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="属性值" prop="attrs">
        <div class="box" v-for="(item, index) in list" :key="index">
          <el-input type="Text" v-model="list[index]" autocomplete="off">
          </el-input>
          <el-button
            type="success"
            size="small"
            v-if="index == 0"
            @click="increase"
            >添加</el-button
          >
          <el-button type="danger" size="small" v-else @click="decrease(index)"
            >删除</el-button
          >
        </div>
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
import { addSpecs, editSpecs } from "../../request/specs";

export default {
  props: ["info", "params"],
  data() {
    return {
      list: [""],
      formInfo: {
        id: "",
        specsname: "",
        attrs: "",
        status: 1,
      },
      rules: {
        specsname: [
          { required: true, message: "请输入属性名", trigger: "blur" },
        ],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
      },
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },

  computed: {
    ...mapState({ specsList: (state) => state.specs.SpecsList }),
  },
  created() {
    //获取菜单列表 用来渲染到列表上

    this.getSpecsListAction();
  },
  methods: {
    ...mapActions("specs", ["getSpecsListAction"]),

    submit() {
      this.$refs.formInfo.validate((valid) => {
        if (valid) {
          this.formInfo.attrs = this.list.join(",");
          if (this.info.isAdd) {
            // -----------新增--------------------
            addSpecs(this.formInfo).then((res) => {
              if (res.code == 200) {
                // 1.弹出成功提示
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                // 2.刷新列表
                this.getSpecsListAction(this.params);
                // 3.关闭弹出框
                this.info.isShow = false;

                this.list = [""];
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

            editSpecs(this.formInfo).then((res) => {
              this.this.formInfo.attrs = this.list.join(",");
              if (res.code == 200) {
                // 1.弹出成功提示
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                // 2.刷新列表
                this.getSpecsListAction(this.params);
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

    //添加一个属性值输入框
    increase() {
      this.list.push("");
    },
    decrease(index) {
      this.list.splice(index, 1);
    },
    // 重置输入框
    reset() {
      this.formInfo = {
        id: "",
        specsname: "",
        attrs: "",
        status: 1,
      };
    },
    setFromInfo(obj) {
      // 把obj赋值给this.formInfo
      // 拷贝
      this.formInfo = { ...obj };
    },
  },
  components: {},
};
</script>
<style scoped>
.box {
  display: flex;
  margin-bottom: 10px;
}
</style>