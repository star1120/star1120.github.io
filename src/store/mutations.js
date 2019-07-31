import * as types from './mutation-types'
import 'lodash'

const mutations = {
    [types.SET_LINK_HISTORY](state, list) {
    let item = JSON.parse(localStorage.getItem("name")) || [{"name":"首页","index":"index"}]

    var isna=true;
    for (var i = 0; i < item.length; i++) {
      item[i].show=false;
      if (item[i].name==list.name) {
          isna=false
      }
    }
    if(isna){
      list.show=true;
      item.length>=7&&item.splice(1,1)
      item.push(list)
    }
    state.linkHistory = item
    localStorage.setItem("name", JSON.stringify(item))
  },
  [types.DEL_LINK_HISTORY](state,[items,index]){

    if(index!=0&&index==state.linkHistory.length-1){
      state.linkHistory[index-1].show=true;
    }
    state.linkHistory.splice(index,1)
    localStorage.setItem("name", JSON.stringify(state.linkHistory))
  },
  [types.STATE_LINK_HISTORY](state,[items,index]){

    for(var i=0;i<state.linkHistory.length;i++){
       state.linkHistory[i].show=false;
    }
    state.linkHistory[index].show=true
    localStorage.setItem("name", JSON.stringify(state.linkHistory))
  },
}

export default mutations
