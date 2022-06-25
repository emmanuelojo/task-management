<script setup lang="ts">
import { ref, onMounted, Ref } from 'vue';
import Modal from '../components/Modal.vue';
import store, { Task } from '../store/store'
import TaskDetails from '../components/TaskDetails.vue'

onMounted(() => {
    // if(inputRef.value)
    //  inputRef.value.focus()
})

const inputRef = ref() as Ref<HTMLInputElement>

const showNewColumnModal = ref(false)
const showTaskDetailsModal = ref(false)
const newColumn = ref('')

const columns = ref([    
    {columnName: 'Todo', colour: "'#45bede'"},
    {columnName: 'In Progress', colour: "'#8470f4'"},
    {columnName: 'Completed', colour: "'#6ae1b2'"}
])

const data = store.getters.tasks

const selectedTask = ref<Task>()

const showDetails = (payload: Task ) => {
selectedTask.value = payload
showTaskDetailsModal.value = true
}

const createNewColumn = () => {
// showNewColumnModal.value = true

    const newColumnData = {
        column: newColumn.value,
        colour: '#484852',
        columnData: [
            // {
            // //         title: "Conduct 5 wireframe tests",
            // desc: "",//         
            // subTasks: [
            //             {
            //                 completed: true,
            //                 subTask: "Scaffolding"
            //             },
            //         ]
            //     },
        ]
    }

    data.value.push(newColumnData)

    showNewColumnModal.value = false
    newColumn.value = ''

}
</script>

<template>
    <div class="pb-20 px-4 md:px-8 lg:px-10 bg-n-bg-sec  overflow-x-auto custom-scrollbar">
        <div class="pt-5 flex gap-8">
            <div v-for="(column, idx) in data" :key="idx" class="">
                <div class="flex items-center gap-3 text-n-grey-text text-sm font-semibold w-60">
                    <div :class="`w-5 h-5 rounded-full bg-red-500 ${column.colour}`"></div> {{ column.column + ' (' + column.columnData.length + ")"}}
                </div>

                <div @click="showDetails(task)" v-for="(task, idx) in column.columnData" :key="idx" class="mt-4 grid gap-4 w-60 bg-n-bg rounded-md p-4 cursor-pointer  hover:bg-n-purple ">
                    <div class="grid gap-1">
                        <p class=" text-white text-sm font-semibold"> {{ task.title}} </p>
                        <p class="text-n-grey-text text-xs"> {{ task.subTasks.filter((ele) => ele.completed === true).length  }} of {{ task.subTasks.length }} subtasks</p>
                    </div>
                </div>
            </div>            

            <div class="mt-9">
                <div @click="showNewColumnModal = true" class="mr-10 w-60 h-[90%] bg-n-bg rounded-md p-4 text-n-grey-text flex justify-center items-center gap-1 cursor-pointer">
                    <i class="fa fa-plus text-sm"></i> <p class=" text-sm font-semibold">New Column</p>
                </div>
            </div>
        </div>
    </div>

    <Modal title="Create New Column" v-if="showNewColumnModal" @close-modal="showNewColumnModal = false">
        <form @submit.prevent="createNewColumn" class="grid gap-4">
            <div class="grid gap-1">
                <label for=""  class=" text-white text-sm">Column Name</label>
                <input type="text" placeholder="Name of column" autofocus class="h-10 bg-transparent text-white border border-n-grey-text rounded-md pl-1 placeholder:pl-1 placeholder:text-sm" v-model="newColumn">
            </div>

            <div class="bg-n-bg rounded-xl py-2 px-5 flex justify-center items-center">
                <input type="submit" value="Submit" class="text-white cursor-pointer" ref="inputRef">
            </div>
        </form>
    </Modal>

    <Modal v-if="showTaskDetailsModal && selectedTask" title="Task Details" @close-modal="showTaskDetailsModal = false">
        <TaskDetails :task="selectedTask" @success="showTaskDetailsModal = false"/>
    </Modal>
</template>