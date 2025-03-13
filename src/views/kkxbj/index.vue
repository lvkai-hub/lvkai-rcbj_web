<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="项目名称" prop="xmmc">
        <el-input v-model="queryParams.xmmc" placeholder="请输入项目名称" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="型号" prop="dcxh">
        <el-input v-model="queryParams.dcxh" placeholder="请输入型号" clearable @keyup.enter.native="handleQuery" />
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
      <el-form-item label="试验项目" prop="syxm">
        <el-input v-model="queryParams.syxm" placeholder="请输入试验项目" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
          v-hasPermi="['yzbj:kkxbj:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['yzbj:kkxbj:edit']">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['yzbj:kkxbj:remove']">删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
          v-hasPermi="['yzbj:kkxbj:export']">导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="kkxbjList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="项目名称" align="center" prop="xmmc" />
      <el-table-column label="型号" align="center" prop="dcxh" />
      <el-table-column label="客户料号" align="center" prop="khxh" />
      <el-table-column label="数量" align="center" prop="sl" />
      <el-table-column label="项目类型" align="center" prop="xmlx" />
      <el-table-column label="组件型号" align="center" prop="zjxh" />
      <el-table-column label="试验项目" align="center" prop="syxm" />
      <el-table-column label="试验时长" align="center" prop="sysc" />
      <el-table-column label="试验单价" align="center" prop="sydj" />
      <el-table-column label="试验数量" align="center" prop="sysl" />
      <el-table-column label="每批数量" align="center" prop="mpsl" />
      <el-table-column label="批次" align="center" prop="pc" />
      <el-table-column label="试验费用" align="center" prop="syfy" />
      <el-table-column label="备注" align="center" prop="bz" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['yzbj:kkxbj:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['yzbj:kkxbj:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改可靠性报价对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="1000px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row :gutter="20">
          <!-- <el-col :span="6">
            <el-form-item label="项目编码" prop="xmbm">
              <el-input v-model="form.xmbm" placeholder="请输入项目编码">
                <el-button slot="append" icon="el-icon-search" @click="cpxmTc"></el-button>
              </el-input>
            </el-form-item>
          </el-col> -->
          <el-col :span="12">
            <el-form-item label="项目名称" prop="xmmc">
              <el-input v-model="form.xmmc" placeholder="请输入项目名称" disabled/>
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
              <el-input v-model="form.khxh" placeholder="请输入客户料号" disabled/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="数量" prop="xmlx">
              <el-input v-model="form.sl" placeholder="请输入数量" type="number" disabled/>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="6">
            <el-form-item label="项目类型" prop="xmlx">
              <el-input v-model="form.xmlx" placeholder="请输入项目类型" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="组件型号" prop="zjxh">
              <el-input v-model="form.zjxh" placeholder="请输入组件型号" />
            </el-form-item>
          </el-col> -->
          <el-col :span="6">
            <el-form-item label="试验项目" prop="syxm">
              <el-input v-model="form.syxm" placeholder="请输入试验项目" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="试验时长" prop="sysc">
              <el-input v-model="form.sysc" placeholder="请输入试验时长" type="number" @change="jsPc()"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="试验单价" prop="sydj">
              <el-input v-model="form.sydj" placeholder="请输入试验单价" type="number" @change="jsPc()"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">

          <el-col :span="6">
            <el-form-item label="试验数量" prop="sysl">
              <el-input v-model="form.sysl" placeholder="请输入试验数量" type="number" @change="jsPc()"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="每批数量" prop="mpsl">
              <el-input v-model="form.mpsl" placeholder="请输入每批数量" type="number"  @change="jsPc()"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="批次" prop="pc">
              <el-input v-model="form.pc" placeholder="请输入批次" type="number" :readonly="true"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="试验费用" prop="syfy">
              <el-input v-model="form.syfy" placeholder="请输入试验费用" type="number" :readonly="true"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">

          <el-col :span="24">
            <el-form-item label="备注" prop="bz">
              <el-input v-model="form.bz" placeholder="请输入备注" :autosize="{ minRows: 1, maxRows: 4 }" type="textarea" />
            </el-form-item>
          </el-col>
        </el-row>
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
import { listKkxbj, getKkxbj, delKkxbj, addKkxbj, updateKkxbj } from "@/api/yzbj/kkxbj";
import cpxmTc from "@/views/kkxbj/cpxmTc.vue"
export default {
  components: {
    cpxmTc,
  },
  name: "Kkxbj",
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
        syxm: null,
        sysc: null,
        sydj: null,
        sysl: null,
        mpsl: null,
        pc: null,
        syfy: null,
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
        dcxh: [{ required: true, message: '请选择型号', trigger: 'blur' }],
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
      listKkxbj(this.queryParams).then(response => {
        this.kkxbjList = response.rows;
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
        xmnbxh: null,
        xmbm: null,
        xmmc: null,
        dcxh: null,
        khbm: null,
        khxh: null,
        xmlx: null,
        zjxh: null,
        syxm: null,
        sysc: null,
        sydj: null,
        sysl: null,
        mpsl: null,
        pc: null,
        syfy: null,
        bz: null,
        cjrxh: null,
        cjrxm: null,
        cjsj: null,
        bgrxh: null,
        bgrxm: null,
        bgsj: null
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
      this.title = "添加可靠性报价";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const nbxh = row.nbxh || this.ids
      getKkxbj(nbxh).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改可靠性报价";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.nbxh != null) {
            updateKkxbj(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addKkxbj(this.form).then(response => {
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
        return delKkxbj(nbxhs);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('yzbj/kkxbj/export', {
        ...this.queryParams
      }, `kkxbj_${new Date().getTime()}.xlsx`)
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
    jsPc(){
      if (this.form.sysl&&this.form.mpsl){
        if(this.form.mpsl ==0 ){
          this.$modal.msg("每批数量不能为0");
          this.form.mpsl = "";
        }else{
          this.form.pc = this.form.sysl/this.form.mpsl
          this.form.syfy = this.form.sysc*this.form.sydj*this.form.pc
        }
      }
    }

  }
};
</script>
