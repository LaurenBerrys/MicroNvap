/*
 * @Author: LaurenBerrys && 949154547@qq.com
 * @Date: 2023-09-13 18:37:23
 * @LastEditTime: 2023-11-15 16:18:16
 * @Description:
 */

export type MApp = {
  label?: string;
  name: string;
  entry: string;
  activeRule: string;
  container: string;
  props?: any;
};

export type MApps = MApp[];

export type InitQiankun = any;
