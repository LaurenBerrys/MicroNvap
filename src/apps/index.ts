/*
 * @Author: LaurenBerrys && 949154547@qq.com
 * @Date: 2023-09-13 18:37:23
 * @LastEditTime: 2023-11-16 17:13:53
 * @Description:
 */
/* eslint-disable no-console */
import {
  registerMicroApps,
  start,
  addGlobalUncaughtErrorHandler,
  setDefaultMountApp,
  runAfterFirstMounted,
} from "qiankun";
import { Apps } from "./config";
import { InitQiankun } from "./types";
import { useCommon } from "@/sotre/common";
// 注册微应用
export const registerApp = (props: any) => {
const common = useCommon();

  // 注册子应用信息【合并 props 属性】
  const appsConfig = Apps.map((item) => {
    return {
      ...item,
      props: {
        ...item.props,
        ...props,
      },
    };
  });
  // 注册子应用
  registerMicroApps(appsConfig, {
    // qiankun 生命周期钩子 - 加载前
    beforeLoad: (app) =>
      new Promise((resolve) => {
        console.log("before load ===", app.name);
        resolve("beforeLoad");
      }),
    // qiankun 生命周期钩子 - 挂载前
    beforeMount: (app) =>
      new Promise((resolve) => {
        console.log("before mount ===", app.name);
        resolve("beforeMount");
      }),
    // qiankun 生命周期钩子 - 挂载后
    afterMount: (app) => {
      return new Promise((resolve) => {
        console.log("after mount ===", app.name);
        common.seTNvapAppIsLoading(false);
        resolve("afterMount");
      });
    },
    // qiankun 生命周期钩子 - 卸载前
    beforeUnmount: (app) =>
      new Promise((resolve) => {
        console.log("before unmount ===", app.name);
        resolve("beforeUnmount");
      }),
    // qiankun 生命周期钩子 - 卸载后
    afterUnmount: (app) =>
      new Promise((resolve) => {
        console.log("after unmount ===", app.name);
        resolve("afterUnmount");
      }),
  });

  // 添加全局的未捕获异常处理器
  addGlobalUncaughtErrorHandler((e) => {
    console.error("微前端发生异常了, 请排查微应用相关配置是否正确：", e);
  });
};

// 初始化 qiankun
export const initQiankun =async (props?: InitQiankun) => {
  // 注册子应用
  registerApp(props);
  // 设置默认进入的子应用
  // setDefaultMountApp("/nvap/NvapNaive");
  // 启动 qiankun
  start({
    sandbox: {
      // strictStyleIsolation: true,//
      // experimentalStyleIsolation: true,
    },
  });
  // 第一个子应用加载完毕回调
  runAfterFirstMounted(() => {
    console.log("[MainApp] first app mounted");
  });
};
