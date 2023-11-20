/*
 * @Author: LaurenBerrys && 949154547@qq.com
 * @Date: 2023-11-15 16:23:39
 * @LastEditTime: 2023-11-15 16:41:56
 * @Description:
 */
import { defineStore } from "pinia";
import { MApp } from "@/apps/types";
export const useCommon = defineStore("common", {
  state: () => {
    return {
      currentApp: undefined as any,
      microAppIsLoading: true,
    };
  },
  persist: {
    storage: localStorage,
    paths: ["currentApp", "microAppIsLoading"],
  },
  actions: {
    setCurrentApp(action: MApp) {
      this.currentApp = action;
    },
    seTNvapAppIsLoading(action: boolean) {
      this.microAppIsLoading = action;
    },
  },
});
