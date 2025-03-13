<template>
  <div class="app-container">
    <!-- 添加或修改产品报价单对话框 -->
    <el-dialog :title="title" :visible.sync="dialogCpbj" width="85%" append-to-body :close-on-click-modal="false"
      :show-close="false" @opened="fzForm">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" size="mini">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="项目名称" prop="xmmc" label-width="100px">
              <el-input v-model="form.xmmc" placeholder="请输入项目名称" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="型号" prop="xh">
              <el-input v-model="form.xh" placeholder="请输入型号" disabled />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="6">
            <el-form-item label="物料名称" prop="wlmc">
              <el-input v-model="form.wlmc" placeholder="请输入物料名称" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="物料内部序号" prop="wlnbxh">
              <el-input v-model="form.wlnbxh" placeholder="请输入物料内部序号" />
            </el-form-item>
          </el-col> -->
          <el-col :span="6">
            <el-form-item label="客户料号" prop="khlh">
              <el-input v-model="form.khlh" placeholder="请输入客户料号" disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">

          <el-col :span="6">
            <el-form-item label="数量" prop="sl">
              <el-input v-model="form.sl" placeholder="请输入数量" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <!-- <el-form-item label="bom类型" prop="bom类型">
              <el-input v-model="form.bom类型" placeholder="请输入bom类型" />
            </el-form-item> -->
            <el-form-item label="bom类型" prop="bomlx">
              <el-select v-model="form.bomlx" placeholder="请选择BOM类型" clearable @change="selectBomlx">
                <el-option v-for="dict in dict.type.bomlx" :key="dict.value" :label="dict.label" :value="dict.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="点胶及组装人工费" prop="zzrgf">
              <el-input v-model="form.zzrgf" placeholder="请输入点胶及组装人工费" type="number" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="备注" prop="bz">
              <el-input v-model="form.bz" placeholder="请输入备注" type="textarea" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="运费" prop="yf">
              <el-input v-model="form.yf" placeholder="请输入运费" type="number" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="合格率%" prop="hgl">
              <el-input v-model="form.hgl" placeholder="请输入合格率" type="number" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="电费" prop="df">
              <el-input v-model="form.df" placeholder="请输入电费" type="number" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="包材成本" prop="bccb">
              <el-input v-model="form.bccb" placeholder="请输入包材成本" type="number" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="毛利率%" prop="mll">
              <el-input v-model="form.mll" placeholder="请输入毛利率" type="number" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="可靠性验证费RMB" prop="kkxyzf">
              <el-input v-model="form.kkxyzf" placeholder="请输入可靠性验证费" type="number" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="可靠性验证费USD" prop="kkxyzfUsd">
              <el-input v-model="form.kkxyzfUsd" placeholder="请输入可靠性验证费USD" type="number" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="可靠性验证费EUR" prop="kkxyzfEur">
              <el-input v-model="form.kkxyzfEur" placeholder="请输入可靠性验证费EUR" type="number" />
            </el-form-item>
          </el-col>

        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="成本小计" prop="cbxj">
              <el-input v-model="form.cbxj" placeholder="请输入成本小计" type="number" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="生产成本合计" prop="sccbhj">
              <el-input v-model="form.sccbhj" placeholder="请输入生产成本合计" type="number" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="工厂管理费" prop="gcglf">
              <el-input v-model="form.gcglf" placeholder="请输入工厂管理费" type="number" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="管理费率%" prop="glfl">
              <el-input v-model="form.glfl" placeholder="请输入管理费率" type="number" />
            </el-form-item>
          </el-col>

        </el-row>
        <el-row :gutter="20">
          <!-- <el-col :span="6">
            <el-form-item label="组装成本" prop="zzcb">
              <el-input v-model="form.zzcb" placeholder="请输入组装成本" type="number" />
            </el-form-item>
          </el-col> -->
          <el-col :span="6">
            <el-form-item label="三项费用" prop="sxfy">
              <el-input v-model="form.sxfy" placeholder="请输入三项费用" type="number" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="三项费率%" prop="sxfl">
              <el-input v-model="form.sxfl" placeholder="请输入三项费率" type="number" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="磁片厂成本合计" prop="cpccb">
              <el-input v-model="form.cpccb" placeholder="请输入磁片厂成本合计" type="number" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="总成本" prop="zcb">
              <el-input v-model="form.zcb" placeholder="请输入总成本" type="number" />
            </el-form-item>
          </el-col>

        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="年降年数" prop="njns">
              <el-input v-model="form.njns" placeholder="请输入年降年数" type="number" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="年降率%" prop="njl">
              <el-input v-model="form.njl" placeholder="请输入年降率" type="number" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="建议售价rmb" prop="jysjRmb">
              <el-input v-model="form.jysjRmb" placeholder="请输入建议售价rmb" type="number" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="建议售价rmb含税" prop="jysjHs">
              <el-input v-model="form.jysjHs" placeholder="请输入建议售价rmb含税" type="number" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="建议售价usd" prop="jysjUsd">
              <el-input v-model="form.jysjUsd" placeholder="请输入建议售价usd" type="number" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="美元汇率" prop="myhl">
              <el-input v-model="form.myhl" placeholder="请输入美元汇率" type="number" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="建议售价eur" prop="jysjEur">
              <el-input v-model="form.jysjEur" placeholder="请输入建议售价eur" type="number" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="欧元汇率" prop="oyhl">
              <el-input v-model="form.oyhl" placeholder="请输入欧元汇率" type="number" />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="6">
            <el-form-item label="模具费用" prop="mjfy">
              <el-input v-model="form.mjfy" placeholder="请输入模具费用" type="number" />
            </el-form-item>
          </el-col> -->

        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="模具费用总额" prop="mjzfy">
              <el-input v-model="form.mjzfy" placeholder="请输入模具费用总额" type="number" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="模具费用总额USD" prop="mjzfyUsd">
              <el-input v-model="form.mjzfyUsd" placeholder="请输入模具费用总额USD" type="number" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="模具费用总额EUR" prop="mjzfyEur">
              <el-input v-model="form.mjzfyEur" placeholder="请输入模具费用总额EUR" type="number" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="模具/治具分摊后售价" prop="mjzjfthsj">
              <el-input v-model="form.mjzjfthsj" placeholder="请输入模具/治具分摊后售价" type="number" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="税率%" prop="hsl">
              <el-input v-model="form.hsl" placeholder="请输入税率" type="number" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider content-position="center">BOM信息</el-divider>
        <!-- <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddBjdxb">添加</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDeleteBjdxb">删除</el-button>
          </el-col>
        </el-row> -->
        <el-table :data="bjdxbList" :row-class-name="rowBjdxbIndex" @selection-change="handleBjdxbSelectionChange"
          ref="bjdxb">
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
          <el-table-column label="型号" prop="dcxh" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.dcxh" placeholder="请输入型号" disabled />
            </template>
          </el-table-column>
          <el-table-column label="单价" prop="dj" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.dj" placeholder="请输入单价" :readonly="true">
                <el-button slot="append" icon="el-icon-thumb" @click="zjbjTc(scope.row)"></el-button>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="用量" prop="yl" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.yl" placeholder="请输入用量" disabled />
            </template>
          </el-table-column>
          <el-table-column label="总价" prop="zj" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.zj" placeholder="请输入总价" disabled />
            </template>
          </el-table-column>
          <el-table-column label="模具费" prop="mjf" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.mjf" placeholder="请输入模具费" disabled />
            </template>
          </el-table-column>
          <el-table-column label="损耗率(%)" prop="shbl" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.shbl" placeholder="请输入损耗率" disabled />
            </template>
          </el-table-column>
          <el-table-column label="类型" prop="lx" width="150">
            <template slot-scope="scope">
              <el-select v-model="scope.row.lx" placeholder="请选择类型" filterable style="width: 120px" disabled>
                <el-option v-for="dict in dict.type.wllx" :key="dict.value" :label="dict.label" :value="dict.value" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="类别" prop="wllb" width="150">
            <template slot-scope="scope">
              <el-select v-model="scope.row.wllb" placeholder="请选择类别" filterable style="width: 120px" disabled>
                <el-option v-for="dict in dict.type.wllb" :key="dict.value" :label="dict.label" :value="dict.value" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="备注" prop="bz" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.bz" placeholder="请输入备注" />
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="no">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
    <zjbjTc @zjbjclick="zjbjclick" :dialogZjbjTc="dialogZjbjTc" :zjbjData="zjbjData" :rowXh="rowXh"></zjbjTc>
  </div>
</template>

<script>
import { listCpbjd, getCpbjd, delCpbjd, addCpbjd, updateCpbjd, getBommxByCpbjd } from "@/api/cpbjd/cpbjd";
import { getZjbjBywlbh } from "@/api/zjbj/zjbj";
import { getKkxbjByXmnbxh } from "@/api/yzbj/kkxbj";
import { getAllMrz } from "@/api/system/config";
import zjbjTc from "@/views/cpbjd/zjbjTc.vue"

export default {
  name: "cpbjdTc",
  dicts: ['bomlx', 'wllx', 'wllb'],
  components: {
    zjbjTc,
  },
  props: ['dialogCpbj', 'formData'],
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 子表选中数据
      checkedBjdxb: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 产品报价单表格数据
      cpbjdList: [],
      // 报价单细表格数据
      bjdxbList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        xmmc: null,
        xmnbxh: null,
        wlmc: null,
        wlnbxh: null,
        xh: null,
        khlh: null,
        sl: null,
        bomNbxh: null,
        bomlx: null,
        zzrgf: null,
        yf: null,
        hgl: null,
        df: null,
        bccb: null,
        mll: null,
        kkxyzf: null,
        zzcbxj: null,
        zzsccb: null,
        gcglf: null,
        glfl: null,
        sxfy: null,
        sxfl: null,
        zzcb: null,
        cpccb: null,
        zcb: null,
        njns: null,
        jysjRmb: null,
        njl: null,
        jysjUsd: null,
        jysjHs: null,
        myhl: null,
        jysjEur: null,
        oyhl: null,
        mjfy: null,
        mjzfy: null,
        mjfthsj: null,
        cjrxh: null,
        cjrxm: null,
        cjsj: null,
        bgrxh: null,
        bgrxm: null,
        bgsj: null
      },
      // 表单参数
      form: {
      },
      // 表单校验
      rules: {
        zzrgf: [{ required: true, message: '请输入点胶及组装人工费', trigger: 'blur' }],
        df: [{ required: true, message: '请输入电费', trigger: 'blur' }],
        yf: [{ required: true, message: '请输入运费', trigger: 'blur' }],
        bccb: [{ required: true, message: '请输入包材成本', trigger: 'blur' }],
        hgl: [{ required: true, message: '请输入合格率', trigger: 'blur' }],
        bomlx: [{ required: true, message: '请选择bom类型', trigger: 'blur' }],
      },
      dialogZjbjTc: false,
      zjbjData: {},
      rowXh: '',
    };
  },
  created() {
    //this.getList();
    //this.fzForm();
  },
  methods: {

    fzForm() {
      this.form = {};
      console.log("赋值了");
      this.$set(this.form, 'xmmc', this.formData.xmmc)
      this.$set(this.form, 'xmnbxh', this.formData.nbxh)
      this.$set(this.form, 'xh', this.formData.dcxh)
      this.$set(this.form, 'cz', this.formData.dccz)
      this.$set(this.form, 'wlnbxh', this.formData.wlnbxh)
      this.$set(this.form, 'wlmc', this.formData.wlmc)
      this.$set(this.form, 'sl', this.formData.sl)
      this.$set(this.form, 'khlh', this.formData.khxh)
      getAllMrz().then(res => {
        this.$set(this.form, 'mll', res.mll)//毛利率
        this.$set(this.form, 'njns', res.njns)//年降年数
        this.$set(this.form, 'njl', res.njl)//年降率
        this.$set(this.form, 'sxfl', res.sxfl)//三项费率
        this.$set(this.form, 'hsl', res.sl)//税率
        this.$set(this.form, 'glfl', res.glfl)//管理费率
        this.$set(this.form, 'oyhl', res.oyhl)//欧元汇率
        this.$set(this.form, 'myhl', res.myhl)//美元汇率
        // this.form.mll = res.mll;//毛利率
        // this.form.njns = res.njns;//年降年数
        // this.form.njl = res.njl;//年降率
        // this.form.sxfl = res.sxfl;//三项费率
        // this.form.hsl = res.sl;//税率
        // this.form.glfl = res.glfl;//管理费率
        // this.form.oyhl = res.oyhl;//欧元汇率
        // this.form.myhl = res.myhl;//美元汇率
      });
    },
    /** 查询产品报价单列表 */
    getList() {
      this.loading = true;
      listCpbjd(this.queryParams).then(response => {
        this.cpbjdList = response.rows;
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
        xmmc: null,
        xmnbxh: null,
        wlmc: null,
        wlnbxh: null,
        xh: null,
        khlh: null,
        sl: null,
        bomNbxh: null,
        bomlx: null,
        zzrgf: null,
        yf: null,
        hgl: null,
        df: null,
        bccb: null,
        mll: null,
        kkxyzf: null,
        zzcbxj: null,
        zzsccb: null,
        gcglf: null,
        glfl: null,
        sxfy: null,
        sxfl: null,
        zzcb: null,
        cpccb: null,
        zcb: null,
        njns: null,
        jysjRmb: null,
        njl: null,
        jysjUsd: null,
        jysjHs: null,
        myhl: null,
        jysjEur: null,
        oyhl: null,
        mjfy: null,
        mjzfy: null,
        mjfthsj: null,
        cjrxh: null,
        cjrxm: null,
        cjsj: null,
        bgrxh: null,
        bgrxm: null,
        bgsj: null
      };
      this.bjdxbList = [];
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
      this.title = "添加产品报价单";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const nbxh = row.nbxh || this.ids
      getCpbjd(nbxh).then(response => {
        this.form = response.data;
        this.bjdxbList = response.data.bjdxbList;
        this.open = true;
        this.title = "修改产品报价单";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.bjdxbList = this.bjdxbList;
          if (this.form.nbxh != null) {
            updateCpbjd(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCpbjd(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.$emit('bjclick', "")
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const nbxhs = row.nbxh || this.ids;
      this.$modal.confirm('是否确认删除产品报价单编号为"' + nbxhs + '"的数据项？').then(function () {
        return delCpbjd(nbxhs);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
    },
    /** 报价单细序号 */
    rowBjdxbIndex({ row, rowIndex }) {
      row.index = rowIndex + 1;
    },
    /** 报价单细添加按钮操作 */
    handleAddBjdxb() {
      let obj = {};
      obj.wlbm = "";
      obj.wlmc = "";
      obj.dcxh = "";
      obj.dj = "";
      obj.yl = "";
      obj.zj = "";
      obj.mjf = "";
      obj.lx = "";
      obj.bz = "";
      obj.cjrxh = "";
      obj.cjrxm = "";
      obj.cjsj = "";
      obj.bgrxh = "";
      obj.bgrxm = "";
      obj.bgsj = "";
      this.bjdxbList.push(obj);
    },
    /** 报价单细删除按钮操作 */
    handleDeleteBjdxb() {
      if (this.checkedBjdxb.length == 0) {
        this.$modal.msgError("请先选择要删除的报价单细数据");
      } else {
        const bjdxbList = this.bjdxbList;
        const checkedBjdxb = this.checkedBjdxb;
        this.bjdxbList = bjdxbList.filter(function (item) {
          return checkedBjdxb.indexOf(item.index) == -1
        });
      }
    },
    /** 复选框选中数据 */
    handleBjdxbSelectionChange(selection) {
      this.checkedBjdxb = selection.map(item => item.index)
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('cpbjd/cpbjd/export', {
        ...this.queryParams
      }, `cpbjd_${new Date().getTime()}.xlsx`)
    },
    no() {
      this.$emit('bjclick', "")
    },
    selectBomlx() {
      this.bjdxbList = [];
      getBommxByCpbjd(this.form).then(res => {
        if (res.bomXbList) {
          res.bomXbList.forEach(e => {
            this.bjdxbList.push({
              wlbm: e.wlbm,
              wlmc: e.wlmc,
              dcxh: e.xh,
              yl: e.sl,
              lx: e.lx,
              wllb: e.wllb,
            })
          })

        }
      })
    },
    zjbjTc(row) {
      const wlbh = row.wlbm;
      const nbxh = row.nbxh || this.ids
      console.log("内部序号：" + nbxh);
      console.log("物料编码：" + wlbh);
      getZjbjBywlbh(wlbh).then(res => {
        this.zjbjData = res.zjbjList;
        this.rowXh = row.index - 1;
        this.dialogZjbjTc = true
        console.log(this.zjbjData);
        console.log("选择的行号：" + this.rowXh)
      })

    },
    zjbjclick(a) {
      this.dialogZjbjTc = false
      console.log("选择内容：" + a.dj);
      console.log("回来的行号：" + a.rowXh);
      if (a) {
        // this.bjdxbList[a.rowXh].dj = a.dj;
        // this.bjdxbList[a.rowXh].mjf = a.mjf;
        let yl = this.bjdxbList[a.rowXh].yl
        console.log("数量：" + yl);
        this.$set(this.bjdxbList[a.rowXh], "dj", a.dj)
        this.$set(this.bjdxbList[a.rowXh], "mjf", a.mjf)
        this.$set(this.bjdxbList[a.rowXh], "zj", (a.dj * yl * (1 + a.shbl / 100)).toFixed(2))
      }
    },
    //组装成本小计
    zzcbxj() {
      let zzjzj = 0;
      if (this.bjdxbList.length > 0) {
        this.bjdxbList.forEach(e => {
          if (e.lx == 10) {
            zzjzj = zzjzj + parseFloat(e.zj)
          }
        })
      }
      if (this.form.zzrgf && this.form.df) {
        console.log("组装件总价：" + zzjzj);
        let zzcbxj = parseFloat(zzjzj) + parseFloat(this.form.zzrgf) + parseFloat(this.form.df)
        this.form.zzcbxj = zzcbxj.toFixed(2);
        console.log("组装成本小计：" + this.form.zzcbxj);
      }

    },
    //组装生产成本
    zzsccb() {
      if (this.form.zzcbxj) {
        let zzsccb = parseFloat(this.form.zzcbxj) + parseFloat(this.form.bccb) + parseFloat(this.form.yf)
        this.form.zzsccb = zzsccb.toFixed(2);
      }
    },
    //成本小计
    cbxj() {
      // let clzj = 0;
      // if (this.bjdxbList.length > 0) {
      //   this.bjdxbList.forEach(e => {
      //     clzj = clzj + e.zj
      //   })
      // }
      let clcb = 0;
      if (this.bjdxbList.length > 0) {
        this.bjdxbList.forEach(e => {
          if ((e.wllb == "磁芯" || e.wllb == "护壳" || e.wllb == "胶水" || e.wllb == "铜排" ||
            e.wllb == "PCB" || e.wllb == "电容" ||
            e.wllb == "电阻" || e.wllb == "螺丝" ||
            e.wllb == "其他配件") && e.zj) {
            console.log("各总价：" + e.zj);
            clcb = clcb + parseFloat(e.zj);
          }
        })
      }
      if (this.form.zzrgf && this.form.df) {
        console.log("材料总价：" + clcb);
        let cbxj = parseFloat(clcb) + parseFloat(this.form.zzrgf) + parseFloat(this.form.df)
        this.form.cbxj = cbxj.toFixed(2);
        console.log("成本小计：" + this.form.cbxj);
      }
    },
    //生产成本合计
    sccbhj() {
      if (this.form.cbxj) {
        let sccbhj = parseFloat(this.form.cbxj) + parseFloat(this.form.bccb) + parseFloat(this.form.yf)
        this.form.sccbhj = sccbhj.toFixed(2);
      }
    },
    //三项费用
    // sxfy() {
    //   if (this.form.zzsccb) {
    //     let sxfy = parseFloat(this.form.zzsccb) * parseFloat(this.form.sxfl) / 100
    //     this.form.sxfy = sxfy.toFixed(2);
    //   }
    // },
    sxfy() {
      if (this.form.sccbhj) {
        let sxfy = parseFloat(this.form.sccbhj) * parseFloat(this.form.sxfl) / 100
        this.form.sxfy = sxfy.toFixed(2);
      }
    },
    //工厂管理费用
    // gcglfy() {
    //   if (this.form.zzsccb) {
    //     let gcglf = parseFloat(this.form.zzsccb) * parseFloat(this.form.glfl) / 100
    //     this.form.gcglf = gcglf.toFixed(2);
    //   }
    // },
    gcglfy() {
      if (this.form.sccbhj) {
        let gcglf = parseFloat(this.form.sccbhj) * parseFloat(this.form.glfl) / 100
        this.form.gcglf = gcglf.toFixed(2);
      }
    },
    //组装成本
    zzcb() {
      if (this.form.zzsccb) {
        let zzcb = parseFloat(this.form.zzsccb) + parseFloat(this.form.sxfy) + parseFloat(this.form.gcglf)
        this.form.zzcb = zzcb.toFixed(2);
      }
    },
    //总成本
    zcb() {
      if (this.form.sccbhj && this.form.gcglf && this.form.sxfy) {
        let zcb = parseFloat(this.form.sccbhj) + parseFloat(this.form.gcglf) + parseFloat(this.form.sxfy)
        this.form.zcb = zcb.toFixed(2);
      }
    },
    // zcb() {
    //   if (this.form.zzcb) {
    //     let fzzjzj = 0
    //     if (this.bjdxbList.length > 0) {
    //       this.bjdxbList.forEach(e => {
    //         if (e.lx != 10) {
    //           fzzjzj = fzzjzj + e.zj
    //         }
    //       })
    //     }
    //     let zcb = parseFloat(fzzjzj) + parseFloat(this.form.zzcb)
    //     this.form.zcb = zcb.toFixed(2);
    //   }
    // },
    //磁片厂成本
    cpccb() {
      let clcb = 0
      if (this.bjdxbList.length > 0) {
        this.bjdxbList.forEach(e => {
          if ((e.wllb == "胶水" || e.wllb == "铜排" ||
            e.wllb == "PCB" || e.wllb == "电容" ||
            e.wllb == "电阻" || e.wllb == "螺丝" ||
            e.wllb == "其他配件") && e.zj) {
            clcb = clcb + parseFloat(e.zj)
          }
        })
      }
      if (this.form.zzrgf && this.form.df && this.form.bccb && this.form.yf) {
        let cpccb = parseFloat(clcb) + parseFloat(this.form.zzrgf) + parseFloat(this.form.df) + parseFloat(this.form.bccb) + parseFloat(this.form.yf);
        this.form.cpccb = cpccb.toFixed(2);
      }
    },
    // cpccb() {
    //   if (this.form.zzcb) {
    //     let cpccb = parseFloat(this.form.zzcb) / parseFloat(this.form.hgl) * 100
    //     this.form.cpccb = cpccb.toFixed(2);
    //   }
    // },
    //建议售价RMB
    jysjRmb() {
      if (this.form.mll && this.form.njl && this.form.zcb && this.form.njns && this.form.hgl) {
        let ml = this.form.mll / 100
        let mll = 1 + ml
        let nj = this.form.njl / 100
        let njl = 1 + nj
        let hgl = this.form.hgl / 100
        let jysjRmb = (parseFloat(this.form.zcb) / parseFloat(hgl)) * parseFloat(mll) * parseFloat(Math.pow(njl, this.form.njns))
        this.form.jysjRmb = jysjRmb.toFixed(2);
      }


    },
    //建议售价RMB含税
    jysjHs() {
      if (this.form.hsl && this.form.jysjRmb) {
        let sl = this.form.hsl / 100
        let hsl = sl + 1
        let jysjHs = parseFloat(this.form.jysjRmb) * parseFloat(hsl)
        this.form.jysjHs = jysjHs.toFixed(2);
      }
    },
    //建议售价EUR
    jysjEur() {
      if (this.form.jysjHs && this.form.oyhl) {
        let jysjEur = parseFloat(this.form.jysjRmb) / parseFloat(this.form.oyhl)
        this.form.jysjEur = jysjEur.toFixed(2);
      }

    },
    //建议售价USD
    jysjUsd() {
      if (this.form.jysjHs && this.form.myhl) {
        let jysjUsd = parseFloat(this.form.jysjRmb) / parseFloat(this.form.myhl)
        this.form.jysjUsd = jysjUsd.toFixed(2);
      }
    },
    //模具费用总额
    mjzfy() {
      if (this.bjdxbList.length > 0) {
        let mjzfy = 0
        this.bjdxbList.forEach(e => {
          if (e.mjf) {
            mjzfy = parseFloat(mjzfy) + parseFloat(e.mjf)
          }
        })
        this.form.mjzfy = mjzfy.toFixed(2);
      }
    },
    //模具费用总额USD
    mjzfyUsd() {
      if (this.form.mjzfy) {
        console.log("模具总费用Usd");
        let mjzfyUsd = parseFloat(this.form.mjzfy) / parseFloat(this.form.myhl);
        this.form.mjzfyUsd = mjzfyUsd.toFixed(2);
      }
    },
    //模具费用总额EUR
    mjzfyEur() {
      if (this.form.mjzfy) {
        let mjzfyEur = parseFloat(this.form.mjzfy) / parseFloat(this.form.oyhl);
        this.form.mjzfyEur = mjzfyEur.toFixed(2);
      }
    },
    //可靠性试验费用USD
    kkxyzfUsd() {
      if (this.form.kkxyzf) {
        let kkxyzfUsd = parseFloat(this.form.kkxyzf) / parseFloat(this.form.myhl);
        this.form.kkxyzfUsd = kkxyzfUsd.toFixed(2);
      }
    },
    //可靠性试验费用EUR
    kkxyzfEur() {
      if (this.form.kkxyzf) {
        let kkxyzfEur = parseFloat(this.form.kkxyzf) / parseFloat(this.form.oyhl);
        this.form.kkxyzfEur = kkxyzfEur.toFixed(2);
      }
    },
    //模具分摊后售价
    mjfthsj() {
      if (this.form.mjzfy && this.form.sl && this.form.jysjRmb) {
        let mjfthsj = parseFloat(this.form.mjzfy) / parseFloat(this.form.sl) + parseFloat(this.form.jysjRmb)
        this.form.mjfthsj = mjfthsj.toFixed(2);
      }
    },
    //模具治具分摊后售价
    mjzjfthsj() {
      if (this.form.mjzfy && this.form.sl && this.form.jysjRmb) {
        console.log("我了");
        let mjzjfthsj = (parseFloat(this.form.mjzfy) + parseFloat(this.form.kkxyzf)) / parseFloat(this.form.sl) + parseFloat(this.form.jysjRmb)
        this.form.mjzjfthsj = mjzjfthsj.toFixed(2);
      }

    },
  },
  watch: {
    'form.xmnbxh'(newVal, oldVal) {
      console.log(newVal, oldVal);
      if (newVal) {
        getKkxbjByXmnbxh(newVal).then(res => {
          let syfy = 0;
          if (res.kkxbjList.length > 0) {
            res.kkxbjList.forEach(e => {
              if (e.syfy) {
                syfy = syfy + e.syfy
              }
            })
          }
          if(!this.form.kkxyzf){
            this.$set(this.form,"kkxyzf",syfy);
          }
        })
      }
    },
    // 监听form对象的变化
    form: {
      handler: function (newValue, oldValue) {
        // 当myObject发生变化时会调用这个处理函数
        console.log('form:', newValue, oldValue);
        if (newValue) {
          this.zzcbxj();
          this.zzsccb();
          this.cbxj();
          this.sccbhj();
          this.sxfy();
          this.gcglfy();
          this.zzcb();
          this.zcb();
          this.cpccb();
          this.jysjRmb();
          this.jysjHs();
          this.jysjEur();
          this.jysjUsd();
          this.mjzfy();
          this.mjzfyUsd();
          this.mjzfyEur();
          this.kkxyzfUsd();
          this.kkxyzfEur();
          this.mjzjfthsj();
          this.mjfthsj();
        }
      },
      deep: true // 表示要深度监听
    },
    bjdxbList: {
      handler: function (newValue, oldValue) {
        // 当myObject发生变化时会调用这个处理函数
        console.log('form:', newValue, oldValue);
        if (newValue) {
          this.zzcbxj();
          this.zzsccb();
          this.cbxj();
          this.sccbhj();
          this.sxfy();
          this.gcglfy();
          this.zzcb();
          this.zcb();
          this.cpccb();
          this.jysjRmb();
          this.jysjHs();
          this.jysjEur();
          this.jysjUsd();
          this.mjzfy();
          this.mjzfyUsd();
          this.mjzfyEur();
          this.kkxyzfUsd();
          this.kkxyzfEur();
          this.mjzjfthsj();
          this.mjfthsj();
        }
      },
      deep: true // 表示要深度监听
    }
  },

};
</script>
