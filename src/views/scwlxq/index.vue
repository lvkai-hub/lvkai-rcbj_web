<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="70px">
      <!-- <el-form-item label="项目内部序号" prop="xmnbxh">
        <el-input
          v-model="queryParams.xmnbxh"
          placeholder="请输入项目内部序号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="物料内部序号" prop="wlnbxh">
        <el-input
          v-model="queryParams.wlnbxh"
          placeholder="请输入物料内部序号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="物料编码" prop="wlbm">
        <el-input v-model="queryParams.wlbm" placeholder="请输入物料编码" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="型号" prop="xh">
        <el-input v-model="queryParams.xh" placeholder="请输入型号" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="客户料号" prop="khlh">
        <el-input v-model="queryParams.khlh" placeholder="请输入客户料号" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="数量" prop="sl">
        <el-input v-model="queryParams.sl" placeholder="请输入数量" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="bom类型" prop="lx">
        <el-input v-model="queryParams.lx" placeholder="请输入bom类型" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <!-- <el-form-item label="创建人序号" prop="cjrxh">
        <el-input
          v-model="queryParams.cjrxh"
          placeholder="请输入创建人序号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建人姓名" prop="cjrxm">
        <el-input
          v-model="queryParams.cjrxm"
          placeholder="请输入创建人姓名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建时间" prop="cjsj">
        <el-input
          v-model="queryParams.cjsj"
          placeholder="请输入创建时间"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="修改人序号" prop="bgrxh">
        <el-input
          v-model="queryParams.bgrxh"
          placeholder="请输入修改人序号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="修改人姓名" prop="bgrxm">
        <el-input
          v-model="queryParams.bgrxm"
          placeholder="请输入修改人姓名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="修改时间" prop="bgsj">
        <el-input
          v-model="queryParams.bgsj"
          placeholder="请输入修改时间"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
          v-hasPermi="['system:scwlxq:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['system:scwlxq:edit']">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['system:scwlxq:remove']">删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
          v-hasPermi="['system:scwlxq:export']">导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="scwlxqList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="内部序号" align="center" prop="nbxh" />
      <el-table-column label="项目内部序号" align="center" prop="xmnbxh" />
      <el-table-column label="物料内部序号" align="center" prop="wlnbxh" /> -->
      <el-table-column label="项目名称" align="center" prop="xmmc" />
      <!-- <el-table-column label="物料编码" align="center" prop="wlbm" /> -->
      <el-table-column label="型号" align="center" prop="xh" />
      <el-table-column label="客户料号" align="center" prop="khlh" />
      <el-table-column label="数量" align="center" prop="sl" />
      <el-table-column label="bom类型" align="center" prop="lx">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.bomlx" :value="scope.row.lx" />
        </template>
      </el-table-column>
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
            v-hasPermi="['system:scwlxq:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['system:scwlxq:remove']">删除</el-button>
          <el-button size="mini" type="text" icon="el-icon-printer" @click="orderPrint(scope.row)"
            v-hasPermi="['system:scwlxq:edit']">打印</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改生产物料需求对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="1000px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row :gutter="24">
          <!-- <el-col :span="8">
            <el-form-item label="项目内部序号" prop="xmnbxh">
              <el-input v-model="form.xmnbxh" placeholder="请输入项目内部序号" />
            </el-form-item>
          </el-col> -->
          <el-col :span="16">
            <el-form-item label="项目名称" prop="xmmc">
              <el-input v-model="form.xmmc" placeholder="请输入项目名称" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="型号" prop="xh">
              <el-input v-model="form.xh" placeholder="请输入型号" :readonly="true">
                <el-button slot="append" icon="el-icon-search" @click="cpxmTc"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item label="物料内部序号" prop="wlnbxh">
              <el-input v-model="form.wlnbxh" placeholder="请输入物料内部序号" />
            </el-form-item>
          </el-col> -->
        </el-row>
        <el-row :gutter="24">
          <!-- <el-col :span="8">

            <el-form-item label="物料编码" prop="wlbm">
              <el-input v-model="form.wlbm" placeholder="请输入物料编码">
                <el-button slot="append" icon="el-icon-search" @click="cpxmTc"></el-button>
              </el-input>
            </el-form-item>
          </el-col> -->

          <el-col :span="8">
            <el-form-item label="客户料号" prop="khlh">
              <el-input v-model="form.khlh" placeholder="请输入客户料号" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="数量" prop="sl">
              <el-input v-model="form.sl" placeholder="请输入数量" type="number" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="bom类型" prop="lx">
              <el-select v-model="form.lx" placeholder="请选择BOM类型" clearable @change="selectBomlx">
                <el-option v-for="dict in dict.type.bomlx" :key="dict.value" :label="dict.label" :value="dict.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">

        </el-row>
        <el-divider content-position="center">需求清单信息</el-divider>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddScwlqd">添加</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDeleteScwlqd">删除</el-button>
          </el-col>
        </el-row>
        <el-table :data="scwlqdList" :row-class-name="rowScwlqdIndex" @selection-change="handleScwlqdSelectionChange"
          ref="scwlqd">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column label="序号" align="center" prop="index" width="50" />
          <el-table-column label="物料编码" prop="wlbm" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.wlbm" placeholder="请输入物料编码" disabled/>
            </template>
          </el-table-column>
          <el-table-column label="物料名称" prop="wlmc" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.wlmc" placeholder="请输入物料名称" disabled/>
            </template>
          </el-table-column>
          <el-table-column label="需求量" prop="xql" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.xql" placeholder="请输入需求量" type="number" disabled />
            </template>
          </el-table-column>
          <el-table-column label="仓库库存" prop="kcl" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.kcl" placeholder="请输入仓库库存" @input="jsXcgl(scope.row)" type="number" />
            </template>
          </el-table-column>
          <el-table-column label="需采购数量" prop="xcgl" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.xcgl" placeholder="请输入需采购数量" :readonly="true" />
              <!-- {{ scope.row.xql - scope.row.kcl }} -->
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
import { listScwlxq, getScwlxq, delScwlxq, addScwlxq, updateScwlxq, getBommxByScwlxq } from "@/api/scwlxq/scwlxq";
import { getBommxByCpbjd } from "@/api/cpbjd/cpbjd";
import cpxmTc from "@/views/kkxbj/cpxmTc.vue"
import { hiPrintPlugin } from 'vue-plugin-hiprint'
hiPrintPlugin.disAutoConnect();  //取消自动打印直接连接客户端
hiprint.init();

import mb from '../scwlxq/mb.json'

export default {
  name: "Scwlxq",
  dicts: ['bomlx'],
  components: {
    cpxmTc,
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 子表选中数据
      checkedScwlqd: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 生产物料需求表格数据
      scwlxqList: [],
      // 需求清单表格数据
      scwlqdList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        xmnbxh: null,
        wlnbxh: null,
        wlbm: null,
        xh: null,
        khlh: null,
        sl: null,
        lx: null,
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
        xh: [{ required: true, message: '请选择型号', trigger: 'blur' }],
        lx: [{ required: true, message: '请选择BOM类型', trigger: 'blur' }],
      },
      dialogCpxmTc: false,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询生产物料需求列表 */
    getList() {
      this.loading = true;
      listScwlxq(this.queryParams).then(response => {
        this.scwlxqList = response.rows;
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
        wlnbxh: null,
        wlbm: null,
        xh: null,
        khlh: null,
        sl: null,
        lx: null,
        cjrxh: null,
        cjrxm: null,
        cjsj: null,
        bgrxh: null,
        bgrxm: null,
        bgsj: null
      };
      this.scwlqdList = [];
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
      this.title = "添加生产物料需求";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const nbxh = row.nbxh || this.ids
      getScwlxq(nbxh).then(response => {
        this.form = response.data;
        this.scwlqdList = response.data.scwlqdList;
        this.open = true;
        this.title = "修改生产物料需求";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.scwlqdList = this.scwlqdList;
          if (this.form.nbxh != null) {
            updateScwlxq(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addScwlxq(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除生产物料需求编号为"' + nbxhs + '"的数据项？').then(function () {
        return delScwlxq(nbxhs);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
    },
    /** 需求清单序号 */
    rowScwlqdIndex({ row, rowIndex }) {
      row.index = rowIndex + 1;
    },
    /** 需求清单添加按钮操作 */
    handleAddScwlqd() {
      let obj = {};
      obj.wlbm = "";
      obj.wlmc = "";
      obj.xql = "";
      obj.kcl = "";
      obj.xcgl = "";
      obj.bz = "";
      obj.cjrxh = "";
      obj.cjrxm = "";
      obj.cjsj = "";
      obj.bgrxh = "";
      obj.bgrxm = "";
      obj.bgsj = "";
      this.scwlqdList.push(obj);
    },
    /** 需求清单删除按钮操作 */
    handleDeleteScwlqd() {
      if (this.checkedScwlqd.length == 0) {
        this.$modal.msgError("请先选择要删除的需求清单数据");
      } else {
        const scwlqdList = this.scwlqdList;
        const checkedScwlqd = this.checkedScwlqd;
        this.scwlqdList = scwlqdList.filter(function (item) {
          return checkedScwlqd.indexOf(item.index) == -1
        });
      }
    },
    /** 复选框选中数据 */
    handleScwlqdSelectionChange(selection) {
      this.checkedScwlqd = selection.map(item => item.index)
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/scwlxq/export', {
        ...this.queryParams
      }, `scwlxq_${new Date().getTime()}.xlsx`)
    },
    /**成品项目弹窗 */
    cpxmTc() {
      this.dialogCpxmTc = true
    },
    //子组件选择数据后回填到父组件中
    fclick(a) {
      this.dialogCpxmTc = false
      console.log(a[0]);
      if (a[0]) {
        this.form.xmbm = a[0].xmbm
        this.form.xmmc = a[0].xmmc
        this.form.xh = a[0].dcxh
        this.form.khlh = a[0].khxh
        this.form.sl = a[0].sl
        this.form.xmnbxh = a[0].nbxh
        this.form.wlnbxh = a[0].wlnbxh
      } else {
        this.form.xmbm = a.xmbm
        this.form.xmmc = a.xmmc
        this.form.xh = a.dcxh
        this.form.khlh = a.khxh
        this.form.sl = a.sl
        this.form.xmnbxh = a.nbxh
        this.form.wlnbxh = a.wlnbxh
      }


    },

    //根据选择的bom类型带出对应的bom明细
    selectBomlx() {
      this.scwlqdList = [];
      getBommxByScwlxq(this.form).then(res => {
        if (res.bomXbList) {
          res.bomXbList.forEach(e => {
            this.scwlqdList.push({
              wlbm: e.wlbm,
              wlmc: e.wlmc,
              xql: e.sl * this.form.sl,
            })
          })

        }
      })
    },
    //计算需采购量
    jsXcgl(row) {
      console.log("计算了");
      console.log("需求量" + row.xql);
      console.log("库存量" + row.kcl);
      let xcgl = row.xql - row.kcl;
      row.xcgl = xcgl;
      console.log("需采购量" + xcgl);
      console.log("需采购量" + row.xcgl);


      // let xql = Number(row.xql == null ? 0 : row.xql)
      // let kcl = Number(row.kcl == null ? 0 : row.kcl)
      // let xcgl1 = Number(row.xcgl == null ? 0 : row.xcgl)
      // let xcgl = (xql-kcl).toString()
      // console.log("需采购量"+xcgl);
      // console.log("ces"+xcgl1);
      // row.xcgl = xcgl      


    },
    orderPrint(row) {
      this.reset();
      const nbxh = row.nbxh || this.ids
      //let printData = {};
      getScwlxq(nbxh).then(response => {
        this.form = response.data;
        this.scwlqdList = response.data.scwlqdList;
        let printData = Object.assign({},this.form);
        //console.log("打印数据"+printData)
        //let printData = { xmmc: this.form.xmmc, };
        let hiprintTemplate = new hiprint.PrintTemplate({ template: mb });
        // 打印
        hiprintTemplate.print(printData);
      });

    }
  }
};
</script>
