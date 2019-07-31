<template>
  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagingTion.pageNo" :page-size="pagingTion.pageSize" :layout="layout" :total="total">
  </el-pagination>
</template>

<script>

  export default {
    data() {
      return {
        screenWidth: document.body.clientWidth,   // 这里是给到了一个默认值 （这个很重要）
        pagingTion:{
          pageNo:1,
          pageSize:10,
        },

      };
    },
    props:['total'],
    computed:{
      layout:function(){
        // 初始化，通过判断屏幕的宽度，确定个人信息是否展示
        if(this.screenWidth<=640){
          return "prev, next, jumper";
        }else{
          return "prev, pager, next, jumper";
        }
      },
    },
    created(){
      const that=this;
      console.log(that.total)
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      // 重置分页
      resetPages(){
        this.pagingTion={
          pageNo:1,
          pageSize:10,
        };
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pagingTion.pageNo=val;
        this.$emit('getList',this.pagingTion);
      }
    },
    
  }

</script>

<style lang="scss">
  .el-pager li.active{
    color: #409EFF;
  }
</style>
