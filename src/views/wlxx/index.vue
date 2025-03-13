<template>
  <div class="app-container">
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
      <el-form-item label="SAP编码" prop="sapbm" label-width="70px">
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

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
          v-hasPermi="['wlxx:wlxx:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['wlxx:wlxx:edit']">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['wlxx:wlxx:remove']">删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
          v-hasPermi="['wlxx:wlxx:export']">导出</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="info" plain icon="el-icon-upload2" size="mini" @click="handleImport"
          v-hasPermi="['wlxx:wlxx:import']">导入</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="wlxxList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="物料编号" align="center" prop="wlbh" width="100" />
      <el-table-column label="物料名称" align="center" prop="wlmc" />
      <el-table-column label="型号" align="center" prop="dcxh" />
      <el-table-column label="材质" align="center" prop="dccz" />
      <el-table-column label="附件" align="center" prop="fj">
        <template slot-scope="scope">
          <div v-if="scope.row.fjList != null">
            <el-image style="width: 100px; height: 100px" :src="scope.row.fjList[0]"
              :preview-src-list="scope.row.fjList" fit="scale-down">
            </el-image>
          </div>
          <div v-else>{{ scope.row.fjList }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="SAP编码" align="center" prop="sapbm" />
      <el-table-column label="单位" align="center" prop="dw" />
      <el-table-column label="类型" align="center" prop="lx">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.wllx" :value="scope.row.lx" />
        </template>
      </el-table-column>
      <el-table-column label="类别" align="center" prop="wllb">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.wllb" :value="scope.row.wllb" />
        </template>
      </el-table-column>
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
      <el-table-column label="备注" align="center" prop="bz" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['wlxx:wlxx:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['wlxx:wlxx:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改物料信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="1000px" append-to-body :close-on-click-modal="false"
      :show-close="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row :gutter="20">
          <!-- <el-col :span="6">
            <el-form-item label="物料编号" prop="wlbh">
              <el-input v-model="form.wlbh" placeholder="请输入物料编号" />
            </el-form-item>
          </el-col> -->
          <el-col :span="12">
            <el-form-item label="物料名称" prop="wlmc">
              <el-input v-model="form.wlmc" placeholder="请输入物料名称" />
            </el-form-item>
          </el-col>


          <el-col :span="6">
            <el-form-item label="型号" prop="dcxh">
              <el-input v-model="form.dcxh" placeholder="请输入型号" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="材质" prop="dccz">
              <el-input v-model="form.dccz" placeholder="请输入材质" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :guttrt="20">

          <el-col :span="6">
            <el-form-item label="单位" prop="dw">
              <el-select v-model="form.dw" placeholder="请选择单位" clearable>
                <el-option v-for="dict in dict.type.jldw" :key="dict.value" :label="dict.label" :value="dict.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="类型" prop="lx">
              <el-select v-model="form.lx" placeholder="请选择类型" clearable>
                <el-option v-for="dict in dict.type.wllx" :key="dict.value" :label="dict.label" :value="dict.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="类别" prop="wllb">
              <el-select v-model="form.wllb" placeholder="请选择类型" clearable>
                <el-option v-for="dict in dict.type.wllb" :key="dict.value" :label="dict.label" :value="dict.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="SAP编码" prop="sapbm">
              <el-input v-model="form.sapbm" placeholder="请输入SAP编码" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
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
                :data="{ 'wjlx': '5' }" ref="upload" :on-success="onSuccess" :show-file-list="false">
                <el-button size="small" type="primary">图片上传</el-button>
              </el-upload>
            </el-col>
            <el-col :span="3">
              <el-upload class="upload-demo" action="http://localhost:8989/common/uploadMinio" :headers="headers"
                :data="{ 'wjlx': '10' }" ref="upload" :on-success="onSuccess" :show-file-list="false">
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


    <!-- 用户导入对话框 -->
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
import { listWlxx, getWlxx, delWlxx, addWlxx, updateWlxx, delWjsc, downloadByIO } from "@/api/wlxx/wlxx";
import { getToken } from "@/utils/auth";
export default {
  name: "Wlxx",
  dicts: ['jldw', 'wllx', 'wjlx', 'wllb'],
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
      wjurlList: [],
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
        dw: [{ required: true, message: '请选择单位', trigger: 'blur' }],
        wlmc: [{ required: true, message: '请输入物料名称', trigger: 'blur' }],
        lx: [{ required: true, message: '请选择类型', trigger: 'blur' }],
      },
      headers: {
        Authorization: "Bearer " + getToken()
      },
      tableData: [],
      previewSrcList: ['http://192.168.201.212:6903/rcbj/2024/04/28/产品图片_20240428173928A002.png'],
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
        url: process.env.VUE_APP_BASE_API + "/wlxx/wlxx/importData"
      },
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
      this.tableData = []
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
        if (response.data.wjscList == null) {
          this.tableData = []
        } else {
          this.tableData = response.data.wjscList
        }

        this.title = "修改物料信息";
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
            updateWlxx(this.form).then(response => {
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
            addWlxx(this.form).then(response => {
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
    /** 下载模板操作 */
    importTemplate() {
      this.download('wlxx/wlxx/importTemplate', {
      }, `物料信息模版.xlsx`)
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
      this.upload.title = "物料导入";
      this.upload.open = true;
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

  },
};
</script>
