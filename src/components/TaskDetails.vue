<script setup lang="ts">
import { ref, PropType} from 'vue';
import { Task } from '../store/store';

const props = defineProps<{
    task: Task
}>()

</script>

<template>
    <div class="grid gap-4">
        <p class="text-white text-xl font-semibold">
            {{task.title}}
        </p>
        <p class="text-n-grey-text text-sm"> {{ task.desc}} </p>

        <div class="grid gap-3">
            <p class="text-white text-sm font-semibold">Subtasks ({{task.subTasks.filter((ele) => ele.completed === true).length }} of {{task.subTasks.length }})</p>

            <div class="grid gap-2">
                <div v-for="(subTask,idx) in task.subTasks" :key="idx" class="p-2 flex items-center gap-3 bg-n-bg rounded"> 
                    <input type="checkbox" name="" id="" v-model="subTask.completed">
                    <p class="text-[13px]" :class="subTask.completed === true ? 'text-n-grey-text line-through' : 'text-white'"> {{ subTask.subTask }}</p>
                </div>
            </div>
        </div>

        <div class="grid gap-1">
            <label for="" class="text-white text-sm font-semibold">Status</label>
            <select v-model="task.status" class="border-n-grey-text outline-none text-sm py-2 px-1 rounded-md">
                <option value="Todo">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Review">Review</option>
                <option value="Approved">Approved</option>
            </select> 
        </div>
    </div>
</template>