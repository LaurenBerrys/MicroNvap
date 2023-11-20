/*
 * @Author: LaurenBerrys && 949154547@qq.com
 * @Date: 2023-09-13 18:37:23
 * @LastEditTime: 2023-11-16 16:19:44
 * @Description: 
 */
import { MApps } from './types'

export const Apps: MApps = [
  {
    label: 'React 应用',
    name: "reactApp",
    entry: "//localhost:8888",
    activeRule: "/nvap/reactApp",
    container: "#subapp-viewport",
    props: {
      basename: '/nvap/reactApp',
    },
  },
  {
    label: 'Vue 应用',
    name: "NvapNaive",
    entry: "//localhost:9999",
    container: "#subapp-viewport",
    activeRule: "/nvap/NvapNaive",
    props: {
      basename: '/nvap/NvapNaive',
    },
  },
];