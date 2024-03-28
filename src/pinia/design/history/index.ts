/*
 * @Author: Jeremy Yu
 * @Date: 2024-03-18 21:00:00
 * @Description:
 * @LastEditors: Jeremy Yu <https://github.com/JeremyYu-cn>
 * @LastEditTime: 2024-03-27 21:00:00
 */

import { Store, defineStore } from "pinia"
import {pushHistory, pushColorToHistory} from "./actions/pushHistory"
import handleHistory from "./actions/handleHistory"

export type THistoryParamData = {
  index: number
  length: number
  maxLength: number
}

type THistoryState = {
  /** 记录历史操作（保存整个画布的json数据） */
  dHistory: string[]
  /** 记录历史操作对应的激活的组件的uuid */
  dActiveUuidHistory: string[]
  /** 记录历史操作对应的page */
  dPageHistory: string[]
  dHistoryParams: THistoryParamData,
  /** 记录历史选择的颜色 */
  dColorHistory: string[]
}

type THistoryAction = {
  /**
   * 保存操作历史，
   * 修改数据、移动完成后都会自动保存
   * 同时会保存当前激活的组件的uuid，方便撤回时自动激活
   */
  pushHistory: (msg: string) => void
  /**
   * 操作历史记录
   * action为undo表示撤销
   * action为redo表示重做
   */
  handleHistory: (action: "undo" | "redo") => void
  pushColorToHistory: (color: string) => void
}

/** 历史记录Store */
const HistoryStore = defineStore<"historyStore", THistoryState, {}, THistoryAction>("historyStore", {
  state: () => ({
    dHistory: [],
    dHistoryParams: {
      index: -1,
      length: 0,
      maxLength: 20,
    },
    dActiveUuidHistory: [],
    dColorHistory: [],
    dPageHistory: []
  }),

  actions: {
    pushHistory(msg) {
      pushHistory(this, msg)
    },
    handleHistory(action) {
      handleHistory(this, action)
      // 激活组件默认为page
      store.state.dActiveElement = store.state.dPage
    },
    pushColorToHistory(color) {
      pushColorToHistory(this, color)
    }
  }
})

export type THistoryStore = Store<"historyStore", THistoryState, {}, THistoryAction>

export default HistoryStore
