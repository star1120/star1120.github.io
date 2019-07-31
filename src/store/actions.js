import * as types from './mutation-types'

export const setlinkHistory = function ({commit}, [list]) {
  commit(types.SET_LINK_HISTORY, list)
}
export const dellinkHistory = function ({commit}, [index]) {
  commit(types.DEL_LINK_HISTORY, index)
}
