<template>
  <div class="myPatient">
    <v-top></v-top>
    <div class="ui-flex">
      管理员列表
    </div>
    <div class="ui-flex ui-flex-wrap ui-mgt-15 ui-mgb-15">
      <div class="ui-w-160 ui-mgr-6">
        <el-input  size="mini" placeholder="姓名/手机号" v-model="searchData"></el-input>
      </div>
      <div class="ui-flex-1"></div>
      <el-button size="mini" type="primary" @click="addPaitent">新管理员</el-button>
    </div>
    <div class='patient_table'>
      <el-table
        :data="adminUserLists"
        height="100%"
        border
        style="width: 100%">
        <el-table-column
          prop="username"
          label="登陆名">
        </el-table-column>
         <el-table-column
          prop="openid"
          label="openid">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="createtime"
          label="创建时间"
          width="200"
          >
        </el-table-column>
        <el-table-column
          label="操作"
          width="130"
          >
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text" size="small">修改</el-button>
            <el-button type="text" size="small" @click="delAdminUser(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    
    <!-- 分页 -->
    <div class="pages">
      <pages ref="pages" v-on:getPatientInfo="adminUserList" v-if="total" :total="total"></pages>
    </div>
    
    <!-- 编辑病人病例信息 -->
    <el-dialog
      title="提示"
      :visible.sync="adminDialogVisible"
      @close="closeAdminDialog"
      :width="screenWidth>1024?'300px':'96%'">
      <div class="ui-flex">
        <div class="ui-w-60 ui-lh-32">姓名：</div>
        <el-input size="small" v-model="ruleForm.username"></el-input>
      </div>
      <div class="ui-flex">
        <div class="ui-w-60 ui-lh-32">openid：</div>
        <el-input size="small" v-model="ruleForm.openid"></el-input>
      </div>
      <div class="ui-flex ui-mgt-15">
        <div class="ui-w-60 ui-lh-32">密码：</div>
        <el-input size="small" v-model="ruleForm.password"></el-input>
      </div>
      <div class="dialog-footer ui-flex ui-mgt-20 ui-pdb-20">
        <div class="ui-flex-1"></div>
        <el-button size="small" @click="adminDialogVisible = false" >取消</el-button>
        <el-button size="small" type="primary" @click="addAdmin" v-if="!isEdit">新增</el-button>
        <el-button size="small" type="primary" @click="editAdmin" v-if="isEdit">编辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import path from "../../service/path";
  import pages from '../components/pages.vue';
  import VTop from '../components/top_nav.vue';
  export default {
    data () {
      return {
        screenWidth: document.body.clientWidth,   // 这里是给到了一个默认值 （这个很重要）
        // 以上为临时绑定变量
        ruleForm: {
          username: '',
          password: ''
        },
        adminUserLists: [], // 所有患者
        searchData:'', // 患者检索字段
        adminDialogVisible:false, // 管理员信息  弹窗
        patientId:'', // 当前患者id
        isEdit:'', // 是否编辑
        total:null, // 总条数
      };
    },
    created(){
      // 6、管理员列表
      this.adminUserList();
    },
    methods: {
      // 获取管理员列表
      adminUserList({pageNo=1,pageSize=10} =  {}){
        const that=this;
        this.$api.get(path.adminUserList,{
          "username":that.searchData,
          "pageNo":pageNo,
          "pageSize":pageSize,
        },function(res){
          that.adminUserLists=res.data;
          that.total=res.totalCount;
        })
      },

      // 删除管理员
      delAdminUser(row){
        const that=this;
        that.$confirm('此操作将永久删除该管理员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(2)
          that.$api.post(path.delAdminUser,{
            "id":row.id, // 用户ID
          },function(res){
            that.$message.success('操作成功！');
            that.adminUserList();
          })
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },

      // 新增管理员
      addAdmin(){
        const that = this;
        that.$api.post(path.addAdminUser,{
          "username":that.ruleForm.username,
          "password":that.ruleForm.password,
          "openid":that.ruleForm.openid,
        },function(res){
          that.$message.success('操作成功！');
          that.adminDialogVisible=false;
        })
      },

      // 编辑管理员
      editAdmin(){
        const that = this;
        that.$api.post(path.editAdminUser,{
          "id":that.patientId,
          "name":that.ruleForm.username,
          "password":that.ruleForm.password,
          "openid":that.ruleForm.openid
        },function(res){
          that.$message.success('操作成功！');
          that.adminDialogVisible=false;
        })
      },

      // 关闭编辑个人病历信息 弹窗
      closeAdminDialog(){
        const that=this;
        this.adminDialogVisible=false;
        this.$refs.pages.resetPages(); // 重置分页数据
        this.adminUserList(); // 获取列表数据
        Object.keys(that.ruleForm).forEach(function(key){
          that.$set(that.ruleForm,key,'')
        })
      },

      // 打开编辑弹窗
      edit(row) {
        const that=this;
        this.adminDialogVisible=true;
        this.isEdit=true; // 新增
        that.patientId=row.id; // 患者ID
        Object.keys(row).forEach(function(key){
          that.$set(that.ruleForm,key,row[key])
        })
      },

      // 打开新增弹窗
      addPaitent(){
        const that=this;
        this.adminDialogVisible=true;
        this.isEdit=false; // 新增
      },

    },
    components: {      
      'pages': pages,
      VTop
    },

    watch:{
      // 检索狂自动搜索
      "searchData":function(){
        const that=this;
        setTimeout(function(){
          that.adminUserList();
        },200)
      }
    }
  }

</script>

<style lang="scss" scoped>
  // 患者列表
  .myPatient{
    position: relative;
    padding-bottom: 0;
    height: 100%;
    i{
      font-size: 12px;
      color: #999999;
    }
    .pages{
      position: absolute;
      bottom: 0;
      right: 0;
    }

  }
</style>


