<script setup lang="ts">
import { ref } from 'vue';

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
                desc: "Build UI for search",
                subTasks: [
                    {
                        completed: true,
                        subTask: "Input field"
                    },
                    {
                        completed: false,
                        subTask: "Impleent logic"
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
                        completed: true,
                        subTask: "Input field"
                    },
                    {
                        completed: false,
                        subTask: "Impleent logic"
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
        column: "Completed",
        colour: "#6ae1b2",
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
                        completed: true,
                        subTask: "Input field"
                    },
                    {
                        completed: false,
                        subTask: "Impleent logic"
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
    }
])
</script>

<template>
    <div class="px-4 md:px-8 lg:px-10 bg-n-bg-sec h-screen overflow-y-auto">
        <div class="mt-5 flex gap-8">
            <!-- <div v-for="(column, idx) in columns" :key="idx" >
                <div class="flex items-center gap-3 text-n-grey-text text-sm font-semibold">
                    <div :class="`w-5 h-5 rounded-full bg-red-500 ${column.colour}`"></div> {{ column.columnName}}
                </div>
            </div> -->

            <div v-for="(column, idx) in data" :key="idx" >
                <div class="flex items-center gap-3 text-n-grey-text text-sm font-semibold">
                    <div :class="`w-5 h-5 rounded-full bg-red-500 ${column.colour}`"></div> {{ column.column}}
                </div>

                <div v-for="(task, idx) in column.columnData" :key="idx" class="mt-4 grid gap-4 w-60 bg-n-bg rounded-md p-4">
                    <div class="grid gap-1">
                        <p class=" text-white text-sm font-semibold"> {{ task.desc}} </p>
                        <p class="text-n-grey-text text-xs"> {{ task.subTasks.filter((ele) => ele.completed === true).length  }} of {{ task.subTasks.length }} subtasks</p>
                    </div>


                </div>
            </div>
        </div>
    </div>
</template>