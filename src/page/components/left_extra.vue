<template>
    <div class="ui-flex nav" :class="barsShow?'ui-w-230':'ui-w-58'">

        <ul class="ui-w-58">
            <div v-if="barsShows" class="left_bars" @click="switchBars"><i class="fa fa-list"></i></div>
            <li><i class="fa fa-tv"></i>111</li>
            <li class="on"><i class="fa fa-user-md"></i>222</li>
            <li><i class="fa fa-cog"></i>333</li>
            <li><i class="fa fa-medkit"></i>444</li>
            <li><i class="fa fa-jpy"></i>555</li>
            <li><i class="fa fa-line-chart "></i>666</li>
            <li><i class="fa fa-th-large"></i>777</li>
        </ul>
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
                console.log(this.barsShow)
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

<style lang="scss">

</style>
