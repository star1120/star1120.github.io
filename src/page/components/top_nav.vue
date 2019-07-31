<template>
  <div class="nav_right ui-flex-1">
    <!-- <div class="s_title">菜单</div> -->
    <ul class="top_nav">
      <!-- <li :class="nowUrl=='myPatient'?'ac':''" v-if="userInfo.userType==0 || userInfo.userType==1">
        <router-link to="myPatient">
          <i class="fa fa-address-book-o"></i>我的患者
        </router-link>
      </li> -->

      <li :class="nowUrl=='allPatient'?'ac':''" v-if="userInfo.userType==0 || userInfo.userType==1">
        <router-link to="allPatient">
          <i class="fa fa-address-book-o"></i>患者列表
        </router-link>
      </li>
      <li :class="nowUrl=='adminMana'?'ac':''" v-if="userInfo.userType==1">
        <router-link to="adminMana">
          <i class="fa fa-address-book-o"></i>医生列表
        </router-link>
      </li>

      <li
        :class="nowUrl=='prescribed'?'ac':''"
        v-if="userInfo.userType==0 || userInfo.userType==1"
      >
        <router-link to="prescribed">
          <i class="fa fa-address-book-o"></i>已开方列表
        </router-link>
      </li>

      <!-- <li :class="nowUrl=='patientMedicalRecord'?'ac':''" v-if="userInfo.userType==2">
        <router-link to="patientMedicalRecord">
          <i class="fa fa-address-book-o"></i>看病记录
        </router-link>
      </li> -->

      <li
        :class="nowUrl=='unprescribed'?'ac':''"
        v-if="userInfo.userType==0 || userInfo.userType==1"
      >
        <router-link to="unprescribed">
          <i class="fa fa-address-book-o"></i>未开方列表
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import "lodash";

var title = [];
export default {
  data() {
    return {
      barsShows: false,
      barsShow: true,
      screenWidth: document.body.clientWidth, // 这里是给到了一个默认值 （这个很重要）
      userInfo: JSON.parse(localStorage.getItem("userInfo"))
    };
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
      return this.$route.path.replace("/", "");
    }
  },

  methods: {
  },
  watch: {
    $route() {
      if (JSON.parse(localStorage.getItem("userInfo"))) {
        this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        console.log(typeof this.userInfo.userType);
      }
    }
  }
};
</script>

<style lang="scss" scope>
ul.top_nav {
  overflow: hidden;
  li {
    float: left;
    font-size: 14px;
    margin:10px 20px 10px 0;
    i {
      margin-right: 5px;
    }
  }
}
</style>
