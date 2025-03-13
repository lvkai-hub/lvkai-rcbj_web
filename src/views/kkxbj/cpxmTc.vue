<template>
    <div class="app-container">
        <el-dialog title="项目信息" :visible.sync="dialogCpxmTc" width="85%" :close-on-click-modal="false"
            :show-close='false'>
            <el-form :model="queryParams" ref="queryForm" size="mini" :inline="true" v-show="showSearch"
                label-width="68px">
                <!-- <el-form-item label="项目编码" prop="xmbm">
                    <el-input v-model="queryParams.xmbm" placeholder="请输入项目编码" clearable
                        @keyup.enter.native="handleQuery" />
                </el-form-item> -->
                <el-form-item label="项目名称" prop="xmmc">
                    <el-input v-model="queryParams.xmmc" placeholder="请输入项目名称" clearable
                        @keyup.enter.native="handleQuery" />
                </el-form-item>
                <el-form-item label="型号" prop="dcxh">
                    <el-input v-model="queryParams.dcxh" placeholder="请输入型号" clearable
                        @keyup.enter.native="handleQuery" />
                </el-form-item>
                <el-form-item label="客户编码" prop="khbm">
                    <el-input v-model="queryParams.khbm" placeholder="请输入客户编码" clearable
                        @keyup.enter.native="handleQuery" />
                </el-form-item>
                <el-form-item label="客户料号" prop="khxh">
                    <el-input v-model="queryParams.khxh" placeholder="请输入客户料号" clearable
                        @keyup.enter.native="handleQuery" />
                </el-form-item>
                <el-form-item label="项目类型" prop="xmlx">
                    <el-input v-model="queryParams.xmlx" placeholder="请输入项目类型" clearable
                        @keyup.enter.native="handleQuery" />
                </el-form-item>
                <el-form-item label="组件型号" prop="zjxh">
                    <el-input v-model="queryParams.zjxh" placeholder="请输入组件型号" clearable
                        @keyup.enter.native="handleQuery" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                    <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
                </el-form-item>
            </el-form>

            <!-- <el-row :gutter="10" class="mb8">
                <el-col :span="1.5">
                    <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
                        v-hasPermi="['system:cpxmb:add']">新增</el-button>
                </el-col>
                <el-col :span="1.5">
                    <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single"
                        @click="handleUpdate" v-hasPermi="['system:cpxmb:edit']">修改</el-button>
                </el-col>
                <el-col :span="1.5">
                    <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple"
                        @click="handleDelete" v-hasPermi="['system:cpxmb:remove']">删除</el-button>
                </el-col>
                <el-col :span="1.5">
                    <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
                        v-hasPermi="['system:cpxmb:export']">导出</el-button>
                </el-col>
                <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
            </el-row> -->

            <el-table v-loading="loading" :data="cpxmbList" @selection-change="handleSelectionChange"
                @cell-dblclick="dblclick">
                <el-table-column type="selection" width="55" align="center" />
                <!-- <el-table-column label="项目编码" align="center" prop="xmbm" /> -->
                <el-table-column label="项目名称" align="center" prop="xmmc" />
                <el-table-column label="型号" align="center" prop="dcxh" />
                <el-table-column label="材质" align="center" prop="dccz" />
                <el-table-column label="客户编码" align="center" prop="khbm" />
                <el-table-column label="客户料号" align="center" prop="khxh" />
                <el-table-column label="项目类型" align="center" prop="xmlx" />
                <el-table-column label="数量" align="center" prop="sl" />
                <el-table-column label="组件型号" align="center" prop="zjxh" />
                <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
                            v-hasPermi="['system:cpxmb:edit']">修改</el-button>
                        <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
                            v-hasPermi="['system:cpxmb:remove']">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
                :limit.sync="queryParams.pageSize" @pagination="getList" />
            <span slot="footer" class="dialog-footer">
                <el-button @click="no">取 消</el-button>
                <el-button type="primary" @click="no">确 定</el-button>
            </span>
        </el-dialog>
    </div>

</template>

<script>
import { listCpxmb, getCpxmb, delCpxmb, addCpxmb, updateCpxmb } from "@/api/cpxmb/cpxmb";
export default {
    props: ['dialogCpxmTc'],
    name: "CpxmbTc",
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
                xmbm: [
                    { required: true, message: "项目编码不能为空", trigger: "blur" }
                ],
                dcxh: [
                    { required: true, message: "项目编码不能为空", trigger: "blur" }
                ],
                khbm: [
                    { required: true, message: "项目编码不能为空", trigger: "blur" }
                ],
            },
            xmcj: []
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
            if (selection.length > 1) {
                this.$modal.msgError("请选择一条");
            }
            this.xmcj = selection
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
            this.download('system/cpxmb/export', {
                ...this.queryParams
            }, `cpxmb_${new Date().getTime()}.xlsx`)
        },
        no() {
            this.$emit('fclick', this.xmcj)
        },
        dblclick(row) {
            console.log(row);
            this.$emit('fclick', row)
        }
    }
};
</script>