/*
 * @Author: LaurenBerrys && 949154547@qq.com
 * @Date: 2023-09-13 18:37:23
 * @LastEditTime: 2023-11-16 16:08:13
 * @Description:
 */
import { initQiankun } from "@/apps/index";
import { Apps } from "@/apps/config";
import { useCommon } from "@/sotre/common";
import { tryOnMounted } from "@vueuse/core";
// 初始化配置
const useInitConfig = () => {
  tryOnMounted(() => {
    initQiankun();
  });
  const router = useRouter();
  router.beforeEach((res) => {
    try {
      const common = useCommon();
      // 获取当前子应用名称
      const subAppName = res.path;
      if (subAppName) {
        // 设置当前子应用
        const micApp = Apps.find((item) => item.activeRule === subAppName);
        if (micApp) {
        console.log(micApp, "micApp");
          common.setCurrentApp(micApp);
        }
      }
    } catch (error) {
      console.log(
        "%c👉  error: ",
        "background:#41b883;padding:1px; border-radius: 0 3px 3px 0;color: #fff",
        error
      ); // 👈
    }
  });
};

export default useInitConfig;
