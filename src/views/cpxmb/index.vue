<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="项目编码" prop="xmbm">
        <el-input v-model="queryParams.xmbm" placeholder="请输入项目编码" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="项目名称" prop="xmmc">
        <el-input v-model="queryParams.xmmc" placeholder="请输入项目名称" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="型号" prop="dcxh">
        <el-input v-model="queryParams.dcxh" placeholder="请输入型号" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="客户编码" prop="khbm">
        <el-input v-model="queryParams.khbm" placeholder="请输入客户编码" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="客户型号" prop="khxh">
        <el-input v-model="queryParams.khxh" placeholder="请输入客户型号" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="项目类型" prop="xmlx">
        <el-input v-model="queryParams.xmlx" placeholder="请输入项目类型" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="组件型号" prop="zjxh">
        <el-input v-model="queryParams.zjxh" placeholder="请输入组件型号" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
          v-hasPermi="['cpxmb:cpxmb:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['cpxmb:cpxmb:edit']">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['cpxmb:cpxmb:remove']">删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
          v-hasPermi="['cpxmb:cpxmb:export']">导出</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="kkxbjTc"
          v-hasPermi="['cpxmb:cpxmb:edit']">可靠性验证报价</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="cpbjTc"
          v-hasPermi="['cpxmb:cpxmb:edit']">创建报价单</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="cpxmbList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="项目序号" align="center" prop="nbxh" />
      <!-- <el-table-column label="项目编码" align="center" prop="xmbm" /> -->
      <el-table-column label="项目名称" align="center" prop="xmmc" />
      <el-table-column label="型号" align="center" prop="dcxh" />
      <el-table-column label="材质" align="center" prop="dccz" />
      <el-table-column label="客户编码" align="center" prop="khbm" />
      <el-table-column label="客户料号" align="center" prop="khxh" />
      <el-table-column label="项目类型" align="center" prop="xmlx" />
      <el-table-column label="数量" align="center" prop="sl" />
      <el-table-column label="组件型号" align="center" prop="zjxh" />
      <el-table-column label="创建人" align="center" prop="cjrxm" />
      <el-table-column label="创建时间" align="center" prop="cjsj">
        <template slot-scope="scope">
          <div>
            {{ ((scope.row.cjsj) == null ? "" : (scope.row.cjsj).substring(0, 8)) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="修改人" align="center" prop="xgrxm" />
      <el-table-column label="修改时间" align="center" prop="xgsj" value-format="yyyyMMdd">
        <template slot-scope="scope">
          <div>
            {{ ((scope.row.xgsj) == null ? "" : (scope.row.xgsj).substring(0, 8)) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['cpxmb:cpxmb:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['cpxmb:cpxmb:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改项目信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="1000px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row :gutter="20">
          <!-- <el-col :span="8">
            <el-form-item label="项目编码" prop="xmbm">
              <el-input v-model="form.xmbm" placeholder="请输入项目编码" />
            </el-form-item>
          </el-col> -->
          <el-col :span="16">
            <el-form-item label="项目名称" prop="xmmc">
              <el-input v-model="form.xmmc" placeholder="请输入项目名称" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="型号" prop="dcxh">
              <el-input v-model="form.dcxh" placeholder="请输入型号">
                <el-button slot="append" icon="el-icon-search" @click="wlxxTc"></el-button>
              </el-input>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="客户编码" prop="khbm">
              <el-input v-model="form.khbm" placeholder="请输入客户编码" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="数量" prop="sl">
              <el-input v-model="form.sl" placeholder="请输入数量" type="number"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="材质" prop="dccz">
              <el-input v-model="form.dccz" placeholder="请输入材质" disabled/>
            </el-form-item>
          </el-col>


        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="客户料号" prop="khxh">
              <el-input v-model="form.khxh" placeholder="请输入客户料号" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目类型" prop="xmlx">
              <el-input v-model="form.xmlx" placeholder="请输入项目类型" />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="组件型号" prop="zjxh">
              <el-input v-model="form.zjxh" placeholder="请输入组件型号" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <wlxx @fclick="fclick" :dialogWlxx="dialogWlxx" ></wlxx>
    <cpbj @bjclick="bjclick" :dialogCpbj="dialogCpbj" :formData="formData"></cpbj>
    <kkxbj @kkxbjclick="kkxbjclick" :dialogKkxbj="dialogKkxbj" :kkxbjData="kkxbjData"></kkxbj>
  </div>
</template>

<script>
import { listCpxmb, getCpxmb, delCpxmb, addCpxmb, updateCpxmb } from "@/api/cpxmb/cpxmb";
import wlxx from "@/views/bom/wlxxTc.vue";
import cpbj from "@/views/cpxmb/cpbjdTc.vue";
import kkxbj from "@/views/cpxmb/kkxbjTc.vue";
export default {
  components: {
    wlxx,cpbj,kkxbj
  },
  name: "Cpxmb",
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
      // 项目信息表格数据
      cpxmbList: [],
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
        wlnbxh: null,
        dccz: null,
        khbm: null,
        khxh: null,
        xmlx: null,
        sl: null,
        zjxh: null,
        cjrxh: null,
        cjrxm: null,
        cjsj: null,
        xgrxh: null,
        bgrxm: null,
        xgsj: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        xmmc: [
          { required: true, message: "项目名称不能为空", trigger: "blur" }
        ],
        dcxh: [
          { required: true, message: "型号不能为空", trigger: "blur" }
        ],
        khbm: [
          { required: true, message: "客户编码不能为空", trigger: "blur" }
        ],
        sl: [
          { required: true, message: "数量不能为空", trigger: "blur" }
        ],
      },
      dialogWlxx: false,
      dialogCpbj: false,
      dialogKkxbj: false,
      formData:{},
      kkxbjData:{}
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询项目信息列表 */
    getList() {
      this.loading = true;
      listCpxmb(this.queryParams).then(response => {
        this.cpxmbList = response.rows;
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
        wlnbxh: null,
        dccz: null,
        khbm: null,
        khxh: null,
        xmlx: null,
        sl: null,
        zjxh: null,
        cjrxh: null,
        cjrxm: null,
        cjsj: null,
        xgrxh: null,
        bgrxm: null,
        xgsj: null
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
      this.title = "添加项目信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const nbxh = row.nbxh || this.ids
      getCpxmb(nbxh).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改项目信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.nbxh != null) {
            updateCpxmb(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCpxmb(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除项目信息编号为"' + nbxhs + '"的数据项？').then(function () {
        return delCpxmb(nbxhs);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('cpxmb/cpxmb/export', {
        ...this.queryParams
      }, `cpxmb_${new Date().getTime()}.xlsx`)
    },
    wlxxTc() {
      this.dialogWlxx = true
    },
    fclick(a) {
      this.dialogWlxx = false
      if (a[0]) {
        this.form.dcxh = a[0].dcxh
        this.form.dccz = a[0].dccz
        this.form.wlnbxh = a[0].nbxh
      } else {
        this.form.dcxh = a.dcxh
        this.form.dccz = a.dccz
        this.form.wlnbxh = a.nbxh
      }

    },
    cpbjTc(row) {
      
      const nbxh = row.nbxh || this.ids
      console.log(nbxh);
      getCpxmb(nbxh).then(response => {
        this.formData = response.data;
        this.dialogCpbj = true;
        console.log(this.formData);
      });
    },

    bjclick(a){
      this.dialogCpbj = false
    },

    kkxbjTc(row){
      const nbxh = row.nbxh || this.ids
      console.log(nbxh);
      getCpxmb(nbxh).then(response => {
        this.kkxbjData = response.data;
        this.dialogKkxbj = true;
        console.log(this.kkxbjData);
      });
    },

    kkxbjclick(a){
      this.dialogKkxbj = false
    },

  }
};
</script>
