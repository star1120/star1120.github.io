import {getStore} from '../config/mUtils'

const state = {
  linkHistory:JSON.parse(getStore("name"))||[{"name":"首页","index":"index","show":true}]
}

export default state
