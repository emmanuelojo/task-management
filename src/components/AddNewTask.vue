<script setup lang="ts">

import { ref } from 'vue';

const subTasks = ref(['Make coffee'])

const addSubTask = () => {

}

const handleSubmit = () => {

}
</script>

<template>
<div>
    <div class="w-60 md:w-96 grid gap-4">
        <div class="grid gap-1">
            <label for="" class="text-white text-sm font-semibold">Title</label>
            <input type="text" placeholder="e.g Take coffee break" class="border border-n-grey-text rounded-md placeholder:pl-1 placeholder:text-xs p-1">
        </div>
        <div class="grid gap-1">
            <label for="" class="text-white text-sm font-semibold">Description</label>
            <textarea type="text" placeholder="e.g It's always good to take a break. This 15 minute break will recharge the batteries a little." class="border border-n-grey-text rounded-md placeholder:pl-1 placeholder:text-xs p-1" />
        </div>
        <div class="grid gap-1">
            <label for="" class="text-white text-sm font-semibold">Subtasks</label>
            <div>
                <div class="flex items-center gap-1">
                    <input type="text" placeholder="e.g Make coffee" class="flex flex-grow-1 border border-n-grey-text rounded-md placeholder:pl-1 placeholder:text-xs p-1"> <i class="fa fa-times text-n-grey-text"></i>
                </div>
                <div class="w-full py-2 flex justify-center items-center text-n-purple bg-white rounded-xl hover:scale-105">
                    <p class=" font-semibold">+ Add New Subtask</p>
                </div>
            </div>
        </div>
        <div class="grid gap-1">
            <label for="" class="text-white text-sm font-semibold">Status</label>
            <select>
                <option value="todo">Todo</option>
                <option value="inProgress">In Progress</option>
                <option value="completed">Completed</option>
            </select> 
        </div>   
        
        <div class="w-full py-2 flex justify-center items-center bg-n-purple text-white rounded-xl hover:scale-105">
            <p class=" font-semibold">Create Task</p>
        </div>
    </div>
</div>
    
</template>

<style></style>