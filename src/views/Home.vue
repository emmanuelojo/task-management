<script setup lang="ts">
import { ref, onMounted, Ref, computed } from 'vue';
import Modal from '../components/Modal.vue';
import store, { Column, Task } from '../store/store'
import TaskDetails from '../components/TaskDetails.vue'
// import draggable from "vuedraggable";
  import { VueDraggableNext } from 'vue-draggable-next'

onMounted(() => {
    // if(inputRef.value)
    //  inputRef.value.focus()
})

const inputRef = ref() as Ref<HTMLInputElement>

const showNewColumnModal = ref(false)
const showTaskDetailsModal = ref(false)
const dragging = ref(false)
const enabled = ref(true)

const newColumn = ref('')

const columns = ref([    
    {columnName: 'Todo', colour: "#4b9efe"},
    {columnName: 'In Progress', colour: "#feb334"},
    {columnName: 'Completed', colour: "#6ae1b2"},
    {columnName: 'Review', colour: "#8573e1"},
    {columnName: 'Approved', colour: "#44d26e"}
])

const myList = ref(["First Item", "Second Item", "Third Item"])

const list1 = [{ name: "Drag Me!" }]
const list2 = [{ name: "Drag Me Too!" }]

const list = ref([
          { name: 'John', id: 1 },
          { name: 'Joao', id: 2 },
          { name: 'Jean', id: 3 },
          { name: 'Gerard', id: 4 },
        ])

const dataList = store.getters.tasks

const data = computed({
    get: () => dataList.value,
    set: val => {
        store.mutations.appendColumn(val)
    }
})

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
        columnData: []
    }

    data.value.push(newColumnData)

    showNewColumnModal.value = false
    newColumn.value = ''

}

const log = (evt: Event) => {
    console.log(evt)
}

const startDrag = (evt: Event, task: Task) => {
}

const onDrop = (evt: Event, task: Task, column: Column) => {

}

// const startDrag = (evt: Event, task: Task) => {
//     // evt.dataTransfer.dropEffect = 'move'
//     // evt.dataTransfer.effectAllowed = 'move'
//     // // evt.dataTransfer.setData('id', task.id)
//     // evt.dataTransfer.setData('taskTitle', task.title)
// }

// const onDrop = (evt: Event, list: Task[]) => {
//     // // const taskID = evt.dataTransfer.getData('id')
//     // const taskTitle = evt.dataTransfer.getData('title')
//     // // const task = data.value.find(item => item.columnData.)
// }

</script>

<template>
    <div class="pb-20 px-4 md:px-8 lg:px-10 bg-n-bg-sec  overflow-x-auto custom-scrollbar">
        <div class="pt-5 flex gap-8">
            <div v-for="(column, idx) in data" :key="idx" class="">
                <div class="flex items-center gap-3 text-n-grey-text text-sm font-semibold w-60">
                    <div :class="`w-5 h-5 rounded-full bg-${column.colour}`"></div> {{ column.column + ' (' + column.columnData.length + ")"}}
                </div>

                <VueDraggableNext :list="column.columnData" @change="log">
                    <transition-group>
                        <div @click="showDetails(task)" v-for="(task, index) in column.columnData" :key="index" class="mt-4 grid gap-4 w-60 bg-n-bg rounded-md p-4 cursor-pointer  hover:bg-n-purple ">
                            <div class="grid gap-1">
                                <p class=" text-white text-sm font-semibold"> {{ task.title}} </p>
                                <p class="text-n-grey-text text-xs"> {{ task.subTasks.filter((ele) => ele.completed === true).length  }} of {{ task.subTasks.length }} subtasks</p>
                            </div>
                        </div>
                    </transition-group>
                </VueDraggableNext>

                <!-- <VueDraggableNext :list="column.columnData" @change="log">
                    <div @click="showDetails(task)" v-for="(task, index) in column.columnData" :key="index" class="mt-4 grid gap-4 w-60 bg-n-bg rounded-md p-4 cursor-pointer  hover:bg-n-purple ">
                        <div class="grid gap-1">
                            <p class=" text-white text-sm font-semibold"> {{ task.title}} </p>
                            <p class="text-n-grey-text text-xs"> {{ task.subTasks.filter((ele) => ele.completed === true).length  }} of {{ task.subTasks.length }} subtasks</p>
                        </div>
                    </div>
                </VueDraggableNext> -->

                <!-- <draggable v-model="column.columnData">
                    <div @click="showDetails(task)" v-for="(task, index) in column.columnData" :key="index" class="mt-4 grid gap-4 w-60 bg-n-bg rounded-md p-4 cursor-pointer  hover:bg-n-purple ">
                        <div class="grid gap-1">
                            <p class=" text-white text-sm font-semibold"> {{ task.title}} </p>
                            <p class="text-n-grey-text text-xs"> {{ task.subTasks.filter((ele) => ele.completed === true).length  }} of {{ task.subTasks.length }} subtasks</p>
                        </div>
                    </div>
                </draggable> -->

                <!-- <div @drop="onDrop($event, task, column)" @dragover.prevent @dragenter.prevent class="border-2 border-red-500 min-h-full p-2">
                    <div v-for="(task, index) in column.columnData" :key="index" @click="showDetails(task)" draggable @dragstart="startDrag($event, task)" class="mt-4 grid gap-4 w-60 border-2 border-green-500 bg-n-bg rounded-md p-4 cursor-pointer  hover:bg-n-purple ">
                        <div class="grid gap-1">
                            <p class=" text-white text-sm font-semibold"> {{ task.title}} </p>
                            <p class="text-n-grey-text text-xs"> {{ task.subTasks.filter((ele) => ele.completed === true).length  }} of {{ task.subTasks.length }} subtasks</p>
                        </div>
                    </div>
                </div> -->
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

<style>
.draggable-list {
  background: #3f51b5;
  color: #fff;
  border: 1px solid;
  height: 50vh;
}
.list-item {
  margin: 10px;
  padding: 40px;
  cursor: pointer;
  font-size: 18px;
  border-radius: 5px;
  background: #f44336;
  display: inline-block;
}
</style>