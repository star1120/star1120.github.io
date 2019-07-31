<template>
    <div class="demo_page">
        <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>

        <el-dialog
                title="Dashboard/慢页面详情"
                :visible.sync="dialogVisible"
                width="1340px">

            <div class="demo_inner_page">

                <div class="top_time ui-flex">
                    <div class="ui-flex-1">
                        cbps.e-chinalife.com/mcss/mcss/index.html#/tabeRsmoniter?
                    </div>
                    <el-date-picker
                            size="small"
                            v-model="value1"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </div>

                <el-table
                        border
                        :header-cell-style="getRowClass"
                        :data="tableDataOne"
                        style="width: 100%">
                    <el-table-column
                            align="center"
                            prop="date"
                            label="页面名称">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="name"
                            label="调用总数">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="address"
                            label="页面平均加载时间（ms）">
                    </el-table-column>
                </el-table>

                <h3 class="title">
                    页面访问详细信息
                </h3>

                <el-table
                        border
                        :header-cell-style="getRowClass"
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column
                            width="150"
                            type="index"
                            align="center"
                            label="序号">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="date"
                            label="访问时间">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="name"
                            label="访问IP">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="address"
                            label="浏览器">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="address1"
                            label="操作系统">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="address2"
                            label="响应时间（ms）">
                    </el-table-column>
                </el-table>

            </div>

            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="small" @click="dialogVisible = false">关闭</el-button>
              </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dialogVisible: false,
                value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
                tableDataOne: [{
                    date: 'cbps.e-chinalife.com/mcss/mcss/index.html#/tabeRsmoniter?',
                    name: '1',
                    address: '40579'
                }],
                tableData: [
                    {
                        date: '2019-04-26 09:56:33',
                        name: '222.88.147.36',
                        address: 'Chrome 49.0',
                        address1: 'Android 6.0',
                        address2: '40579',
                    },
                    {
                        date: '2019-04-26 09:56:33',
                        name: '222.88.147.36',
                        address: 'Chrome 49.0',
                        address1: 'Android 6.0',
                        address2: '40579',
                    },
                    {
                        date: '2019-04-26 09:56:33',
                        name: '222.88.147.36',
                        address: 'Chrome 49.0',
                        address1: 'Android 6.0',
                        address2: '40579',
                    },
                    {
                        date: '2019-04-26 09:56:33',
                        name: '222.88.147.36',
                        address: 'Chrome 49.0',
                        address1: 'Android 6.0',
                        address2: '40579',
                    },
                    {
                        date: '2019-04-26 09:56:33',
                        name: '222.88.147.36',
                        address: 'Chrome 49.0',
                        address1: 'Android 6.0',
                        address2: '40579',
                    }
                ]
            };
        },
        created() {

        },
        methods: {
            //设置表格第一行的颜色
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex == 0) {
                    return 'background: #E8F2FB;height:51px;color:#454E63; font-size:16px;'
                } else {
                    return ''
                }
            }

        },
    };

</script>

<style lang="scss" scoped>
    .ui-flex {
        display: flex;
    }

    .ui-flex-1 {
        flex: 1;
    }

    .demo_page {
        .demo_inner_page {
            padding-bottom: 50px;
            .top_time {
                margin-top: 18px;
                margin-bottom: 14px;
            }

            .title {
                margin-top: 25px;
                font-size: 16px;
            }

        }
    }

    .el-range-editor--small.el-input__inner{
        border-radius: 16px;
        border-color: #409EFF;
    }

</style>


