/*
 * @Author: LaurenBerrys && 949154547@qq.com
 * @Date: 2023-11-16 17:47:23
 * @LastEditTime: 2023-11-17 16:53:31
 * @Description:
 */
import type { GUI } from "dat.gui";
import type { Stats } from "stats-js";
import * as GUIS from "dat.gui";
import * as Statsr from "stats-js";
const Sample = (props) => {
  const canvasRef = ref<HTMLCanvasElement | null>(null);
  const guiParentRef = ref<HTMLDivElement | null>(null);
  const gui: GUI | undefined = computed(() => {
    if (props.gui) {
      const dat = GUIS;
      return new dat.GUI({ autoPlace: false });
    }
    return undefined;
  });
  const statsParentRef = ref<HTMLDivElement | null>(null);
  const stats: Stats | undefined = computed(() => {
    if (props.stats) {
      // const Stats = require("stats-js");
      return new Statsr();
    }
    return undefined;
  });
  if (gui.value && guiParentRef.value) {
    guiParentRef.value.appendChild(gui.domElement);
    while (gui.value.__controllers.length > 0) {
      gui.value.__controllers[0].remove();
    }
  }
  if (stats && statsParentRef.value) {
    stats.dom.style.position = "absolute";
    stats.showPanel(1); // 0: fps, 1: ms, 2: mb, 3+: custom
    statsParentRef.value.appendChild(stats.dom);
  }
  const pageState = reactive({
    active: true,
  });
  const cleanup = () => {
    pageState.active = false;
  };
  try {
    const canvas = canvasRef.value;
    // if (!canvas) {
    //   throw new Error("The canvas is not available");
    // }
    const p = props.init({
      canvas,
      pageState,
      gui,
      stats,
    });
    if (p instanceof Promise) {
      p.catch((err: Error) => {
        console.error(err);
      });
    }
  } catch (error) {
    console.error(error);
  }
  cleanup();
  return h(
    "div",
    {
      style: {
        position: "relative",
      },
    },
    [
      h("canvas", {
        Ref: canvasRef,
        style:{
          width:'600px',
          height:'600px'
        }
      }),
      h("div", {
        style: {
          position: "absolute",
          right: 10,
        },
        ref: guiParentRef,
      }),
      h("div", {
        style: {
          position: "absolute",
          right: 10,
        },
        ref: statsParentRef,
      }),
    ]
  );
};
export const makeSample = (props) => {
  return h(Sample, { ...props });
};
