<!--
 * @Author: LaurenBerrys && 949154547@qq.com
 * @Date: 2023-11-15 16:28:00
 * @LastEditTime: 2023-11-20 17:06:01
 * @Description: 
-->
<script setup lang="ts">
import { init } from './start'
import Sample from '@/components/Sample.vue';

</script>
<template>
    <router-link style="position: absolute; top:20px" to="/nvap/NvapNaive">Go to Home</router-link>
    <div style="width: 80%; height: 80%; position: absolute;">
        <Sample :name="'Particles'"
            :description="'This example demonstrates rendering of particles simulated with compute shaders'" :gui=true
            :init="init" />
    </div>
</template>
