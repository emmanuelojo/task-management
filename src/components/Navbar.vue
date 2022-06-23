<script setup lang="ts">
import { ref } from 'vue';
</script>

<template>
    <nav class="px-4 bg-n-bg text-white flex justify-between items-center border">
       <div> <p class=" font-bold text-xl">Platform Launch</p> </div>

        <div class="flex items-center border border-red-500">
            <div class=" bg-n-blue rounded-lg p-2 text-white">
               <i class="fa fa-plus "></i> <p class="text-white font-semibold"> Add New Task</p>
            </div>

            <div class="text-white">
                <i class="fa fa-ellipsis-v"></i>
            </div>
        </div>
        <!-- <div class="border border-red-500">
<p class=" font-bold text-xl">Platform Launch</p>

        </div> -->
    </nav>
</template>