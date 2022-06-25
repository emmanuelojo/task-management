<script setup lang="ts">

import { ref } from 'vue';
import store from '../store/store';

interface subTask {
    id: number;
    completed: boolean
    subTask: string; 
}

const subTasks = ref<subTask[]>([])

const title = ref('')

const  desc = ref('')

const status = ref(false)

const newSubTask = ref('')

const progressStatus = ref('Todo')

const emit = defineEmits<{
    (e:'success'):void
}>()

const addSubTask = () => {
    // if(newSubTask.value.length < 1) alert('Number of characters should be more than 2')

    const data = {
        id: subTasks.value.length + 1,
        completed: status.value,
        subTask: newSubTask.value
    }

    subTasks.value.push(data)

    newSubTask.value = ''

}

const removeSubTask = (id: number) => {
    subTasks.value = subTasks.value.filter((ele) => ele.id !== id)
}

const handleSubmit = () => {
    if(progressStatus.value === "Completed"){
        subTasks.value.map((ele) => ele.completed = true)
    }

     const data = {
        column: progressStatus.value,
        columnData: 
        {
            title: title.value,
            desc: desc.value,
            subTasks: [...subTasks.value]
        }
    }

    
    console.log({data})

    store.actions.addTask(data)


    emit('success')

    // emit('task', data)

}
</script>

<template>
<div>
    <div class="w-60 sm:w-96 grid gap-4">
        <div class="grid gap-1">
            <label for="" class="text-white text-sm font-semibold">Title</label>
            <input type="text" v-model="title" placeholder="e.g Take coffee break" class="border-none outline-none rounded-md placeholder:pl-1 placeholder:text-xs text-sm p-1">
        </div>
        <div class="grid gap-1">
            <label for="" class="text-white text-sm font-semibold">Description</label>
            <textarea rows="4" cols="50" type="text" v-model="desc" placeholder="e.g It's always good to take a break. This 15 minute break will recharge the batteries a little." class="border-none outline-none  rounded-md placeholder:pl-1 placeholder:text-xs text-sm p-1" />
        </div>
        <div class="grid gap-1">
            <label for="" class="text-white text-sm font-semibold">Subtasks</label>
            <div>
                <div class="flex flex-col">
                    <transition name="slide-up" mode="out-in" appear>
                        <div class="flex flex-col gap-2">
                            <div v-for="(subTask, idx) in subTasks" :key="idx" class="flex items-center gap-1">
                                <input  type="text" v-model="subTask.subTask" placeholder="e.g Make coffee" class="w-[95%] mr-2 border-none rounded-md placeholder:pl-1 placeholder:text-xs text-sm p-1"> <i @click="removeSubTask(subTask.id)" class="fa fa-times text-n-grey-text cursor-pointer"></i>
                            </div>
                        </div>
                    </transition>
                    <input @keypress.enter="addSubTask" type="text" v-model="newSubTask" placeholder="e.g Make coffee" class="flex flex-grow-1 border-none outline-none rounded-md placeholder:pl-1 placeholder:text-xs text-sm p-1" :class="subTasks.length  ? 'mt-2' : 'mt-0'">
                </div>
                <div @click.prevent="addSubTask" class="w-full mt-4 py-2 flex justify-center items-center text-n-purple bg-white hover:text-white hover:bg-n-purple rounded-3xl cursor-pointer">
                    <p class="e-sm font-semibold">+ Add New Subtask</p>
                </div>
            </div>
        </div>
        <div class="grid gap-1">
            <label for="" class="text-white text-sm font-semibold">Status</label>
            <select v-model="progressStatus" class="border-none outline-none text-sm py-2 px-1 rounded-md">
                <option value="Todo">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select> 
        </div>   
        
        <div @click="handleSubmit" class="w-full py-2 flex justify-center items-center bg-n-purple text-white rounded-3xl hover:scale-105 cursor-pointer">
            <p class=" font-semibold">Create Task</p>
        </div>
    </div>
</div>
    
</template>

<style>
.slide-up-enter-from, .slide-up-leave-to{
    opacity: 0;
    transform: translateY(-30px);
}

.slide-up-enter-to, .slide-up-leave-from{
    opacity: 1;
    transform: translateY(0px);
}

.slide-up-enter-active, .slide-up-leave-active{
    transition: 0.5s ease;
}
</style>