<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="物料编码" prop="wlbm">
        <el-input v-model="queryParams.wlbm" placeholder="请输入物料编码" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="物料名称" prop="wlmc">
        <el-input v-model="queryParams.wlmc" placeholder="请输入物料名称" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="材质" prop="dccz">
        <el-input v-model="queryParams.dccz" placeholder="请输入材质" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="型号" prop="dcxh">
        <el-input v-model="queryParams.dcxh" placeholder="请输入型号" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="供应商名称" prop="gysmc" label-width="85px">
        <el-input v-model="queryParams.gysmc" placeholder="请输入供应商名称" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <!-- <el-form-item label="报价人" prop="bjr">
        <el-input v-model="queryParams.bjr" placeholder="请输入报价人" clearable @keyup.enter.native="handleQuery" />
      </el-form-item> -->
      <el-form-item label="报价人" prop="cjrxm">
        <el-input v-model="queryParams.cjrxm" placeholder="请输入报价人" clearable
          @keyup.enter.native="handleQuery" /></el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
          v-hasPermi="['zjbj:zjbj:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['zjbj:zjbj:edit']">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['zjbj:zjbj:remove']">删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
          v-hasPermi="['zjbj:zjbj:export']">导出</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="info" plain icon="el-icon-upload2" size="mini" @click="handleImport"
          v-hasPermi="['zjbj:zjbj:import']">导入</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="zjbjList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="物料编码" align="center" prop="wlbm" />
      <el-table-column label="物料名称" align="center" prop="wlmc" />
      <el-table-column label="材质" align="center" prop="dccz" />
      <el-table-column label="型号" align="center" prop="dcxh" />
      <el-table-column label="单位" align="center" prop="dw" />
      <el-table-column label="供应商名称" align="center" prop="gysmc" />
      <el-table-column label="数量" align="center" prop="sl" />
      <el-table-column label="3D单价" align="center" prop="dj">
      </el-table-column>
      <el-table-column label="机加工单价" align="center" prop="jjgdj">
      </el-table-column>
      <el-table-column label="软模单价" align="center" prop="rmdj">
      </el-table-column>
      <el-table-column label="批量模单价" align="center" prop="plmdj">
      </el-table-column>
      <el-table-column label="模具费" align="center" prop="mjf" />
      <el-table-column label="损耗率(%)" align="center" prop="shbl" />
      <!-- <el-table-column label="报价人" align="center" prop="bjr" />
      <el-table-column label="报价日期" align="center" prop="bjrq" /> -->
      <el-table-column label="报价人" align="center" prop="cjrxm" />
      <el-table-column label="报价时间" align="center" prop="cjsj">
        <template slot-scope="scope">
          <div>
            {{ ((scope.row.cjsj) == null ? "" : (scope.row.cjsj).substring(0, 8)) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="bz" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['zjbj:zjbj:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['zjbj:zjbj:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改组件报价对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="1000px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="物料编码" prop="wlbm">
              <el-input v-model="form.wlbm" placeholder="请输入物料编号" :readonly="true">
                <el-button slot="append" icon="el-icon-search" @click="wlxxTc"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="物料名称" prop="wlmc">
              <el-input v-model="form.wlmc" placeholder="请输入物料名称" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="材质" prop="dccz">
              <el-input v-model="form.dccz" placeholder="请输入材质" disabled />
            </el-form-item>
          </el-col>

        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="单位" prop="dw">
              <el-input v-model="form.dw" placeholder="请输入单位" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="类型" prop="lx">
              <el-select v-model="form.lx" placeholder="请选择类型" clearable disabled>
                <el-option v-for="dict in dict.type.wllx" :key="dict.value" :label="dict.label" :value="dict.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="型号" prop="dcxh">
              <el-input v-model="form.dcxh" placeholder="请输入型号" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="供应商名称" prop="gysmc" label-width="85px">
              <el-input v-model="form.gysmc" placeholder="请输入供应商名称" />
            </el-form-item>
          </el-col>



        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="数量" prop="sl">
              <el-input v-model="form.sl" placeholder="请输入数量" type="number" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="3D单价" prop="dj">
              <el-input v-model="form.dj" placeholder="请输入3D单价" type="number" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="机加工单价" prop="jjgdj" label-width="85px">
              <el-input v-model="form.jjgdj" placeholder="请输入机加工单价" type="number" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="软模单价" prop="rmdj">
              <el-input v-model="form.rmdj" placeholder="请输入软模单价" type="number" />
            </el-form-item>
          </el-col>

          <!-- <el-col :span="6">
            <el-form-item label="报价人" prop="bjr">
              <el-input v-model="form.bjr" placeholder="请输入报价人" />
            </el-form-item>
          </el-col> -->
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="批量模单价" prop="plmdj" label-width="85px">
              <el-input v-model="form.plmdj" placeholder="请输入批量模单价" type="number" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="模具费" prop="mjf">
              <el-input v-model="form.mjf" placeholder="请输入模具费" type="number" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="损耗率(%)" prop="shbl">
              <el-input v-model="form.shbl" placeholder="请输入损耗率(%)" type="number" />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item label="报价日期" prop="bjrq">
              <el-date-picker v-model="form.bjrq" type="date" placeholder="选择日期" format="yyyyMMdd"
                value-format="yyyyMMdd">
              </el-date-picker>
            </el-form-item>
          </el-col> -->
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="备注" prop="bz">
              <el-input v-model="form.bz" placeholder="请输入备注" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="" prop="fj">
          <!-- <el-input v-model="form.fj" placeholder="请输入附件" /> -->
          <el-row :guttrt="20">
            <el-col :span="3">
              <el-upload class="upload-demo" action="http://localhost:8989/common/uploadMinio" :headers="headers"
                :data="{ 'wjlx': '15' }" ref="upload" :on-success="onSuccess" :show-file-list="false">
                <el-button size="small" type="primary">附件上传</el-button>
              </el-upload>
            </el-col>
          </el-row>
        </el-form-item>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="filename" label="文件名">
          </el-table-column>
          <el-table-column prop="wjlx" label="文件类型">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.wjlx" :value="scope.row.wjlx" />
            </template>
          </el-table-column>
          <el-table-column prop="cjsj" label="上传时间">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button @click.native.prevent="deleteRow(scope.$index, tableData, scope.row)" type="text" size="small">
                移除
              </el-button>
              <el-button type="text" @click="downLoadFile(scope.row.filename, scope.row.originalFilename)"
                size="small">下载</el-button>
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

    <!-- 材料报价导入对话框 -->
    <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px" append-to-body>
      <el-upload ref="upload" :limit="1" accept=".xlsx, .xls" :headers="upload.headers"
        :action="upload.url + '?updateSupport=' + upload.updateSupport" :disabled="upload.isUploading"
        :on-success="handleFileSuccess" :auto-upload="false" drag>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip text-center" slot="tip">
          <!-- <div class="el-upload__tip" slot="tip">
            <el-checkbox v-model="upload.updateSupport" /> 是否更新已经存在的用户数据
          </div> -->
          <span>仅允许导入xls、xlsx格式文件。</span>
          <el-link type="primary" :underline="false" style="font-size:12px;vertical-align: baseline;"
            @click="importTemplate">下载模板</el-link>
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import { listZjbj, getZjbj, delZjbj, addZjbj, updateZjbj } from "@/api/zjbj/zjbj";
import { delWjsc, downloadByIO } from "@/api/wlxx/wlxx";
import wlxx from "@/views/bom/wlxxTc.vue";
import { getToken } from "@/utils/auth";
export default {
  components: {
    wlxx,
  },
  dicts: ['wllx','wjlx'],
  name: "Zjbj",
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
        wlbm: [{ required: true, message: '请输入物料编码', trigger: 'blur' }],
      },
      dialogWlxx: false,
      radio: '',
      radio1: '',
      radio2: '',
      radio3: '',
      headers: {
        Authorization: "Bearer " + getToken()
      },
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: { Authorization: "Bearer " + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/zjbj/zjbj/importData"
      },
      tableData: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
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
      this.tableData = [];
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
        if (response.data.wjscList == null) {
          this.tableData = []
        } else {
          this.tableData = response.data.wjscList
        }

        this.title = "修改组件报价";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.nbxh != null) {
            let wjIds = [];
            if (this.tableData.length > 0) {
              this.tableData.forEach(e => {
                wjIds.push(e.nbxh)
              });
            }
            Object.assign(this.form, { 'ids': wjIds })
            updateZjbj(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
              this.tableData = []
            });
          } else {
            let wjIds = [];
            if (this.tableData.length > 0) {
              this.tableData.forEach(e => {
                wjIds.push(e.nbxh)
              });
            }
            Object.assign(this.form, { 'ids': wjIds })
            addZjbj(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
              this.tableData = []
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
    /** 下载模板操作 */
    importTemplate() {
      this.download('zjbj/zjbj/importTemplate', {
      }, `材料报价模版.xlsx`)
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false;
      this.upload.isUploading = false;
      this.$refs.upload.clearFiles();
      this.$alert("<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" + response.msg + "</div>", "导入结果", { dangerouslyUseHTMLString: true });
      //this.$message.success("导入成功");
      this.getList();
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
    },
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = "材料报价导入";
      this.upload.open = true;
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
        this.form.dw = a[0].dw
        this.form.lx = a[0].lx
      } else {
        this.form.wlbm = a.wlbh
        this.form.wlmc = a.wlmc
        this.form.wlnbxh = a.nbxh
        this.form.dccz = a.dccz
        this.form.dcxh = a.dcxh
        this.form.dw = a.dw
        this.form.lx = a.lx
      }

    },
    manualUpload() {
      console.log('测试');
    },
    onSuccess(res, file, fileList) {
      console.log(res);
      this.tableData.push(res.wjsc)
    },

    deleteRow(index, rows, row) {
      rows.splice(index, 1);
      delWjsc(row.nbxh).then(res => {

      })
    },

    //文件下载
    downLoadFile(wjm, fileName) {
      let formData = new FormData();
      formData.append("fileName", fileName)
      downloadByIO(formData).then(res => {
        const url = window.URL.createObjectURL(new Blob([res]));
        const link = document.createElement("a");
        // 提取文件地址中的文件后缀名，将其拼接在文件名后面，如果文件名包含后缀则不需要这一步
        const arr = wjm.split(".");
        const suffix = arr.length > 1 ? arr[arr.length - 1] : "";
        link.href = url;
        link.setAttribute("download", `${wjm}`); // 设置下载文件的名称
        document.body.appendChild(link);
        link.click();
      }
      )
    },
  }
};
</script>
