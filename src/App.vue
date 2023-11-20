<!--
 * @Author: LaurenBerrys && 949154547@qq.com
 * @Date: 2023-11-15 15:58:01
 * @LastEditTime: 2023-11-17 17:25:05
 * @Description: 
-->
<script setup>
import router from './router';

useInitConfig();
</script>
<template>
  <router-view v-slot="{ Component }">
    <div id="subapp-viewport"></div>
    <template v-if="Component">
      <Suspense>
        <component :is="Component" />
        <template #fallback>
          正在加载...
        </template>
      </Suspense>
    </template>
  </router-view>
</template>
