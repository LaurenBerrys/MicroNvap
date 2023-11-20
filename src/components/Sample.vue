<!--
 * @Author: LaurenBerrys && 949154547@qq.com
 * @Date: 2023-11-16 17:45:36
 * @LastEditTime: 2023-11-17 17:13:38
 * @Description: 
-->
<template>
    <div style="width:100%;height: 100%;">
        <div ref="statsParentRef"> </div>
        <div ref="guiParentRef"></div>
        <canvas id="canvasRef" ref="canvasRef" style="width: 100%; height: 100%;" />
    </div>
</template>

<script setup lang="ts">
import type { GUI } from "dat.gui";
import type { Stats } from "stats-js";
import * as GUIS from "dat.gui";
import * as Statsr from "stats-js";
const props = defineProps({
    name: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    gui: {
        type: Boolean,
        default: false
    },
    init: {
        type: Function,
        default: () => { }
    },
    stats: {
        type: Boolean,
        default: false
    }
})
const statsParentRef = ref<HTMLDivElement | null>(null);
const canvasRef = ref<HTMLDivElement | null>(null);
const guiParentRef = ref<HTMLDivElement | null>(null);
const gui = computed(() => {
    if (props.gui) {
        const dat = GUIS;
        return new dat.GUI({ autoPlace: false });
    }
    return undefined;
});
const stats = computed(() => {
    if (props.stats) {
        // const Stats = require("stats-js");
        return new Statsr();
    }
    return undefined;
});
const pageState = reactive({
    active: true,
});
const cleanup = () => {
    pageState.active = false;
};
const Sample = () => {
    if (gui.value && guiParentRef.value) {
        guiParentRef.value.appendChild(gui.value.domElement);
        while (gui.value.__controllers.length > 0) {
            gui.value.__controllers[0].remove();
        }
    }
    if (stats.value && statsParentRef.value) {
        stats.dom.style.position = "absolute";
        stats.showPanel(1); // 0: fps, 1: ms, 2: mb, 3+: custom
        statsParentRef.value.appendChild(stats.dom);
    }


    try {
        const canvas = unref(canvasRef);
        if (!canvas) {
            throw new Error("The canvas is not available");
        }
        const p = props.init({
            canvas,
            pageState,
            gui,
            stats,
        });
        // if (p instanceof Promise) {
        //     p.catch((err: Error) => {
        //         console.error(err);
        //     });
        // }
    } catch (error) {
        console.error(error);
    }
    // cleanup();
};
onMounted(() => {
    Sample();
})

</script>

<style scoped></style>