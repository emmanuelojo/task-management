<script setup lang="ts">
import { ref } from 'vue';
import Modal from './Modal.vue';
import AddNewTask from './AddNewTask.vue';

const showCreateTaskModal = ref(false)

</script>

<template>
    <nav class="p-4 bg-n-bg text-white flex justify-between items-center border">
       <div> <p class=" font-bold text-xl">Platform Launch</p> </div>

        <div class="flex items-center gap-4">
            <div @click="showCreateTaskModal = true" class="flex items-center gap-1 bg-n-blue rounded-2xl px-5 py-2 text-white  cursor-pointer hover:scale-105">
               <i class="fa fa-plus text-sm"></i> <p class="text-white text-sm font-semibold"> Add New Task</p>
            </div>

            <div class="text-white cursor-pointer hover:scale-105">
                <i class="fa fa-ellipsis-v"></i>
            </div>
        </div>
    </nav>

    <Modal v-if="showCreateTaskModal" title="Add New Task" @close-modal="showCreateTaskModal = false">
        <AddNewTask @success="showCreateTaskModal = false"/>
    </Modal>
</template>