<template>
  <div class="app-container">
    <el-dialog title="价格" :visible.sync="dialogZjbjTc" width="85%" :close-on-click-modal="false" @opened="fzForm"
      :show-close='false'>
      <el-table v-loading="loading" :data="zjbjList" @selection-change="handleSelectionChange">
        <!-- <el-table-column type="selection" width="55" align="center" /> -->
        <el-table-column label="物料编码" align="center" prop="wlbm" />
        <el-table-column label="物料名称" align="center" prop="wlmc" />
        <el-table-column label="材质" align="center" prop="dccz" />
        <el-table-column label="型号" align="center" prop="dcxh" />
        <el-table-column label="单位" align="center" prop="dw" />
        <el-table-column label="供应商名称" align="center" prop="gysmc" />
        <el-table-column label="数量" align="center" prop="sl" />
        <el-table-column label="3D单价" align="center" prop="dj">
          <template slot-scope="scope">
            <el-radio v-model="radio" :label="'radio1' + scope.$index" @change="handleRadioChange">{{ scope.row.dj
              }}</el-radio>
          </template>
        </el-table-column>
        <el-table-column label="机加工单价" align="center" prop="jjgdj">
          <template slot-scope="scope">
            <el-radio v-model="radio" :label="'radio2' + scope.$index" @change="handleRadioChange">{{ scope.row.jjgdj
              }}</el-radio>
          </template>
        </el-table-column>
        <el-table-column label="软模单价" align="center" prop="rmdj">
          <template slot-scope="scope">
            <el-radio v-model="radio" :label="'radio3' + scope.$index" @change="handleRadioChange">{{ scope.row.rmdj
              }}</el-radio>
          </template>
        </el-table-column>
        <el-table-column label="批量模单价" align="center" prop="plmdj">
          <template slot-scope="scope">
            <el-radio v-model="radio" :label="'radio4' + scope.$index" @change="handleRadioChange">{{ scope.row.plmdj
              }}</el-radio>
          </template>
        </el-table-column>
        <el-table-column label="模具费" align="center" prop="mjf" />
        <el-table-column label="损耗率(%)" align="center" prop="shbl" />
        <!-- <el-table-column label="报价人" align="center" prop="bjr" />
      <el-table-column label="报价日期" align="center" prop="bjrq" /> -->
        <el-table-column label="报价人" align="center" prop="cjrxm" />
        <el-table-column label="报价日期" align="center" prop="cjsj" />
        <el-table-column label="备注" align="center" prop="bz" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="on">关 闭</el-button>
      </span>

    </el-dialog>
  </div>

</template>

<script>
import { listZjbj, getZjbj, delZjbj, addZjbj, updateZjbj, } from "@/api/zjbj/zjbj";
import wlxx from "@/views/bom/wlxxTc.vue";
export default {
  components: {
    wlxx,
  },
  props: ['dialogZjbjTc', 'zjbjData', 'rowXh'],
  name: "zjbjTc",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 组件报价表格数据
      zjbjList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        wlnbxh: null,
        wlbm: null,
        wlmc: null,
        dccz: null,
        dcxh: null,
        gysmc: null,
        gysxh: null,
        sl: null,
        dj: null,
        jjgdj: null,
        rmdj: null,
        plmdj: null,
        mjf: null,
        bjr: null,
        bjrq: null,
        bz: null,
        cjsj: null,
        cjrxh: null,
        cjrxm: null,
        bgsj: null,
        bgrxh: null,
        bgrxm: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
      dialogWlxx: false,
      radio: '',
      selectDj: [],
    };
  },
  created() {
    //this.getList();

  },
  methods: {
    fzForm() {
      this.loading = true;
      console.log("赋值了");
      this.zjbjList = this.zjbjData;
      this.loading = false;

    },
    /** 查询组件报价列表 */
    getList() {
      this.loading = true;
      listZjbj(this.queryParams).then(response => {
        this.zjbjList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        nbxh: null,
        wlnbxh: null,
        wlbm: null,
        wlmc: null,
        dccz: null,
        dcxh: null,
        gysmc: null,
        gysxh: null,
        sl: null,
        dj: null,
        jjgdj: null,
        rmdj: null,
        plmdj: null,
        mjf: null,
        bjr: null,
        bjrq: null,
        bz: null,
        cjsj: null,
        cjrxh: null,
        cjrxm: null,
        bgsj: null,
        bgrxh: null,
        bgrxm: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.nbxh)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加组件报价";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const nbxh = row.nbxh || this.ids
      getZjbj(nbxh).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改组件报价";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.nbxh != null) {
            updateZjbj(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addZjbj(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const nbxhs = row.nbxh || this.ids;
      this.$modal.confirm('是否确认删除组件报价编号为"' + nbxhs + '"的数据项？').then(function () {
        return delZjbj(nbxhs);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('zjbj/zjbj/export', {
        ...this.queryParams
      }, `zjbj_${new Date().getTime()}.xlsx`)
    },
    /**物料信息弹窗 */
    wlxxTc() {
      this.dialogWlxx = true
    },
    /**父子传值 */
    fclick(a) {
      this.dialogWlxx = false
      if (a[0]) {
        this.form.wlbm = a[0].wlbh
        this.form.wlmc = a[0].wlmc
        this.form.wlnbxh = a[0].nbxh
        this.form.dccz = a[0].dccz
        this.form.dcxh = a[0].dcxh
      } else {
        this.form.wlbm = a.wlbh
        this.form.wlmc = a.wlmc
        this.form.wlnbxh = a.nbxh
        this.form.dccz = a.dccz
        this.form.dcxh = a.dcxh
      }

    },
    //选择单价
    handleRadioChange(value) {
      console.log('当前选中的Radio label值为：', value);
      // 在这里可以执行更多的逻辑radio40
      let rowIndex = value.charAt(6);//行序号
      let columnIndex = value.charAt(5);//列序号
      console.log("行号：" + rowIndex + "," + "列号：" + columnIndex);
      let dj = '';
      if (columnIndex == 1) {
        dj = this.zjbjList[rowIndex].dj
      } else if (columnIndex == 2) {
        dj = this.zjbjList[rowIndex].jjgdj
      } else if (columnIndex == 3) {
        dj = this.zjbjList[rowIndex].rmdj
      } else {
        dj = this.zjbjList[rowIndex].plmdj
      }
      let mjf = this.zjbjList[rowIndex].mjf
      let shbl = this.zjbjList[rowIndex].shbl
      console.log("选择单价：" + dj);
      this.selectDj.dj = dj;
      this.selectDj.mjf = mjf;
      this.selectDj.shbl = shbl;
      this.selectDj.rowXh = this.rowXh;
      console.log("selectDj:" + this.selectDj);
      this.radio = '';
      this.$emit('zjbjclick', this.selectDj);

    },
    on(){
      this.$emit('zjbjclick', "");
    }
  }
};
</script>
