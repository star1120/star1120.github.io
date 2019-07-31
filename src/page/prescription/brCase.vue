<template>
    <!-- 各论 弹窗 -->
    
    <div>
      <!-- 新增增减量 start -->
      <el-dialog
        width="300px"
        :title="preionsTitle"
        :visible.sync="gelun_innerVisible"
        @close="closePreions"
        append-to-body>
        <div class="ui-flex ui-mgb-20">
          <i class="fa fa-plus ui-mgr-10 ui-mgt-6" v-if="addPreionsData.type=='1'"></i>
          <i class="fa fa-minus ui-mgr-10 ui-mgt-6" v-if="addPreionsData.type=='0'"></i>
          <el-select
              class="ui-w-80 ui-mgr-10"
              @change="setPreionsName"
              v-model="addPreionsData.id"
              filterable
              remote
              size="mini"
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              :loading="loading">
              <el-option
                v-for="item in getHerbData"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
          </el-select>
          <el-input size="mini" class="ui-w-80 ui-mgr-10" v-model="addPreionsData.weight"></el-input>
          <el-input size="mini" class="ui-w-80 ui-mgr-10"></el-input>
        </div>
        <div class="ui-flex ui-pdb-10">
          <div class="ui-flex-1"></div>
          <el-button size="small" @click="gelun_innerVisible = false">取 消</el-button>
          <el-button size="small" type="primary" @click="savePreion">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 编辑增减量 end -->
      <div class="ui-flex ui-flex-wrap">
        <div class="gelun_dialog_left">
          <div class="ui-flex gelun_dialog_title">病侯/病例分类</div>
          <!-- 左侧配方分类 -->
          <div class="gelun_dialog_left_cont" >
            <el-tree :data="classify" node-key="id" default-expand-all :expand-on-click-node="false">
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span @dblclick="() => change(data)" v-if="!data.show"  class="ui-ellipsis" @click="() => getPreion(data)">{{ data.name }}</span>
                <el-input size="mini" @change="() => editClasify(data)" v-model="data.name" v-if="data.show" style="width:100px;"></el-input>
                <div class="ui-flex-1 ui-mgr-20"></div>
                {{data.parentId}}
                <el-button type="text" size="mini" @click="() => append(data)">
                  <i class="fa fa-plus-circle" style="font-size:16px;"></i>
                </el-button>
                <el-button type="text" size="mini" @click="() => deleteClasify(node, data)">
                  <i class="fa fa-minus-circle" style="font-size:16px;"></i>
                </el-button>
              </span>
            </el-tree>
          </div>
        </div>
        <!-- 右侧增减量 -->
        <div class="ui-flex-1 gelun_dialog_right">
          <div class="ui-flex gelun_dialog_title">开药方</div>
          <div class="g_title">处方</div>
          <div class="ui-flex ui-flex-wrap g_items">
            <div v-for="item,index in herbs" :key="index">{{item.name}}<span>{{item.weight}}g</span></div>
          </div>
          <div class="g_increase">
            <div class="ui-flex g_add">
              <b>增量：</b>
              <div class="ui-flex-1 ui-flex ui-flex-wrap">
                <el-checkbox-group v-model="addLists" class="i_item ui-flex" >
                    <el-checkbox class="ui-mgr-3" :label="item.id" @change="handleCheckedCitiesChange(item.id,1)" :key="index" v-for="item,index in dialogPreions" v-if="item.type=='1'" >
                      <div @dblclick="editIncrease(item.id)" >
                        <span>+</span>
                        <span>{{item.id}}</span>
                        <span>{{item.name}}</span>
                        <i>{{item.weight}}</i>
                        <i>g</i>
                        <i class="fa fa-times" @click="deletePreions(index)"></i>
                      </div>
                    </el-checkbox>
                </el-checkbox-group>
              </div>
              <div class="a_btn ui-pdr-6">
                <el-button type="text" size="mini" @click="addPreions('1')" :disabled="preionsData.id==''" icon="el-icon-plus"></el-button>
              </div>
            </div>
            <div class="ui-flex g_reduce">
              <b>减量：</b>
              <div class="ui-flex-1 ui-flex ui-flex-wrap">
                <el-checkbox-group v-model="reduceLists" class="i_item ui-flex" >
                    <el-checkbox class="ui-mgr-3" :label="item.id" @change="handleCheckedCitiesChange(item.id,0)" :key="index" v-for="item,index in dialogPreions" v-if="item.type=='0'" >
                      <div @dblclick="editIncrease(item.id)" >
                        <span>-</span>
                        <span>{{item.name}}</span>
                        <i>{{item.weight}}</i>
                        <i>g</i>
                        <i class="fa fa-times" @click="deletePreions(index)"></i>
                      </div>
                    </el-checkbox>
                </el-checkbox-group>
              </div>
              <div class="a_btn ui-pdr-6">
                <el-button type="text" size="mini" @click="addPreions('0')" :disabled="preionsData.id==''" icon="el-icon-plus"></el-button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="dialog-footer ui-flex ui-mgt-20 ui-pdb-20">
        <div class="ui-flex-1"></div>
        <el-button size="small" @click="getChildDatas(false)">重置</el-button>
        <el-button size="small" type="primary" @click="getChildDatas(false)">组方</el-button>
        <el-button size="small" type="success" @click="getChildDatas(false)">确认</el-button>
      </div>
    </div>
    
</template>

<script>
  import path from "../../service/path";
  export default {
    data () {
      return {
        gelun_innerVisible:false, // 新增增减量
        gelun_innerVisibleEdit:false, // 编辑增减量
        nowPreionsData:null, // 当前 增减量数据
        classify:[], // // 左侧中药分类
        preions:[
          {id:'',type:'',name:'',weight:''},
        ], // 获取增删的处方

        dialogPreions:[], // 获取增删的处方
        addPreionsData:{id:'',type:'',name:'',weight:''}, // 新增的数据
        editPreionsData:{id:'',type:'',name:'',weight:''}, // 新增的数据

        preionsType:'',  // 增减量类型
        preionsTitle:'',  // 增减量弹窗标题
        preionsData:'', // 当前选中的数据
        preionsId:'', //处方ID

        loading: false,
        getHerbData:[], // 中药查询结果
        reduceLists: [], // 多选框 增减量  增项
        addLists: [], // 多选框 增减量  减项

        addAndReduceId:'', // 当前增减量ID

        isAdd:false, // 是否新增增减量
      };
    },
    props:[
    "herbs"
    ],
    created(){

      // 8、获取所有分类
      this.getClass();
      
    },
    mounted() {
      
    },
    computed:{

    },

    methods: {
      // 关闭 各论 弹窗
      getChildDatas(item){
        this.$emit('getChildData',item)
      },
      // 获取中药材
      remoteMethod(query) {
        const that=this;
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.$api.post(path.getHerb,{
              "name":query,
              "isLike":0,
              "pageNo":1,
              "pageSize":100
            },function(res){
              that.getHerbData=res;
            })
          }, 200);
        } else {
          that.getHerbData = [];
        }
      },

      // 各论 弹窗 操作函数
        // 8、获取所有分类列表
        getClass(){
          const that=this;
          that.classify=[]; // 先清空所有分类
          this.$api.get(path.getClass,{},function(res){
            Object.keys(res).forEach(function(key){
              that.classify.push(res[key])
            })
          })
        },

        //  新增分类
        append(data) {
          const newChild = { id: '',parentId: data.id, name: '请输入分类名' ,show:true};
          if (!data.children) {
            this.$set(data, 'children', []);
          }
          data.children.push(newChild);
        },

        // 编辑分类  输入完成后，调后新增接口
        editClasify(data){
          data.show=false;
          const that=this;
          // 新增分类 分类ID 为空，则为新增
          if(data.id==''){
            this.$api.post(path.addClass,{
              parentId:data.parentId,
              name:data.name,
            },function(res){
              that.$message.success('操作成功！');
              that.getClass();
            })
            return
          }
          
          // 编辑分类
          this.$api.post(path.saveClass,{
            classId:data.id,
            parentId:data.parentId,
            name:data.name,
          },function(res){
            that.$message.success('操作成功！');
            that.getClass();
          })

        },

        // 双击操作 将分类名称 切换为可编辑状态
        change(data){
          data.show=true;
        },

        // 删除分类
        deleteClasify(node, data) {
          const that=this;
          this.$api.get(path.delClass,{
            classId:data.id,
          },function(res){
            that.$message.success('操作成功！');
            that.getClass();
          })
        },

        // 单击分类 获取 增减量  type:0 减   1：加   weight 重量(克)  id:中药ID  name:中药名称
        getPreion(data){
          const that=this;
          if(data){
            this.preionsData=data;
          } // 保存当前增减量ID
          this.$api.get(path.getPreionByClass,{
            classId:that.preionsData.id,
          },function(res){
            // 数据为空 终止执行
            if(res==0){
              that.preionsId='';
              that.dialogPreions=[];
              return
            }
            that.dialogPreions=JSON.parse(res[0].content);
            that.jisuanPreions();  // 获取增减量后  自动计算
            that.preionsId=res[0].id;

            // 默认全部勾选
            that.dialogPreions.forEach(function(val){
              val.checked=true;
            })

            console.log(that.dialogPreions)

          })
        },

        // 编辑增减量
        editIncrease(id){
          const that=this;
          this.gelun_innerVisible=true; // 编辑弹窗打开
          this.addAndReduceId=id;
          this.dialogPreions.forEach(function(value){
            if(id==value.id){
              that.addPreionsData=value;
            }
          })

          this.remoteMethod(id); // 获取中药列表
        },

        // 新增增减量
        addPreions(type){
          const that=this;
          this.isAdd=true; // 新增增减量
          this.preionsType=type; // 当前新增的类型
          this.gelun_innerVisible=true; // 打开编辑增减量弹窗
          // 新增增量
          if(type=='1'){
            this.preionsTitle='新增增量';
            that.$set(that.addPreionsData,'type','1');
          }

          // 新增减量
          if(type=='0'){
            this.preionsTitle='新增减量';
            that.$set(that.addPreionsData,'type','0');
          }
        },

        // 设置 增减量 JSON 药材名字
        setPreionsName(){
          const that=this;
          this.getHerbData.forEach(function(val){
            if(that.addPreionsData.id==val.id){
              that.addPreionsData.name=val.name;
            }
          })
        },

        // 删除药材增减量
        deletePreions(idx){
          this.dialogPreions.splice(idx,1); // 本地数据删除当前项
          this.savePreion();
        },

        // 关闭 或 取消 新增增减量 弹窗
        closePreions(){
          const that=this;
          Object.keys(that.addPreionsData).forEach(function(key){
            that.$set(that.addPreionsData,key,'');
          })

          this.getPreion(); // 加载当前分类  增减量 列表

        },

        // 9、根据疾病设置增减药材
        savePreion(){
          const that=this;
          // 如果是新增 增减量  不添加数据
          if(this.isAdd){
            this.dialogPreions.push(this.addPreionsData)
          }
          this.$api.post(path.savePreionByClass,{
            classId:that.preionsData.id,
            preion:JSON.stringify(this.dialogPreions),
            id:that.preionsId,
          },function(res){
            this.$message.success('操作成功！');
            this.gelun_innerVisible=false; // 关闭弹窗
            this.getPreion(); // 获取增减量 列表
            this.isAdd=false; // 
          })
        },


      // 弹窗内 计算药材
      jisuanPreions(){
        const that=this;
        this.herbs.forEach(function(value){
          that.dialogPreions.forEach((val)=>{
            if(value.id==val.id){
              // 计算增量
              if(val.type=='1'){
                value.weight=value.weight*1+val.weight*1;
              }
              // 计算减量
              if(val.type=='0'){
                value.weight=value.weight*1-val.weight*1;
              }
            }else{
              console.log(val)
              if(val.type=='1'){
                that.herbs.push(val)
              }
            }
          })
        })

        // 默认增减量 全选
        that.dialogPreions.forEach((val)=>{
          if(val.type=='1'){
            that.addLists.push(val.id)
          }
          // 计算减量
          if(val.type=='0'){
            that.reduceLists.push(val.id)
          }
        })

      },

      // 清空 preions 数据
      clearPreions(){
        this.dialogPreions=[];
      },

      handleCheckedCitiesChange(id,type){
        console.log(this.addLists)
        const that=this;
        // 增量
        // if(type==1){
        //   this.addLists.forEach(function(val){
        //     if(val==id){
        //       that.dialogPreions.forEach(function(value){
        //         if(value.id==id){
        //           value.checked=true;
        //         }
        //       })
        //     }else{
        //       that.dialogPreions.forEach(function(value){
        //         if(value.id==id){
        //           value.checked=false;
        //         }
        //       })
        //     }
        //   })

        //   console.log(that.dialogPreions)
        // }

        // // 减量
        // if(type==0){

        // }

      },

    },

    watch:{

    }
  }

</script>

<style >

</style>


