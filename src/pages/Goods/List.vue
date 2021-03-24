<template>
  <div>
    <!-- :data="cateList" 当商品数据  -->
    <el-table
      :data="goodsList"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="序号" width="80px"> </el-table-column>
      <el-table-column prop="firstcatename" label="一级分类" width="120px">
      </el-table-column>
      <el-table-column prop="secondcatename" label="二级分类" width="120px">
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="120px">
      </el-table-column>
      <el-table-column prop="img" label="商品图片">
        <template slot-scope="scope">
          <img
            v-if="scope.row.img"
            class="img"
            :src="$imgBaseUrl + scope.row.img"
            alt=""
          />
        </template>
      </el-table-column>
      <el-table-column prop="price" label="零售价">
        <template slot-scope="scope"> &yen; {{ scope.row.price }} </template>
      </el-table-column>
      <el-table-column prop="market_price" label="市场价">
        <template slot-scope="scope">
          &yen; {{ scope.row.market_price }}
        </template>
      </el-table-column>

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
            class="del"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[1, 5, 10, 20]"
      :page-size="1"
      layout="total, sizes, prev, pager, next, jumper"
      :total="goodsTotal"
    >
    </el-pagination>
  </div>
</template>

<script>
//结构辅助函数
import { mapState, mapActions } from "vuex";
//导入接口办法
import { delGoods } from "../../request/goods";
export default {
  props: ["info", "params"],
  data() {
    return {};
  },
  computed: {
    ...mapState({
      goodsList: (state) => state.goods.goodsList,
      goodsTotal: (state) => state.goods.goodsTotal,
    }),
  },
  created() {
    //获取后台数据
    this.getGoodsListAction(); //请求列表
  },
  methods: {
    ...mapActions("goods", ["getGoodsListAction"]),
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
          delGoods(id).then((res) => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: res.msg,
              });
              // 刷新列表
              this.getGoodsListAction();
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
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.params.size = val;
      this.params.page = 1;
      this.getGoodsListAction(this.params);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.params.page = val;
      this.getGoodsListAction(this.params);
    },
  },
  components: {},
};
</script>
<style scoped>
.img {
  width: 90px;
}
.el-button + .el-button {
  margin: 0;
}
</style>