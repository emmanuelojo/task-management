<script setup lang="ts">
import { ref, PropType } from "vue";
import store, { Task } from "../store/store";

const props = defineProps<{
  task: Task;
}>();

const emit = defineEmits(["success"]);

const columns = ref(store.getters.columns);

const handleSubmit = () => {
  const data = {
    id: props.task.id,
    status: props.task.status,
    title: props.task.title,
    desc: props.task.desc,
    subTasks: [...props.task.subTasks],
    hovered: false,
  };

  store.mutations.appendTask(data);

  emit("success");
};
</script>

<template>
  <div class="grid gap-4">
    <p class="text-white text-xl font-semibold">
      {{ task.title }}
    </p>
    <p class="text-n-grey-text text-sm">{{ task.desc }}</p>

    <div class="grid gap-3">
      <p class="text-white text-sm font-semibold">
        Subtasks ({{
          task.subTasks.filter((ele) => ele.completed === true).length
        }}
        of {{ task.subTasks.length }})
      </p>

      <div class="grid gap-2">
        <div
          v-for="(subTask, idx) in task.subTasks"
          :key="idx"
          class="p-2 flex items-center gap-3 bg-n-bg rounded"
        >
          <input type="checkbox" name="" id="" v-model="subTask.completed" />
          <p
            class="text-[13px]"
            :class="
              subTask.completed === true
                ? 'text-n-grey-text line-through'
                : 'text-white'
            "
          >
            {{ subTask.subTask }}
          </p>
        </div>
      </div>
    </div>

    <div class="grid gap-1">
      <label for="" class="text-white text-sm font-semibold">Status</label>
      <select
        v-model="task.status"
        class="border-n-grey-text outline-none text-sm py-2 px-1 rounded-md"
      >
        <option v-for="(column, idx) in columns" :key="idx" :value="column">
          {{ column }}
        </option>
      </select>
    </div>

    <div
      @click="handleSubmit"
      class="mt-10 w-full py-2 flex justify-center items-center bg-n-purple text-white rounded-3xl hover:scale-105 cursor-pointer"
    >
      <p class="font-semibold">Submit</p>
    </div>
  </div>
</template>
