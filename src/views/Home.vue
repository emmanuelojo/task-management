<script setup lang="ts">
import { ref, onMounted, Ref } from 'vue';
import Modal from '../components/Modal.vue';

onMounted(() => {
    // if(inputRef.value)
    //  inputRef.value.focus()
})

const inputRef = ref() as Ref<HTMLInputElement>

const showNewColumnModal = ref(false)
const newColumn = ref('')

const columns = ref([    
    {columnName: 'Todo', colour: "'#45bede'"},
    {columnName: 'In Progress', colour: "'#8470f4'"},
    {columnName: 'Completed', colour: "'#6ae1b2'"}
])

const data = ref([
    {
        column: "Todo",
        colour: "#45bede",
        columnData: [
            {
                desc: "Build UI for onboarding flow",
                subTasks: [
                    {
                        completed: false,
                        subTask: "Scaffolding"
                    },
                    {
                        completed: false,
                        subTask: "Install dependencies"
                    },
                    {
                        completed: false,
                        subTask: "Connect to strong WiFi"
                    },
                ]
            },
            {
                desc: "Build UI for search",
                subTasks: [
                    {
                        completed: false,
                        subTask: "Input field"
                    },
                    {
                        completed: false,
                        subTask: "Implement logic"
                    },
                ]
            },
            {
                desc: "Build settings UI",
                subTasks: [
                    {
                        completed: false,
                        subTask: "Scaffolding"
                    },
                    {
                        completed: false,
                        subTask: "Install dependencies"
                    },
                    {
                        completed: false,
                        subTask: "Connect to strong WiFi"
                    },
                ]
            },
        ]
    },
    {
        column: "In Progress",
        colour: "#8470f4",
        columnData: [
            {
                desc: "Design settings and search pages",
                subTasks: [
                    {
                        completed: true,
                        subTask: "Scaffolding"
                    },
                    {
                        completed: false,
                        subTask: "Install dependencies"
                    },
                    {
                        completed: false,
                        subTask: "Connect to strong WiFi"
                    },
                ]
            },
            {
                desc: "Add acount management endpoints",
                subTasks: [
                    {
                        completed: true,
                        subTask: "Input field"
                    },
                    {
                        completed: true,
                        subTask: "Implement UI"
                    },
                    {
                        completed: false,
                        subTask: "Implement logic"
                    },
                ]
            },
            {
                desc: "Design onboarding flow",
                subTasks: [
                    {
                        completed: true,
                        subTask: "Scaffolding"
                    },
                    {
                        completed: false,
                        subTask: "Install dependencies"
                    },
                    {
                        completed: false,
                        subTask: "Connect to strong WiFi"
                    },
                ]
            },
            {
                desc: "Add search endpoints",
                subTasks: [
                    {
                        completed: true,
                        subTask: "Scaffolding"
                    },
                    {
                        completed: false,
                        subTask: "Install dependencies"
                    },
                ]
            },
            {
                desc: "Add authentication endpoints",
                subTasks: [
                    {
                        completed: true,
                        subTask: "Scaffolding"
                    },
                    {
                        completed: false,
                        subTask: "Install dependencies"
                    },
                ]
            },
            {
                desc: "Research pricing points of various competitors and try different business models",
                subTasks: [
                    {
                        completed: true,
                        subTask: "Scaffolding"
                    },
                    {
                        completed: false,
                        subTask: "Install dependencies"
                    },
                    {
                        completed: false,
                        subTask: "Connect to strong WiFi"
                    },
                ]
            },
        ]
    },
    {
        column: "Completed",
        colour: "#6ae1b2",
        columnData: [
            {
                desc: "Conduct 5 wireframe tests",
                subTasks: [
                    {
                        completed: true,
                        subTask: "Scaffolding"
                    },
                ]
            },
            {
                desc: "Create wireframe protype",
                subTasks: [
                    {
                        completed: true,
                        subTask: "Scaffolding"
                    },
                ]
            },
            {
                desc: "Review results of usability tests and iterate",
                subTasks: [
                    {
                        completed: true,
                        subTask: "Input field"
                    },
                    {
                        completed: true,
                        subTask: "Implement logic"
                    },
                ]
            },
            {
                desc: "Create paper prototypes and conduct 10 usability tests with potential customers",
                subTasks: [
                    {
                        completed: true,
                        subTask: "Scaffolding"
                    },
                    {
                        completed: true,
                        subTask: "Scaffolding"
                    },
                ]
            },
            {
                desc: "Market discovery",
                subTasks: [
                    {
                        completed: true,
                        subTask: "Scaffolding"
                    },
                ]
            },
            {
                desc: "Competitor analysis",
                subTasks: [
                    {
                        completed: true,
                        subTask: "Scaffolding"
                    },
                    {
                        completed: true,
                        subTask: "Install dependencies"
                    },
                ]
            },
            {
                desc: "Research the market",
                subTasks: [
                    {
                        completed: true,
                        subTask: "Install dependencies"
                    },
                    {
                        completed: true,
                        subTask: "Connect to strong WiFi"
                    },
                ]
            },
        ]
    }
])

const createNewColumn = () => {
// showNewColumnModal.value = true

const newColumnData = {
    column: newColumn.value,
    colour: '#484852',
    columnData: [
        // {
        //         desc: "Conduct 5 wireframe tests",
        //         subTasks: [
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
    <div class="px-4 md:px-8 lg:px-10 bg-n-bg-sec h-screen overflow-y-auto">
        <div class="mt-5 flex gap-8">
            <div v-for="(column, idx) in data" :key="idx" class="">
                <div class="flex items-center gap-3 text-n-grey-text text-sm font-semibold w-60">
                    <div :class="`w-5 h-5 rounded-full bg-red-500 ${column.colour}`"></div> {{ column.column + ' (' + column.columnData.length + ")"}}
                </div>

                <div v-for="(task, idx) in column.columnData" :key="idx" class="mt-4 grid gap-4 w-60 bg-n-bg rounded-md p-4 cursor-pointer  hover:bg-n-purple ">
                    <div class="grid gap-1">
                        <p class=" text-white text-sm font-semibold"> {{ task.desc}} </p>
                        <p class="text-n-grey-text text-xs"> {{ task.subTasks.filter((ele) => ele.completed === true).length  }} of {{ task.subTasks.length }} subtasks</p>
                    </div>
                </div>
            </div>            

            <div class="mt-9">
                <div @click="showNewColumnModal = true" class="w-60 h-[90%] bg-n-bg rounded-md p-4 text-n-grey-text flex justify-center items-center gap-1 cursor-pointer">
                    <i class="fa fa-plus text-sm"></i> <p class=" text-sm font-semibold">New Column</p>
                </div>
            </div>
        </div>
    </div>

    <Modal title="Create New Column" v-if="showNewColumnModal" @close-modal="showNewColumnModal = false">
        <form @submit.prevent="createNewColumn" class="w-60 md:w-96 grid gap-4">
            <div class="grid gap-1">
                <label for=""  class=" text-white text-sm">Column Name</label>
                <input type="text" placeholder="Name of column" autofocus class="h-10 bg-transparent text-white border border-n-grey-text rounded-md pl-1 placeholder:pl-1 placeholder:text-sm" v-model="newColumn">
            </div>

            <div class="bg-n-bg rounded-xl py-2 px-5 flex justify-center items-center">
                <input type="submit" value="Submit" class="text-white cursor-pointer" ref="inputRef">
            </div>
        </form>
    </Modal>
</template>