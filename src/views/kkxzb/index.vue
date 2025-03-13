<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <!-- <el-form-item label="项目编码" prop="xmbm">
        <el-input v-model="queryParams.xmbm" placeholder="请输入项目编码" clearable @keyup.enter.native="handleQuery" />
      </el-form-item> -->
      <el-form-item label="项目名称" prop="xmmc">
        <el-input v-model="queryParams.xmmc" placeholder="请输入项目名称" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="型号" prop="dcxh">
        <el-input v-model="queryParams.dcxh" placeholder="请输入东磁型号" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <!-- <el-form-item label="客户编码" prop="khbm">
        <el-input v-model="queryParams.khbm" placeholder="请输入客户编码" clearable @keyup.enter.native="handleQuery" />
      </el-form-item> -->
      <el-form-item label="客户料号" prop="khxh">
        <el-input v-model="queryParams.khxh" placeholder="请输入客户料号" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <!-- <el-form-item label="项目类型" prop="xmlx">
        <el-input v-model="queryParams.xmlx" placeholder="请输入项目类型" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="组件型号" prop="zjxh">
        <el-input v-model="queryParams.zjxh" placeholder="请输入组件型号" clearable @keyup.enter.native="handleQuery" />
      </el-form-item> -->
      <el-form-item label="备注" prop="bz">
        <el-input v-model="queryParams.bz" placeholder="请输入备注" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <!-- <el-form-item label="创建人序号" prop="cjrxh">
        <el-input v-model="queryParams.cjrxh" placeholder="请输入创建人序号" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="创建人姓名" prop="cjrxm">
        <el-input v-model="queryParams.cjrxm" placeholder="请输入创建人姓名" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="创建时间" prop="cjsj">
        <el-input v-model="queryParams.cjsj" placeholder="请输入创建时间" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="修改人序号" prop="bgrxh">
        <el-input v-model="queryParams.bgrxh" placeholder="请输入修改人序号" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="修改人姓名" prop="bgrxm">
        <el-input v-model="queryParams.bgrxm" placeholder="请输入修改人姓名" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="修改时间" prop="bgsj">
        <el-input v-model="queryParams.bgsj" placeholder="请输入修改时间" clearable @keyup.enter.native="handleQuery" />
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
          v-hasPermi="['kkxzb:kkxzb:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['kkxzb:kkxzb:edit']">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['kkxzb:kkxzb:remove']">删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
          v-hasPermi="['kkxzb:kkxzb:export']">导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="kkxzbList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="验证序号" align="center" prop="nbxh" />
      <!-- <el-table-column label="项目编码" align="center" prop="xmbm" /> -->
      <el-table-column label="项目名称" align="center" prop="xmmc" />
      <el-table-column label="型号" align="center" prop="dcxh" />
      <!-- <el-table-column label="客户编码" align="center" prop="khbm" /> -->
      <el-table-column label="客户料号" align="center" prop="khxh" />
      <el-table-column label="总价" align="center" prop="zj" />
      <!-- <el-table-column label="项目类型" align="center" prop="xmlx" /> -->
      <!-- <el-table-column label="组件型号" align="center" prop="zjxh" /> -->
      <el-table-column label="备注" align="center" prop="bz" />
      <!-- <el-table-column label="创建人序号" align="center" prop="cjrxh" /> -->
      <el-table-column label="创建人" align="center" prop="cjrxm" />
      <el-table-column label="创建时间" align="center" prop="cjsj">
        <template slot-scope="scope">
          <div>
            {{ ((scope.row.cjsj) == null ? "" : (scope.row.cjsj).substring(0, 8)) }}
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column label="修改人序号" align="center" prop="bgrxh" />
      <el-table-column label="修改人姓名" align="center" prop="bgrxm" />
      <el-table-column label="修改时间" align="center" prop="bgsj" /> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['kkxzb:kkxzb:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['kkxzb:kkxzb:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改可靠性报价对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="1300px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="项目名称" prop="xmmc">
              <el-input v-model="form.xmmc" placeholder="请输入项目名称" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="型号" prop="dcxh">
              <el-input v-model="form.dcxh" placeholder="请输入型号" :readonly="true">
                <el-button slot="append" icon="el-icon-search" @click="cpxmTc"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="客户料号" prop="khxh">
              <el-input v-model="form.khxh" placeholder="请输入客户料号" disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="总价" prop="zj">
              <el-input v-model="form.zj" placeholder="请输入总价" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="18">
            <el-form-item label="备注" prop="bz">
              <el-input v-model="form.bz" placeholder="请输入备注" :autosize="{ minRows: 1, maxRows: 4 }" type="textarea" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-form-item label="项目编码" prop="xmbm">
          <el-input v-model="form.xmbm" placeholder="请输入项目编码" />
        </el-form-item>
        <el-form-item label="东磁型号" prop="dcxh">
          <el-input v-model="form.dcxh" placeholder="请输入东磁型号" />
        </el-form-item>
        <el-form-item label="客户编码" prop="khbm">
          <el-input v-model="form.khbm" placeholder="请输入客户编码" />
        </el-form-item>
        <el-form-item label="客户型号" prop="khxh">
          <el-input v-model="form.khxh" placeholder="请输入客户型号" />
        </el-form-item>
        <el-form-item label="项目类型" prop="xmlx">
          <el-input v-model="form.xmlx" placeholder="请输入项目类型" />
        </el-form-item>
        <el-form-item label="组件型号" prop="zjxh">
          <el-input v-model="form.zjxh" placeholder="请输入组件型号" />
        </el-form-item>
        <el-form-item label="备注" prop="bz">
          <el-input v-model="form.bz" placeholder="请输入备注" />
        </el-form-item> -->
        <el-divider content-position="center">可靠性报价信息</el-divider>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddKkxbj">添加</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDeleteKkxbj">删除</el-button>
          </el-col>
        </el-row>
        <el-table :data="kkxbjList" :row-class-name="rowKkxbjIndex" @selection-change="handleKkxbjSelectionChange"
          ref="kkxbj" :summary-method="getSummaries" show-summary>
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column label="序号" align="center" prop="index" width="50" />
          <!-- <el-table-column label="项目内部序号" prop="xmnbxh" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.xmnbxh" placeholder="请输入项目内部序号" />
            </template>
          </el-table-column>
          <el-table-column label="项目编码" prop="xmbm" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.xmbm" placeholder="请输入项目编码" />
            </template>
          </el-table-column>
          <el-table-column label="项目名称" prop="xmmc" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.xmmc" placeholder="请输入项目名称" />
            </template>
          </el-table-column>
          <el-table-column label="东磁型号" prop="dcxh" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.dcxh" placeholder="请输入东磁型号" />
            </template>
          </el-table-column>
          <el-table-column label="客户编码" prop="khbm" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.khbm" placeholder="请输入客户编码" />
            </template>
          </el-table-column>
          <el-table-column label="数量" prop="sl" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.sl" placeholder="请输入数量" />
            </template>
          </el-table-column>
          <el-table-column label="客户型号" prop="khxh" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.khxh" placeholder="请输入客户型号" />
            </template>
          </el-table-column>
          <el-table-column label="项目类型" prop="xmlx" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.xmlx" placeholder="请输入项目类型" />
            </template>
          </el-table-column>
          <el-table-column label="组件型号" prop="zjxh" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.zjxh" placeholder="请输入组件型号" />
            </template>
          </el-table-column> -->
          <el-table-column label="试验项目" prop="syxm" width="150">
            <template slot-scope="scope">
              <!-- <el-input v-model="scope.row.syxm" placeholder="请输入试验项目" /> -->
              <el-select v-model="scope.row.syxm" placeholder="请选择试验项目" clearable filterable>
                <el-option v-for="dict in dict.type.syxm" :key="dict.value" :label="dict.label" :value="dict.value" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="试验时长" prop="sysc" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.sysc" placeholder="请输入试验时长" type="number" @input="jsPc(scope.row)" />
            </template>
          </el-table-column>
          <el-table-column label="试验单价" prop="sydj" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.sydj" placeholder="请输入试验单价" type="number" @input="jsPc(scope.row)" />
            </template>
          </el-table-column>
          <el-table-column label="试验数量" prop="sysl" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.sysl" placeholder="请输入试验数量" type="number" @input="jsPc(scope.row)" />
            </template>
          </el-table-column>
          <el-table-column label="每批数量" prop="mpsl" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.mpsl" placeholder="请输入每批数量" type="number" @input="jsPc(scope.row)" />
            </template>
          </el-table-column>
          <el-table-column label="批次" prop="pc" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.pc" placeholder="请输入批次" type="number" />
            </template>
          </el-table-column>
          <el-table-column label="试验费用" prop="syfy" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.syfy" placeholder="请输入试验费用" type="number" />
            </template>
          </el-table-column>
          <el-table-column label="备注" prop="bz" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.bz" placeholder="请输入备注" />
            </template>
          </el-table-column>
          <!-- <el-table-column label="创建人序号" prop="cjrxh" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.cjrxh" placeholder="请输入创建人序号" />
            </template>
          </el-table-column>
          <el-table-column label="创建人姓名" prop="cjrxm" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.cjrxm" placeholder="请输入创建人姓名" />
            </template>
          </el-table-column>
          <el-table-column label="创建时间" prop="cjsj" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.cjsj" placeholder="请输入创建时间" />
            </template>
          </el-table-column>
          <el-table-column label="修改人序号" prop="bgrxh" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.bgrxh" placeholder="请输入修改人序号" />
            </template>
          </el-table-column>
          <el-table-column label="修改人姓名" prop="bgrxm" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.bgrxm" placeholder="请输入修改人姓名" />
            </template>
          </el-table-column>
          <el-table-column label="修改时间" prop="bgsj" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.bgsj" placeholder="请输入修改时间" />
            </template>
          </el-table-column> -->
        </el-table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <cpxmTc @fclick="fclick" :dialogCpxmTc="dialogCpxmTc"></cpxmTc>
  </div>
</template>

<script>
import { listKkxzb, getKkxzb, delKkxzb, addKkxzb, updateKkxzb } from "@/api/kkxzb/kkxzb";
import cpxmTc from "@/views/kkxbj/cpxmTc.vue"

export default {
  components: {
    cpxmTc,
  },
  dicts:['syxm'],
  name: "Kkxzb",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 子表选中数据
      checkedKkxbj: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 可靠性报价表格数据
      kkxzbList: [],
      // 可靠性报价表格数据
      kkxbjList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        xmbm: null,
        xmmc: null,
        dcxh: null,
        khbm: null,
        khxh: null,
        xmlx: null,
        zjxh: null,
        bz: null,
        cjrxh: null,
        cjrxm: null,
        cjsj: null,
        bgrxh: null,
        bgrxm: null,
        bgsj: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
      dialogCpxmTc: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询可靠性报价列表 */
    getList() {
      this.loading = true;
      listKkxzb(this.queryParams).then(response => {
        this.kkxzbList = response.rows;
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
        xmbm: null,
        xmmc: null,
        dcxh: null,
        khbm: null,
        khxh: null,
        xmlx: null,
        zjxh: null,
        bz: null,
        cjrxh: null,
        cjrxm: null,
        cjsj: null,
        bgrxh: null,
        bgrxm: null,
        bgsj: null
      };
      this.kkxbjList = [];
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
      this.title = "添加可靠性报价";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const nbxh = row.nbxh || this.ids
      getKkxzb(nbxh).then(response => {
        this.form = response.data;
        this.kkxbjList = response.data.kkxbjList;
        this.open = true;
        this.title = "修改可靠性报价";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.kkxbjList = this.kkxbjList;
          if (this.form.nbxh != null) {
            updateKkxzb(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addKkxzb(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除可靠性报价编号为"' + nbxhs + '"的数据项？').then(function () {
        return delKkxzb(nbxhs);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
    },
    /** 可靠性报价序号 */
    rowKkxbjIndex({ row, rowIndex }) {
      row.index = rowIndex + 1;
    },
    /** 可靠性报价添加按钮操作 */
    handleAddKkxbj() {
      let obj = {};
      obj.xmnbxh = "";
      obj.xmbm = "";
      obj.xmmc = "";
      obj.dcxh = "";
      obj.khbm = "";
      obj.sl = "";
      obj.khxh = "";
      obj.xmlx = "";
      obj.zjxh = "";
      obj.syxm = "";
      obj.sysc = "";
      obj.sydj = "";
      obj.sysl = "";
      obj.mpsl = "";
      obj.pc = "";
      obj.syfy = "";
      obj.bz = "";
      obj.cjrxh = "";
      obj.cjrxm = "";
      obj.cjsj = "";
      obj.bgrxh = "";
      obj.bgrxm = "";
      obj.bgsj = "";
      this.kkxbjList.push(obj);
    },
    /** 可靠性报价删除按钮操作 */
    handleDeleteKkxbj() {
      if (this.checkedKkxbj.length == 0) {
        this.$modal.msgError("请先选择要删除的可靠性报价数据");
      } else {
        const kkxbjList = this.kkxbjList;
        const checkedKkxbj = this.checkedKkxbj;
        this.kkxbjList = kkxbjList.filter(function (item) {
          return checkedKkxbj.indexOf(item.index) == -1
        });
      }
    },
    /** 复选框选中数据 */
    handleKkxbjSelectionChange(selection) {
      this.checkedKkxbj = selection.map(item => item.index)
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('kkxzb/kkxzb/export', {
        ...this.queryParams
      }, `kkxzb_${new Date().getTime()}.xlsx`)
    },
    /**成品项目弹窗 */
    cpxmTc() {
      this.dialogCpxmTc = true
    },
    fclick(a) {
      this.dialogCpxmTc = false
      console.log(a[0]);
      if (a[0]) {
        this.form.xmbm = a[0].xmbm
        this.form.xmmc = a[0].xmmc
        this.form.dcxh = a[0].dcxh
        this.form.khxh = a[0].khxh
        this.form.sl = a[0].sl
        this.form.xmnbxh = a[0].nbxh
      } else {
        this.form.xmbm = a.xmbm
        this.form.xmmc = a.xmmc
        this.form.dcxh = a.dcxh
        this.form.khxh = a.khxh
        this.form.sl = a.sl
        this.form.xmnbxh = a.nbxh
      }
    },
    jsPc(row) {
      if (row.sysl && row.mpsl) {
        if (row.mpsl == 0) {
          this.$modal.msg("每批数量不能为0");
          row.mpsl = "";
          row.pc = "";
          row.syfy = "";
        } else {
          row.pc = row.sysl / row.mpsl
          row.syfy = row.sysc * row.sydj * row.pc
          let zj = 0
          this.kkxbjList.forEach(e => {
            if (e.syfy) {
              zj = zj + e.syfy
            }
          });
          this.form.zj = zj
        }
      }
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 7) {
          sums[index] = '总价';
          return;
        }
        if (index === 8) {
          const values = data.map(item => Number(item['syfy']));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
          } else {
            sums[index] = 'N/A';
          }
        }
        //不是目标的列不添加任何内容
        else { sums[index] = ''; }
      });

      return sums;
    }
  }
};
</script>
