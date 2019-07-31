<template>
    <div class="ui-flex nav" :class="barsShow?'ui-w-2301':'ui-w-58'">

        <ul class="ui-w-58">
            <div v-if="barsShows" class="left_bars" @click="switchBars"><i class="fa fa-list"></i></div>
            <li><i class="fa fa-tv"></i></li>
            <li v-if="userInfo.userType==1" :class="nowUrl=='myPatient' || nowUrl=='prescribed' || nowUrl=='allPatient' || nowUrl=='adminMana' || nowUrl=='docMedicalRecord' || nowUrl=='unprescribed'?'on':''">
                <router-link to='allPatient'>
                    <i class="fa fa-cog"></i>
                </router-link>
            </li>
            <li v-if="userInfo.userType==0" :class="nowUrl=='myPatient' || nowUrl=='prescribed' || nowUrl=='allPatient' || nowUrl=='adminMana' || nowUrl=='docMedicalRecord' || nowUrl=='unprescribed'?'on':''">
                <router-link to='allPatient'>
                    <i class="fa fa-user-md"></i>
                </router-link>
            </li>
            <li v-if="userInfo.userType==1" :class="nowUrl=='medicine'?'on':''">
                <router-link to='medicine'>
                    <i class="fa fa-medkit"></i>
                </router-link>
            </li>
            <li v-if="userInfo.userType==1" :class="nowUrl=='various'?'on':''">
                <router-link to='various'>
                    <i class="fa fa-jpy"></i>
                </router-link>
            </li>
            <li v-if="userInfo.userType==1">
                <router-link to='prescription_doc'>
                    <i class="fa fa-line-chart "></i>
                </router-link>
            </li>
            <!-- <li><i class="fa fa-th-large"></i></li> -->
        </ul>

        <!-- <div class="nav_right ui-flex-1">
            <div class="s_title">菜单</div>
            <ul>
                <li :class="nowUrl=='myPatient'?'ac':''" v-if="userInfo.userType==0 || userInfo.userType==1">
                    <router-link to='myPatient'>
                        <i class="fa fa-address-book-o"></i>我的患者
                    </router-link>
                </li>

                <li :class="nowUrl=='allPatient'?'ac':''" v-if="userInfo.userType==1">
                    <router-link to='allPatient'>
                        <i class="fa fa-address-book-o"></i>患者列表
                    </router-link>
                </li>
                <li :class="nowUrl=='adminMana'?'ac':''" v-if="userInfo.userType==1">
                    <router-link to='adminMana'>
                        <i class="fa fa-address-book-o"></i>医生列表
                    </router-link>
                </li>

                <li :class="nowUrl=='docMedicalRecord'?'ac':''" v-if="userInfo.userType==0 || userInfo.userType==1">
                    <router-link to='docMedicalRecord'>
                        <i class="fa fa-address-book-o"></i>病例列表
                    </router-link>
                </li>

                <li :class="nowUrl=='patientMedicalRecord'?'ac':''" v-if="userInfo.userType==2">
                    <router-link to='patientMedicalRecord'>
                        <i class="fa fa-address-book-o"></i>看病记录
                    </router-link>
                </li>

                <li :class="nowUrl=='unprescribed'?'ac':''" v-if="userInfo.userType==0 || userInfo.userType==1">
                    <router-link to='unprescribed'>
                        <i class="fa fa-address-book-o"></i>未开方列表
                    </router-link>
                </li>

            </ul>
        </div> -->
    </div>
</template>

<script>
    import {mapMutations, mapGetters} from 'vuex'
    import 'lodash'

    var title = [];
    export default {
        data() {
            return {
                barsShows: false,
                barsShow: true,
                screenWidth: document.body.clientWidth,   // 这里是给到了一个默认值 （这个很重要）
                userInfo:JSON.parse(localStorage.getItem("userInfo")),
            }
        },
        created() {
            const that = this;
            // 初始化，通过判断屏幕的宽度，确定个人信息是否展示
            if (this.screenWidth <= 1024) {
                this.barsShow = false;
                this.barsShows = true;
            } else {
                this.barsShow = true;
            }
        },
        computed: {
            nowUrl() {
                return this.$route.path.replace('/', '');
            },
        },

        methods: {
            // 隐藏患者菜单
            switchBars() {
                this.barsShow = !this.barsShow;
            },
        },
        watch:{
            $route(){
                if(JSON.parse(localStorage.getItem('userInfo'))){
                    this.userInfo=JSON.parse(localStorage.getItem('userInfo'));
                    console.log(typeof this.userInfo.userType)
                }
            },
        }

    };
</script>

<style lang="scss" scoped>
    .ui-flex.nav li a {
        color:#939da8;
    }
</style>
