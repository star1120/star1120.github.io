<template>
  <div class="ui-flex-1 ui-mgr-5 ui-mgl-5 ">
    <div class="s_select_dropdown_box">
      <el-input size="small" v-model="getHerbs" placeholder="请输入检索字段" :disabled="herbsType=='2'"></el-input>
      <div class="s_select_dropdown" v-if="selectShow">
        <p class="el-select-dropdown__empty"  v-if="getHerbData.length<=0">
          无数据
        </p>
        <ul class="el-scrollbar__view el-select-dropdown__list" v-if="getHerbData.length>0">
          <li class="el-select-dropdown__item" :class="activeId==item.id?'selected':''" :key="index" v-for="(item,index) in getHerbData" @click="appClick(item)">
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="select_model" v-if="selectShow" @click="closeSelect"></div>
  </div>
  
</template>
 
<script>
  export default {
    data(){
      return {
        getHerbs:'',
        activeId:'',
        selectShow:false, // 是否展示下拉框

      }
    },
    props:{
      'getHerbData':Array,
      'herbsType':String,
    },
    computed:{
    },
    methods:{
      appClick:function(item){
        this.activeId=item.id;
        this.getHerbs='';
        this.$emit('addHerbs',item.id);
        this.selectShow=false;
      },

      // 关闭下拉
      closeSelect(){
        this.getHerbs='';
        this.selectShow=false;
      },
    },
    mounted:function(){
 
    },

    watch:{
      // 手机端检索中药材
      "getHerbs":function(){
        const that=this;
        setTimeout(function(){
          if(that.getHerbs!=""){that.selectShow=true}
          that.$emit('getHerb',that.getHerbs)
        },200)
      },
    },
  }
</script>
 
<style lang="scss" scoped>
  .s_select_dropdown_box{
    position: relative;
    z-index: 99;
    .s_select_dropdown{
      position: absolute;
      top: 44px;
      left: 0px;
      width: 100%;
      background-color: #ffffff;
      border-radius: 5px;
      max-height: 150px;
      overflow-y: scroll;
      border:1px solid #eee;
      box-shadow: 0 0 5px #efefef;
      .selected{
        color: #42a7eb;
      }
    }
  }

  .select_model{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
  }
  
</style>