<template>
  <el-dialog
    @close="reset"
    :title="info.isAdd ? '新增' : '编辑'"
    :visible.sync="info.isShow"
  >
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="first">
        <el-form
          :model="formInfo"
          label-width="120px"
          ref="formInfo"
          :rules="rules"
        >
          <el-form-item label="一级分类" prop="first_cateid">
            <el-select
              v-model="formInfo.first_cateid"
              placeholder="请选择一级分类"
              @change="firstCateChange"
            >
              <el-option
                v-for="item in cateList"
                :key="item.id"
                :label="item.catename"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="二级分类" prop="second_cateid">
            <el-select
              v-model="formInfo.second_cateid"
              placeholder="请选择二级分类"
            >
              <el-option
                v-for="item in second_cateList"
                :key="item.id"
                :label="item.catename"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品名称" prop="goodsname">
            <el-input
              v-model="formInfo.goodsname"
              autocomplete="off"
              placeholder="商品名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品图片" v-if="formInfo.pid != 0">
            <el-upload
              class="avatar-uploader"
              action=""
              :auto-upload="false"
              :show-file-list="false"
              :on-change="change"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="商品价格" prop="price">
            <el-input
              v-model="formInfo.price"
              autocomplete="off"
              placeholder="商品价格"
            ></el-input>
          </el-form-item>
          <el-form-item label="市场价格" prop="market_price">
            <el-input
              v-model="formInfo.market_price"
              autocomplete="off"
              placeholder="市场价格"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品规格" prop="specsid">
            <el-select
              v-model="formInfo.specsid"
              placeholder="请输入规格"
              @change="firstSpecsid"
            >
              <el-option
                v-for="item in specsAllList"
                :key="item.id"
                :label="item.specsname"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="规格属性值" prop="specsattr">
            <el-select v-model="formInfo.specsattr" placeholder="请输入值">
              <el-option
                v-for="(item, index) in specsSecondList"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="formInfo.status">
              <el-radio :label="1">正常</el-radio>
              <el-radio :label="2">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
          <!--  -->
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="配置详情" name="second">
        <!-- 富文本编辑器 -->
        <vue-wangeditor
          ref="vueEditor"
          id="editor"
          style="width: 100%; height: 300px; margin-bottom: 200px"
        ></vue-wangeditor>
      </el-tab-pane>
    </el-tabs>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit">提交</el-button>
      <el-button @click="info.isShow = false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入editor
import vueWangeditor from "vue-wangeditor";
import { mapState, mapActions } from "vuex";
import { addGoods, editGoods } from "../../request/goods";

export default {
  props: ["info", "params"],
  data() {
    return {
      formInfo: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      // 二级分类的list
      second_cateList: [],
      // 规格属性值list
      specsSecondList: [],
      rules: {
        pid: [{ required: true, message: "请选择分类", trigger: "blur" }],
        catename: [{ required: true, message: "请输入名称", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
      },
      imageUrl: "",
      activeName: "first",
    };
  },

  computed: {
    ...mapState({
      cateList: (state) => state.cate.cateList,
      specsAllList: (state) => state.specs.specsAllList,
    }),
  },
  created() {
    this.getCateListAction(); //请求一级分类的列表
    this.getSpecsTotalAction(); //请求规格列表
  },
  methods: {
    ...mapActions("cate", ["getCateListAction"]), //获取一级分类列表的
    ...mapActions("specs", ["getSpecsTotalAction"]), //获取规格列表总数的
    ...mapActions("goods", ["getGoodsListAction"]),
    submit() {
      this.$refs.formInfo.validate((valid) => {
        if (valid) {
          // 单独获取富文本编辑器内容

          this.formInfo.description = this.$refs.vueEditor.getHtml();
          // 清除两个字段 firstcatename&secondcatename
          this.$delete(this.formInfo, "firstcatename");
          this.$delete(this.formInfo, "secondcatename");
          // 上传一个formData对象
          let fd = new FormData();
          for (let k in this.formInfo) {
            fd.append(k, this.formInfo[k]);
          }
          if (this.info.isAdd) {
            // -----------新增--------------------
            addGoods(fd).then((res) => {
              if (res.code == 200) {
                // 1.弹出成功提示
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                // 2.刷新列表
                this.getGoodsListAction(this.params);
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
            // -------------------------------
          } else {
            // -----------编辑--------------
            editGoods(fd).then((res) => {
              if (res.code == 200) {
                // 1.弹出成功提示
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                // 2.刷新列表
                this.getGoodsListAction(this.params);
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
    // 重置对话框
    reset() {
      this.formInfo = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1,
      };
      this.$refs.vueEditor.setHtml("");
      this.imageUrl = "";
      this.activeName = "first";
    },
    setFromInfo(obj) {
      this.formInfo = { ...obj };
      // 延迟执行;
      setTimeout(() => {
        this.$refs.vueEditor.setHtml(this.formInfo.description);
      }, 500);

      this.imageUrl = this.$imgBaseUrl + this.formInfo.img;
      let index1 = this.cateList.findIndex(
        (item) => item.id == this.formInfo.first_cateid
      );
      this.second_cateList = this.cateList[index1].children;
      let index2 = this.specsAllList.findIndex(
        (item) => item.id == this.formInfo.specsid
      );
      this.specsSecondList = this.specsAllList[index2].attrs;
    },
    // 当一级分类改变的时候触发这个方法
    firstCateChange() {
      console.log("一级分类改变了");
      // 1.根据id获取下标通过item来拿到id然后得到一个index下标
      let index = this.cateList.findIndex(
        (item) => item.id == this.formInfo.first_cateid
      );
      // 2.根据下标获取当前一级分类下的children,也就是二级分类列表
      this.second_cateList = this.cateList[index].children;
      // 3.每次触发时清空二级分类下拉框
      this.formInfo.second_cateid = "";
    },
    change(res, file) {
      // res上传图片的文件对象,file是上传文件的数组对象
      this.imageUrl = URL.createObjectURL(res.raw);
      this.formInfo.img = res.raw;
    },
    //当规格列表改变时触发二级规格属性
    firstSpecsid() {
      let index = this.specsAllList.findIndex(
        (item) => item.id == this.formInfo.specsid
      );
      this.specsSecondList = this.specsAllList[index].attrs;
      this.formInfo.specsattr = "";
    },
  },

  components: {
    vueWangeditor,
  },
};
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #8c939d;
  border-radius: 5px;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>