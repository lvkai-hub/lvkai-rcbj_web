<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="bom类型" prop="bomlx" label-width="70px">
        <el-input v-model="queryParams.bomlx" placeholder="请输入bom类型" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="bom状态" prop="zt" label-width="70px">
        <el-input v-model="queryParams.zt" placeholder="请输入bom状态" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="物料编号" prop="wlbh">
        <el-input v-model="queryParams.wlbh" placeholder="请输入物料编号" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="物料名称" prop="wlmc">
        <el-input v-model="queryParams.wlmc" placeholder="请输入物料名称" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
          v-hasPermi="['bom:bom:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['bom:bom:edit']">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['bom:bom:remove']">删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
          v-hasPermi="['bom:bom:export']">导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="bomList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />

      <el-table-column label="物料编号" align="center" prop="wlbh" />
      <el-table-column label="物料名称" align="center" prop="wlmc" />
      <el-table-column label="bom类型" align="center" prop="bomlx">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.bomlx" :value="scope.row.bomlx" />
        </template>
      </el-table-column>
      <el-table-column label="bom用途" align="center" prop="bomyt" />
      <el-table-column label="基数" align="center" prop="js" />
      <el-table-column label="备注" align="center" prop="bz" />
      <!-- <el-table-column label="物料内部序号" align="center" prop="wlnbxh" /> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['bom:bom:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['bom:bom:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改BOM对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="1000px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="物料编号" prop="wlbh">
              <el-input v-model="form.wlbh" placeholder="请输入物料编号" :readonly="true">
                <el-button slot="append" icon="el-icon-search" @click="wlxxTc"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="物料名称" prop="wlmc">
              <el-input v-model="form.wlmc" placeholder="请输入物料名称" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="bom类型" prop="bomlx">
              <el-select v-model="form.bomlx" placeholder="请选择BOM类型" clearable>
                <el-option v-for="dict in dict.type.bomlx" :key="dict.value" :label="dict.label" :value="dict.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="bom用途" prop="bomyt">
              <el-input v-model="form.bomyt" placeholder="请输入bom用途" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="基数" prop="js">
              <el-input v-model="form.js" placeholder="请输入基数" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="备注" prop="bz">
              <el-input v-model="form.bz" placeholder="请输入备注" :autosize="{ minRows: 1, maxRows: 4 }" type="textarea" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider content-position="center">bom明细信息</el-divider>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddWlxxTc">添加</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDeleteBomXb">删除</el-button>
          </el-col>
        </el-row>
        <el-table :data="bomXbList" :row-class-name="rowBomXbIndex" @selection-change="handleBomXbSelectionChange"
          ref="bomXb">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column label="序号" align="center" prop="index" width="50" />
          <el-table-column label="物料编码" prop="wlbm" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.wlbm" placeholder="请输入物料编码" disabled />
            </template>
          </el-table-column>
          <el-table-column label="物料名称" prop="wlmc" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.wlmc" placeholder="请输入物料名称" disabled />
            </template>
          </el-table-column>
          <el-table-column label="类别" prop="wllb" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.wllb" placeholder="请输入物料类别" disabled />
            </template>
          </el-table-column>
          <el-table-column label="型号" prop="xh" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.xh" placeholder="请输入型号" disabled />
            </template>
          </el-table-column>
          <el-table-column label="数量" prop="sl" width="150" :render-header="renderHeader">
            <template slot-scope="scope">
              <el-input v-model="scope.row.sl" placeholder="请输入数量" type="number"/>
            </template>
          </el-table-column>
          <el-table-column label="采购料号" prop="cglh" width="200">
            <template slot-scope="scope">
              <el-input v-model="scope.row.cglh" placeholder="请输入采购料号" />
            </template>
          </el-table-column>
          <el-table-column label="类型" prop="lx" width="200">
            <template slot-scope="scope">
              <el-select v-model="scope.row.lx" placeholder="请选择类型" filterable style="width: 120px" disabled>
                <el-option v-for="dict in dict.type.wllx" :key="dict.value" :label="dict.label" :value="dict.value" />
              </el-select>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <wlxx @fclick="fclick" :dialogWlxx="dialogWlxx"></wlxx>
    <WlxxTc @Tcclick="Tcclick" :dialogWlxxdx="dialogWlxxdx"></WlxxTc>
  </div>
</template>

<script>
import { listBom, getBom, delBom, addBom, updateBom } from "@/api/bom/bom";
import wlxx from "@/views/bom/wlxxTc.vue"
import WlxxTc from "@/views/bom/wlxxTcdx.vue"
export default {
  components: {
    wlxx,
    WlxxTc
  },
  name: "Bom",
  dicts: ['bomlx', 'wllx'],
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 子表选中数据
      checkedBomXb: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // BOM表格数据
      bomList: [],
      // bom明细表格数据
      bomXbList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        bomlx: null,
        bomyt: null,
        js: null,
        bz: null,
        zt: null,
        wlbh: null,
        wlmc: null,
        wlnbxh: null,
        cjsj: null,
        cjrxh: null,
        cjrxm: null,
        xgsj: null,
        xgrxh: null,
        bgrxm: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        wlbh: [{ required: true, message: '请输入物料编号', trigger: 'blur' }],
        wlmc: [{ required: true, message: '请输入物料名称', trigger: 'blur' }],
        bomlx: [{ required: true, message: '请选择bom类型', trigger: 'blur' }]
      },
      dialogWlxx: false,
      dialogWlxxdx: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询BOM列表 */
    getList() {
      this.loading = true;
      listBom(this.queryParams).then(response => {
        this.bomList = response.rows;
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
        bomlx: null,
        bomyt: null,
        js: null,
        bz: null,
        zt: null,
        wlbh: null,
        wlmc: null,
        wlnbxh: null,
        cjsj: null,
        cjrxh: null,
        cjrxm: null,
        xgsj: null,
        xgrxh: null,
        bgrxm: null
      };
      this.bomXbList = [];
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
      this.title = "添加BOM";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const nbxh = row.nbxh || this.ids
      getBom(nbxh).then(response => {
        this.form = response.data;
        this.bomXbList = response.data.bomXbList;
        this.open = true;
        this.title = "修改BOM";
      });
    },
    //表头文本后面加红星
    renderHeader(cerateElement, { column }) {
      return cerateElement("div", [
        cerateElement("span", column.label),
        cerateElement("span", {
          domProps: {
            innerHTML: "*"
          },
          style: {
            color: "red",
            fontSize: "16px",
            marginLeft: "5px"
          }
        })
      ]);
    },

    /** 提交按钮 */
    submitForm() {
      var result = true
      var message = []
      this.bomXbList.forEach((item, index) => {
        let no = index + 1
        console.log("数量："+item.sl);
        if (item.sl === '0' || !item.sl) {
          result = result && false
          console.log("结果："+result);
          message.push('第' + no + '行：数量不能为空或0！')
        }
      })
      if (!result) {
        var temp = '';
        message.forEach(v => {
          temp += `<li>${v}</li>`;
        })
        return this.$notify({
          title: '提示',
          dangerouslyUseHTMLString: true,
          type: 'warning',
          duration: 2000,
          message: `<ul>${temp}</ul>`
        });
      } else {
        this.$refs["form"].validate(valid => {
          if (valid) {
            this.form.bomXbList = this.bomXbList;
            if (this.form.nbxh != null) {
              updateBom(this.form).then(response => {
                this.$modal.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              });
            } else {
              addBom(this.form).then(response => {
                this.$modal.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              });
            }
          }
        });
      }

    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const nbxhs = row.nbxh || this.ids;
      this.$modal.confirm('是否确认删除BOM编号为"' + nbxhs + '"的数据项？').then(function () {
        return delBom(nbxhs);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
    },
    /** bom明细序号 */
    rowBomXbIndex({ row, rowIndex }) {
      row.index = rowIndex + 1;
    },
    /**添加跳出弹窗 */
    handleAddWlxxTc() {
      console.log("我被触发了");
      this.dialogWlxxdx = true
    },
    /** bom明细添加按钮操作 */
    handleAddBomXb(e) {
      console.log(e);
      let obj = {};
      // obj.wlbm = "";
      obj.wlbm = e.wlbh;
      // obj.wlmc = "";
      obj.wlmc = e.wlmc;
      obj.xh = e.dcxh;
      obj.sl = "";
      obj.cglh = "";
      obj.cpwlh = "";
      obj.cpnbxh = "";
      obj.cjrxh = "";
      obj.cjrxm = "";
      obj.cjsj = "";
      obj.xgrxh = "";
      obj.bgrxm = "";
      obj.xgsj = "";
      obj.lx = e.lx;
      obj.wllb = e.wllb
      this.bomXbList.push(obj);
    },
    /** bom明细删除按钮操作 */
    handleDeleteBomXb() {
      if (this.checkedBomXb.length == 0) {
        this.$modal.msgError("请先选择要删除的bom明细数据");
      } else {
        const bomXbList = this.bomXbList;
        const checkedBomXb = this.checkedBomXb;
        this.bomXbList = bomXbList.filter(function (item) {
          return checkedBomXb.indexOf(item.index) == -1
        });
      }
    },
    /** 复选框选中数据 */
    handleBomXbSelectionChange(selection) {
      this.checkedBomXb = selection.map(item => item.index)
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('bom/bom/export', {
        ...this.queryParams
      }, `bom_${new Date().getTime()}.xlsx`)
    },
    /**物料信息弹窗 */
    wlxxTc() {
      this.dialogWlxx = true
    },
    /**父子传值 */
    fclick(a) {
      this.dialogWlxx = false
      if (a[0]) {
        this.form.wlbh = a[0].wlbh
        this.form.wlmc = a[0].wlmc
        this.form.wlnbxh = a[0].nbxh
      } else {
        this.form.wlbh = a.wlbh
        this.form.wlmc = a.wlmc
        this.form.wlnbxh = a.nbxh
      }

    },
    Tcclick(a) {
      a.forEach(e => {
        this.handleAddBomXb(e)
      });
      this.dialogWlxxdx = false
    }
  }
};
</script>
