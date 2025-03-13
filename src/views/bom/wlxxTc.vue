<template>
  <div class="app-container">
    <el-dialog title="物料信息" :visible.sync="dialogWlxx" width="80%" :close-on-click-modal="false" :show-close='false'>
      <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
        <el-form-item label="物料名称" prop="wlmc">
          <el-input v-model="queryParams.wlmc" placeholder="请输入物料名称" clearable @keyup.enter.native="handleQuery" />
        </el-form-item>
        <el-form-item label="型号" prop="dcxh">
          <el-input v-model="queryParams.dcxh" placeholder="请输入型号" clearable @keyup.enter.native="handleQuery" />
        </el-form-item>
        <el-form-item label="材质" prop="dccz">
          <el-input v-model="queryParams.dccz" placeholder="请输入材质" clearable @keyup.enter.native="handleQuery" />
        </el-form-item>
        <el-form-item label="SAP" prop="sapbm">
          <el-input v-model="queryParams.sapbm" placeholder="请输入SAP编码" clearable @keyup.enter.native="handleQuery" />
        </el-form-item>
        <el-form-item label="单位" prop="dw">
          <el-input v-model="queryParams.dw" placeholder="请输入单位" clearable @keyup.enter.native="handleQuery" />
        </el-form-item>
        <el-form-item label="类型" prop="lx">
          <el-input v-model="queryParams.lx" placeholder="请输入类型" clearable @keyup.enter.native="handleQuery" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="loading" :data="wlxxList" @selection-change="handleSelectionChange"
        @cell-dblclick="dblclick">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="物料编号" align="center" prop="wlbh" />
        <el-table-column label="物料名称" align="center" prop="wlmc" />
        <el-table-column label="型号" align="center" prop="dcxh" />
        <el-table-column label="类别" align="center" prop="wllb" />
        <el-table-column label="材质" align="center" prop="dccz" />
        <!-- <el-table-column label="附件" align="center" prop="fj" /> -->
        <el-table-column label="SAP编码" align="center" prop="sapbm" />
        <el-table-column label="单位" align="center" prop="dw" />
        <el-table-column label="类型" align="center" prop="lx">
          <template slot-scope="scope">
            <dict-tag :options="dict.type.wllx" :value="scope.row.lx" />
          </template>
        </el-table-column>
        <el-table-column label="创建人" align="center" prop="cjrxm" />
        <el-table-column label="创建时间" align="center" prop="cjsj" />
        <el-table-column label="修改人" align="center" prop="xgrxm" />
        <el-table-column label="修改时间" align="center" prop="xgsj" />
        <el-table-column label="备注" align="center" prop="bz" />
      </el-table>
      <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
        @pagination="getList" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="no">取 消</el-button>
        <el-button type="primary" @click="no">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { listWlxx, getWlxx, delWlxx, addWlxx, updateWlxx } from "@/api/wlxx/wlxx";
export default {
  name: "WlxxTc",
  dicts: ['wllx'],
  props: ['dialogWlxx'],
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
      // 物料信息表格数据
      wlxxList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        wlmc: null,
        dcxh: null,
        dccz: null,
        fj: null,
        sapbm: null,
        dw: null,
        lx: null,
        cjrxh: null,
        cjsj: null,
        xgrxh: null,
        xgsj: null,
        bz: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
      wlxz: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询物料信息列表 */
    getList() {
      this.loading = true;
      listWlxx(this.queryParams).then(response => {
        this.wlxxList = response.rows;
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
        wlbh: null,
        wlmc: null,
        dcxh: null,
        dccz: null,
        fj: null,
        sapbm: null,
        dw: null,
        lx: null,
        cjrxh: null,
        cjsj: null,
        xgrxh: null,
        xgsj: null,
        bz: null
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
      if (selection.length > 1) {
        this.$modal.msgError("请选择一条");
      }
      this.wlxz = selection
      this.ids = selection.map(item => item.nbxh)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加物料信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const nbxh = row.nbxh || this.ids
      getWlxx(nbxh).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改物料信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.nbxh != null) {
            updateWlxx(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addWlxx(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除物料信息编号为"' + nbxhs + '"的数据项？').then(function () {
        return delWlxx(nbxhs);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('wlxx/wlxx/export', {
        ...this.queryParams
      }, `wlxx_${new Date().getTime()}.xlsx`)
    },
    no() {
      this.$emit('fclick', this.wlxz)
    },
    dblclick(row) {
      console.log(row);
      this.$emit('fclick', row)
    }
  }
};
</script>
