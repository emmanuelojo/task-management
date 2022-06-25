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

const newColumns = ref<string[]>([])

const dataList = store.getters.tasks

const selectedTask = ref<Task>()

const showDetails = (payload: Task ) => {
selectedTask.value = payload
showTaskDetailsModal.value = true
}

// const createNewColumn = () => {
// // showNewColumnModal.value = true

//     const newColumnData = {
//         column: newColumn.value,
//         colour: '#484852',
//         columnData: []
//     }

//     data.value.push(newColumnData)

//     showNewColumnModal.value = false
//     newColumn.value = ''

// }

const createNewColumn = () => {
    newColumns.value.push(newColumn.value)

    showNewColumnModal.value = false
    newColumn.value = ''
}

      
      const todo = computed(() => {
        return dataList.value.filter(item => item.status === 'Todo')
      })
      const inProgress = computed(() => {
        return dataList.value.filter(item => item.status === 'In Progress')
      })
      const completed = computed(() => {
        return dataList.value.filter(item => item.status === 'Completed')
      })

      const review = computed(() => {
        return dataList.value.filter(item => item.status === 'Review')
      })

      const approved = computed(() => {
        return dataList.value.filter(item => item.status === 'Approved')
      })

      const newColumnData = computed(() => {
        return dataList.value.filter(item => item.status === newColumns.value[0])
      })

     
     const  startDrag = (evt:any, task: Task) => {
        evt.dataTransfer.dropEffect = 'move'
        evt.dataTransfer.effectAllowed = 'move'
        evt.dataTransfer.setData('taskID', task.id)
  		}

  		const onDrop = (evt: any, status: string) => {
  			const taskID = evt.dataTransfer.getData('taskID')

  			let task = dataList.value.find(item => item.id == taskID)
  			if(task) task.status = status
  		}

</script>

<template>
    <div class="pb-20 px-4 md:px-8 lg:px-10 overflow-x-auto custom-scrollbar">
        <div class="pt-5 flex gap-8">
                <div class="flex flex-col gap-3 "  @drop="onDrop($event, 'Todo')" @dragover.prevent @dragenter.prevent>
                    <div  class="flex items-center gap-3 text-n-grey-text text-sm font-semibold w-60" >
                        <div class="w-5 h-5 rounded-full bg-[#4b9efe]"></div> {{ 'Todo' + ' (' + todo.length + ")"}}
                    </div>
                    <div  class="grid gap-2 text-n-grey-text text-sm font-semibold w-60">
                        <div @click="showDetails(task)" v-for="(task, index) in todo" :key="index" draggable @dragstart="startDrag($event, task)"  class="mt-2 grid w-60 bg-n-bg rounded-md p-4 cursor-pointer  hover:bg-n-purple ">
                            <div class="grid gap-1">
                                <p class=" text-white text-sm font-semibold"> {{ task.title}} </p>
                                <p class="text-n-grey-text text-xs"> {{ task.subTasks.filter((ele) => ele.completed === true).length  }} of {{ task.subTasks.length }} subtasks</p>
                            </div>
                        </div>
                    </div>
                    <!-- <VueDraggableNext :list="todo" @change="log">
                        <transition-group>
                            <div @click="showDetails(task)" v-for="(task, index) in todo" :key="index" draggable @dragstart="startDrag($event, task)" class="mt-4 grid gap-4 w-60 bg-n-bg rounded-md p-4 cursor-pointer  hover:bg-n-purple ">
                                <div class="grid gap-1">
                                    <p class=" text-white text-sm font-semibold"> {{ task.title}} </p>
                                    <p class="text-n-grey-text text-xs"> {{ task.subTasks.filter((ele) => ele.completed === true).length  }} of {{ task.subTasks.length }} subtasks</p>
                                </div>
                            </div>
                        </transition-group>
                    </VueDraggableNext> -->
                </div>

            <div class="flex flex-col gap-3"  @drop="onDrop($event, 'In Progress')" @dragover.prevent @dragenter.prevent>
                    <div  class="flex items-center gap-3 text-n-grey-text text-sm font-semibold w-60" >
                        <div class="w-5 h-5 rounded-full bg-[#feb334]"></div> {{ 'In Progress' + ' (' + inProgress.length + ")"}}
                    </div>

                    
                    <div  class="grid gap-4 text-n-grey-text text-sm font-semibold w-60">
                        <div @click="showDetails(task)" v-for="(task, index) in inProgress" :key="index" draggable @dragstart="startDrag($event, task)"  class="mt-2 grid w-60 bg-n-bg rounded-md p-4 cursor-pointer  hover:bg-n-purple ">
                            <div class="grid gap-1">
                                <p class=" text-white text-sm font-semibold"> {{ task.title}} </p>
                                <p class="text-n-grey-text text-xs"> {{ task.subTasks.filter((ele) => ele.completed === true).length  }} of {{ task.subTasks.length }} subtasks</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col gap-3"  @drop="onDrop($event, 'Completed')" @dragover.prevent @dragenter.prevent>
                    <div  class="flex items-center gap-3 text-n-grey-text text-sm font-semibold w-60" >
                        <div class="w-5 h-5 rounded-full bg-[#6ae1b2]"></div> {{ 'Completed' + ' (' + completed.length + ")"}}
                    </div>

                    
                    <div  class="grid gap-4 text-n-grey-text text-sm font-semibold w-60">
                        <div @click="showDetails(task)" v-for="(task, index) in completed" :key="index" draggable @dragstart="startDrag($event, task)"  class="mt-2 grid w-60 bg-n-bg rounded-md p-4 cursor-pointer  hover:bg-n-purple ">
                            <div class="grid gap-1">
                                <p class=" text-white text-sm font-semibold"> {{ task.title}} </p>
                                <p class="text-n-grey-text text-xs"> {{ task.subTasks.filter((ele) => ele.completed === true).length  }} of {{ task.subTasks.length }} subtasks</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col gap-3"  @drop="onDrop($event, 'Review')" @dragover.prevent @dragenter.prevent>
                    <div  class="flex items-center gap-3 text-n-grey-text text-sm font-semibold w-60" >
                        <div class="w-5 h-5 rounded-full bg-[#8573e1]"></div> {{ 'Review' + ' (' + review.length + ")"}}
                    </div>

                    
                    <div  class="grid gap-4 text-n-grey-text text-sm font-semibold w-60">
                        <div @click="showDetails(task)" v-for="(task, index) in review" :key="index" draggable @dragstart="startDrag($event, task)"  class="mt-2 grid w-60 bg-n-bg rounded-md p-4 cursor-pointer  hover:bg-n-purple ">
                            <div class="grid gap-1">
                                <p class=" text-white text-sm font-semibold"> {{ task.title}} </p>
                                <p class="text-n-grey-text text-xs"> {{ task.subTasks.filter((ele) => ele.completed === true).length  }} of {{ task.subTasks.length }} subtasks</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="flex flex-col gap-3"  @drop="onDrop($event, 'Approved')" @dragover.prevent @dragenter.prevent>
                    <div  class="flex items-center gap-3 text-n-grey-text text-sm font-semibold w-60" >
                        <div class="w-5 h-5 rounded-full bg-[#44d26e]"></div> {{ 'Approved' + ' (' + approved.length + ")"}}
                    </div>

                    
                    <div  class="grid gap-4 text-n-grey-text text-sm font-semibold w-60">
                        <div @click="showDetails(task)" v-for="(task, index) in approved" :key="index" draggable @dragstart="startDrag($event, task)"  class="mt-2 grid w-60 bg-n-bg rounded-md p-4 cursor-pointer  hover:bg-n-purple ">
                            <div class="grid gap-1">
                                <p class=" text-white text-sm font-semibold"> {{ task.title}} </p>
                                <p class="text-n-grey-text text-xs"> {{ task.subTasks.filter((ele) => ele.completed === true).length  }} of {{ task.subTasks.length }} subtasks</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="newColumns.length" class="flex gap-8">
                    <div v-for="(column, idx) in newColumns" :key="idx" class="flex flex-col gap-3"  @drop="onDrop($event, column)" @dragover.prevent @dragenter.prevent>
                        <div  class="flex items-center gap-3 text-n-grey-text text-sm font-semibold w-60" >
                            <div class="w-5 h-5 rounded-full bg-white"></div> {{ column + ' (' + newColumnData.length + ")"}}
                        </div>

                        
                        <div  class="grid gap-4 text-n-grey-text text-sm font-semibold w-60">
                            <div @click="showDetails(task)" v-for="(task, index) in newColumnData" :key="index" draggable @dragstart="startDrag($event, task)"  class="mt-2 grid w-60 bg-n-bg rounded-md p-4 cursor-pointer  hover:bg-n-purple ">
                                <div class="grid gap-1">
                                    <p class=" text-white text-sm font-semibold"> {{ task.title}} </p>
                                    <p class="text-n-grey-text text-xs"> {{ task.subTasks.filter((ele) => ele.completed === true).length  }} of {{ task.subTasks.length }} subtasks</p>
                                </div>
                            </div>
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

.drop-zone {
    background-color: #eee;
    margin-bottom: 10px;
    padding: 10px;
  }

  .drag-el {
    background-color: #fff;
    margin-bottom: 10px;
    padding: 5px;
    width: 300px;
  }
</style>