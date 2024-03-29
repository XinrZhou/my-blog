import { request } from '@/api/http'
import { User, Article, Message, PageInfo } from '@/types/type'
import axios from 'axios'

// 登录
export function reqPostLogin(data: User) {
  return request({
    url: '/admin/login',
    data,
    method: 'post'
  })
}

// 获取用户信息 -- id
export function reqGetAdminInfo() {
  return request({
    url: '/admin/info',
    method: 'get'
  })
}

// 修改基本信息
export function reqPostBasicInfo(data: User) {
  return request({
    url: `/admin/info`,
    data,
    method: 'post'
  })
}

// 修改密码
export function reqPutPwd(pwd: string) {
  return request({
    url: `/admin/password/${pwd}`,
    method: 'put'
  })
}

// 添加博客
export function reqPostArticle(data: Article) {
  return request({
    url: `/article/addarticle`,
    data,
    method: 'post',
  })
}

// 上传图片
export function reqPostArticleImg(data: any) {
  let options = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  return request({
    url: `/article/addarticleimg`,
    method: 'post',
    data,
    options
  })
}

// 获取博客列表
export function reqGetArticles(page: number, pageSize: number) {
  return request({
    url: `/front/articles/${page}/${pageSize}`,
    method: 'get'
  })
}

// 修改博客
export function reqPutArticle(data: Article) {
  return request({
    url: '/article/article',
    data,
    method: 'post',
  })
}

// 获取博客 -- 根据id
export function reqGetArticleById(aid: long) {
  return request({
    url: `/front/article/${aid}`,
    method: 'get',
  })
}

// 获取博客 -- 根据label
export function reqGetArticleByLabel(label: string) {
  return request({
    url: `/front/about/${label}`,
    method: 'get',
  })
}

// 删除博客 -- 根据id
export function reqDeleteArticle(aid: long) {
  return request({
    url: `/article/deletearticle/${aid}`,
    method: 'delete'
  })
}

// 获取用户信息
export function reqGetUserInfo() {
  return request({
    url: '/front/user',
    method: 'get'
  })
}

// 获取标签
export function reqGetLabelsAndCount() {
  return request({
    url: '/front/labels',
    method: 'get'
  })
}

// 获取留言
export function reqGetMessages() {
  return request({
    url: '/front/messages',
    method: 'get'
  })
}

// 添加留言
export function reqPostMessage(data: Message) {
  return request({
    url: '/front/message',
    data,
    method: 'post'
  })
}

// 获取页面信息 -- 根据页面名称
export function reqGetPageInfoByName(pageName: string) {
  return request({
    url: `/pageInfo/info/${pageName}`,
    method: 'get'
  })
}

// 获取所有页面信息
export function reqGetPageInfo(pageName: string) {
  return request({
    url: '/pageInfo/info',
    method: 'get'
  })
}

// 修改页面信息
export function reqPostPageInfo(data: PageInfo) {
  return request({
    url: '/pageInfo/info',
    data,
    method: 'post'
  })
}
