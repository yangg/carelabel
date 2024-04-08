/*
 * @Author: ShawnPhang
 * @Date: 2021-08-19 18:43:22
 * @Description:
 * @LastEditors: ShawnPhang <site: book.palxp.com>
 * @LastEditTime: 2023-07-24 13:01:10
 */
import fetch from '@/utils/axios'
import _config from '@/config'

// const screenshot_url = window.location.protocol + '//' + window.location.host + '/draw'
export const download = (params: Type.Object = {}) => `${_config.SCREEN_URL}/api/screenshots?id=${params.id}&width=${params.width}&height=${params.height}`

type IGetTempListParam = {
  search: string
  page: number
  pageSize: number
  cate: number | string
}
export type IGetTempListData = {
  cover: string
  height: number
  id: number
  state: number
  title: string
  width: number
  isDelect: boolean
  fail: boolean
  top: number
  left: number
  data?: string
  listWidth?: number
  gap?: number
  thumb?: string
  url: string
  model?: string
  color?: string
}
type IGetTempListResult = TPageRequestResult<IGetTempListData[]>

// 获取模板列表
export const getTempList = (params: IGetTempListParam) => fetch<IGetTempListResult>('design/list', params, 'get')

export type TGetTempDetail = {
  id: number
  type?: number
}

export type TTempDetail = {
  /** 分类 */
  category: number
  /** 封面 */
  cover: string
  /** 创建时间 */
  created_time: string
  /** Template内容 */
  data: string
  /** 高度 */
  height: number
  id: number
  /** 来源 */
  original: string
  resource: string
  state: string
  tag: string | null
  title: string
  updated_time: string
  width: number
}

export const getTempDetail = (params: TGetTempDetail) => fetch<TTempDetail>('design/temp', params, 'get')

type TGetCategoriesParams = {
  type?: number
}
export type TGetCategoriesData = {
  id: number
  name: string
  pid: number
  type: number
}
type TgetCategoriesResult = TCommResResult<TGetCategoriesData>

export const getCategories = (params: TGetCategoriesParams) => fetch<TgetCategoriesResult[]>('design/cate', params, 'get')


// 保存模板
export const saveTemp = (params: Type.Object = {}) => fetch('design/edit', params, 'post')
// export const delTemp = (params: Type.Object = {}) => fetch('/api/template/temp_del', params)

type TGetCompListParam = {
  search?: string
  page?: number
  type?: number
  pageSize: number
  cate?: number | string
}

/** 获取组件返回类型 */
export type TGetCompListResult = {
  cover: string
  height: number
  id: number
  state: number
  title: string
  width: number
  name?: string
}

type getCompListReturn = TPageRequestResult<TGetCompListResult[]>

// 组件相关接口
export const getCompList = (params: TGetCompListParam) => fetch<getCompListReturn>('design/list', params, 'get')

type TRemoveComp = {
  id: string | number
}

export const removeComp = (params: TRemoveComp) => fetch<void>('design/del', params, 'post')
// export const getCompDetail = (params: Type.Object = {}) => fetch('/api/template/temp_info', params, 'get')

type TSaveWorksParams = {
  title: string
  temp_id?: string
  width: number
  height: number
  data: object
  cover?: string
  id?: string | number
}

export type TSaveWorksResult = {
  id: number | string,
  stat?: number,
  msg: string
}

// 保存作品
export const saveWorks = (params: TSaveWorksParams) => fetch<TSaveWorksResult>('design/save', params, 'post')

// 保存个人模板
export const saveMyTemp = (params: Type.Object = {}) => fetch('design/user/temp', params, 'post')

// 获取作品
export const getWorks = (params: TGetTempDetail) => fetch<TTempDetail>('design/poster', params, 'get')

type TGetMyDesignParams = {
  page: number
  pageSize: number
}

type TGetMyDesignResult = TPageRequestResult<IGetTempListData[]>

// 作品列表
export const getMyDesign = (params: TGetMyDesignParams) => fetch<TGetMyDesignResult>('design/my', params, 'get')
