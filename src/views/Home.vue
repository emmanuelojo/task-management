<script setup lang="ts">
import { ref, onMounted, Ref, computed, watch } from "vue";
import Modal from "../components/Modal.vue";
import store, { Column, Task } from "../store/store";
import TaskDetails from "../components/TaskDetails.vue";
import draggable from "vuedraggable";
import { VueDraggableNext } from "vue-draggable-next";
import Toast from "../components/Toast.vue";

onMounted(() => {
  if (inputRef.value) inputRef.value.focus();
  blocked.value = [...blockedList.value];
  todo.value = [...todoList.value];
  inProgress.value = [...inProgressList.value];
  completed.value = [...completedList.value];
  review.value = [...reviewList.value];
  approved.value = [...approvedList.value];
  newColumnData.value = [...newColumnDataList.value];
});

const inputRef = ref() as Ref<HTMLInputElement>;

const showNewColumnModal = ref(false);
const showTaskDetailsModal = ref(false);
const showToast = ref(false);
const dragging = ref(false);
const enabled = ref(true);

const newColumn = ref("");

const columns = ref([
  { columnName: "Todo", colour: "#4b9efe" },
  { columnName: "In Progress", colour: "#feb334" },
  { columnName: "Completed", colour: "#6ae1b2" },
  { columnName: "Review", colour: "#8573e1" },
  { columnName: "Approved", colour: "#44d26e" },
]);

const newColumns = ref<string[]>([]);

const dataList = ref(store.getters.tasks);

const selectedTask = ref<Task>();

const darkMode = ref(true);

const theme = ref(store.getters.darkTheme);

const reloadStatus = ref(store.getters.reloadStatus);

watch(theme, (newVal, oldVal) => {
  newVal === true ? (darkMode.value = true) : (darkMode.value = false);
});

watch(reloadStatus, (newVal, oldVal) => {
  if (newVal !== oldVal) reloadStatus.value;
  if (reloadStatus.value === true) {
    store.getters.tasks.value;
    blocked.value = [...blockedList.value];
    todo.value = [...todoList.value];
    inProgress.value = [...inProgressList.value];
    completed.value = [...completedList.value];
    review.value = [...reviewList.value];
    approved.value = [...approvedList.value];
    newColumnData.value = [...newColumnDataList.value];

    store.mutations.setReloadStatus(false);
  }
});

const showDetails = (payload: Task) => {
  selectedTask.value = payload;
  showTaskDetailsModal.value = true;
};

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

const openNewColumnModal = () => {
  if (newColumns.value.length) {
    showToast.value = true;

    setTimeout(() => {
      showToast.value = false;
    }, 5000);
  } else {
    showNewColumnModal.value = true;
  }
};

const createNewColumn = () => {
  newColumns.value.push(newColumn.value);
  store.mutations.appendColumn(newColumn.value);

  showNewColumnModal.value = false;
  newColumn.value = "";
};

const blocked = ref<Task[]>([]);

const todo = ref<Task[]>([]);

const inProgress = ref<Task[]>([]);

const completed = ref<Task[]>([]);

const review = ref<Task[]>([]);

const approved = ref<Task[]>([]);

const newColumnData = ref<Task[]>([]);

const blockedList = computed(() => {
  return dataList.value.filter((item) => item.status === "Blocked");
});

const todoList = computed(() => {
  return dataList.value.filter((item) => item.status === "Todo");
});

const inProgressList = computed(() => {
  return dataList.value.filter((item) => item.status === "In Progress");
});

const completedList = computed(() => {
  return dataList.value.filter((item) => item.status === "Completed");
});

const reviewList = computed(() => {
  return dataList.value.filter((item) => item.status === "Review");
});

const approvedList = computed(() => {
  return dataList.value.filter((item) => item.status === "Approved");
});

const newColumnDataList = computed(() => {
  return dataList.value.filter((item) => item.status === newColumns.value[0]);
});

const startDrag = (evt: any, task: Task) => {
  evt.dataTransfer.dropEffect = "move";
  evt.dataTransfer.effectAllowed = "move";
  evt.dataTransfer.setData("taskID", task.id);
};

const onDrop = (evt: any, status: string) => {
  const taskID = evt.dataTransfer.getData("taskID");

  let task = dataList.value.find((item) => item.id == taskID);
  if (task) task.status = status;
};
</script>

<template>
  <div class="pb-20 px-4 md:px-8 lg:px-10 overflow-x-auto custom-scrollbar">
    <div class="flexbox pt-5 flex gap-8">
      <div
        class="flex flex-col gap-3"
        @drop="onDrop($event, 'Blocked')"
        @dragover.prevent
        @dragenter.prevent
      >
        <div
          class="flex items-center gap-3 text-n-grey-text text-sm font-semibold w-60"
        >
          <div class="w-5 h-5 rounded-full bg-red-500"></div>
          {{ "Blocked" + " (" + blocked.length + ")" }}
        </div>
        <draggable
          class="mt-3 flex flex-col gap-2 text-n-grey-text text-sm font-semibold min-h-screen w-60"
          :list="blocked"
          group="people"
          itemKey="id"
        >
          <template #item="{ element }">
            <div
              @dragstart="startDrag($event, element)"
              @click="showDetails(element)"
              @mouseover="element.hovered = true"
              @mouseout="element.hovered = false"
              class="mt-2 grid w-60 hover:bg-n-purple rounded-md p-4 cursor-pointer"
              :class="darkMode ? 'bg-n-bg' : 'bg-white'"
            >
              <div class="grid gap-1">
                <p
                  class="text-sm font-semibold"
                  :class="darkMode ? 'text-white' : 'text-n-dark-blue'"
                >
                  {{ element.title }}
                </p>
                <p
                  class="text-xs"
                  :class="
                    element.hovered && darkMode
                      ? 'text-white'
                      : element.hovered && !darkMode
                      ? 'text-n-dark-blue'
                      : 'text-n-grey-text'
                  "
                >
                  <!-- {{
                    element.subTasks.filter((ele) => ele.completed === true)
                      .length
                  }}
                  of {{ element.subTasks.length }} subtasks -->
                  {{ element.subTasks.length }} subtasks
                </p>
              </div>
            </div>
          </template>
        </draggable>
      </div>

      <div
        class="flex flex-col gap-3"
        @drop="onDrop($event, 'Todo')"
        @dragover.prevent
        @dragenter.prevent
      >
        <div
          class="flex items-center gap-3 text-n-grey-text text-sm font-semibold w-60"
        >
          <div class="w-5 h-5 rounded-full bg-[#4b9efe]"></div>
          {{ "Todo" + " (" + todo.length + ")" }}
        </div>
        <draggable
          class="mt-3 flex flex-col gap-2 text-n-grey-text text-sm font-semibold min-h-screen w-60"
          :list="todo"
          group="people"
          itemKey="id"
        >
          <template #item="{ element }">
            <div
              @dragstart="startDrag($event, element)"
              @click="showDetails(element)"
              @mouseover="element.hovered = true"
              @mouseout="element.hovered = false"
              class="mt-2 grid w-60 hover:bg-n-purple rounded-md p-4 cursor-pointer"
              :class="darkMode ? 'bg-n-bg' : 'bg-white'"
            >
              <div class="grid gap-1">
                <p
                  class="text-sm font-semibold"
                  :class="darkMode ? 'text-white' : 'text-n-dark-blue'"
                >
                  {{ element.title }}
                </p>
                <p
                  class="text-xs"
                  :class="
                    element.hovered && darkMode
                      ? 'text-white'
                      : element.hovered && !darkMode
                      ? 'text-n-dark-blue'
                      : 'text-n-grey-text'
                  "
                >
                  <!-- {{
                    element.subTasks.filter((ele) => ele.completed === true)
                      .length
                  }}
                  of {{ element.subTasks.length }} subtasks -->
                  {{ element.subTasks.length }} subtasks
                </p>
              </div>
            </div>
          </template>
        </draggable>
      </div>

      <div
        class="flex flex-col gap-3"
        @drop="onDrop($event, 'In Progress')"
        @dragover.prevent
        @dragenter.prevent
      >
        <div
          class="flex items-center gap-3 text-n-grey-text text-sm font-semibold w-60"
        >
          <div class="w-5 h-5 rounded-full bg-[#feb334]"></div>
          {{ "In Progress" + " (" + inProgress.length + ")" }}
        </div>
        <draggable
          class="mt-3 flex flex-col gap-2 text-n-grey-text text-sm font-semibold min-h-screen w-60"
          :list="inProgress"
          group="people"
          itemKey="id"
        >
          <template #item="{ element }">
            <div
              @dragstart="startDrag($event, element)"
              @click="showDetails(element)"
              @mouseover="element.hovered = true"
              @mouseout="element.hovered = false"
              class="mt-2 grid w-60 hover:bg-n-purple rounded-md p-4 cursor-pointer"
              :class="darkMode ? 'bg-n-bg' : 'bg-white'"
            >
              <div class="grid gap-1">
                <p
                  class="text-sm font-semibold"
                  :class="darkMode ? 'text-white' : 'text-n-dark-blue'"
                >
                  {{ element.title }}
                </p>
                <p
                  class="text-xs"
                  :class="
                    element.hovered && darkMode
                      ? 'text-white'
                      : element.hovered && !darkMode
                      ? 'text-n-dark-blue'
                      : 'text-n-grey-text'
                  "
                >
                  <!-- {{
                    element.subTasks.filter((ele) => ele.completed === true)
                      .length
                  }}
                  of {{ element.subTasks.length }} subtasks -->
                  {{ element.subTasks.length }} subtasks
                </p>
              </div>
            </div>
          </template>
        </draggable>
      </div>

      <div
        class="flex flex-col gap-3"
        @drop="onDrop($event, 'Completed')"
        @dragover.prevent
        @dragenter.prevent
      >
        <div
          class="flex items-center gap-3 text-n-grey-text text-sm font-semibold w-60"
        >
          <div class="w-5 h-5 rounded-full bg-[#6ae1b2]"></div>
          {{ "Completed" + " (" + completed.length + ")" }}
        </div>
        <draggable
          class="mt-3 flex flex-col gap-2 text-n-grey-text text-sm font-semibold min-h-screen w-60"
          :list="completed"
          group="people"
          itemKey="id"
        >
          <template #item="{ element }">
            <div
              @dragstart="startDrag($event, element)"
              @click="showDetails(element)"
              @mouseover="element.hovered = true"
              @mouseout="element.hovered = false"
              class="mt-2 grid w-60 hover:bg-n-purple rounded-md p-4 cursor-pointer"
              :class="darkMode ? 'bg-n-bg' : 'bg-white'"
            >
              <div class="grid gap-1">
                <p
                  class="text-sm font-semibold"
                  :class="darkMode ? 'text-white' : 'text-n-dark-blue'"
                >
                  {{ element.title }}
                </p>
                <p
                  class="text-xs"
                  :class="
                    element.hovered && darkMode
                      ? 'text-white'
                      : element.hovered && !darkMode
                      ? 'text-n-dark-blue'
                      : 'text-n-grey-text'
                  "
                >
                  <!-- {{
                    element.subTasks.filter((ele) => ele.completed === true)
                      .length
                  }}
                  of {{ element.subTasks.length }} subtasks -->
                  {{ element.subTasks.length }} subtasks
                </p>
              </div>
            </div>
          </template>
        </draggable>
      </div>

      <div
        class="flex flex-col gap-3"
        @drop="onDrop($event, 'Review')"
        @dragover.prevent
        @dragenter.prevent
      >
        <div
          class="flex items-center gap-3 text-n-grey-text text-sm font-semibold w-60"
        >
          <div class="w-5 h-5 rounded-full bg-[#8573e1]"></div>
          {{ "Review" + " (" + review.length + ")" }}
        </div>
        <draggable
          class="mt-3 flex flex-col gap-2 text-n-grey-text text-sm font-semibold min-h-screen w-60"
          :list="review"
          group="people"
          itemKey="id"
        >
          <template #item="{ element }">
            <div
              @dragstart="startDrag($event, element)"
              @click="showDetails(element)"
              @mouseover="element.hovered = true"
              @mouseout="element.hovered = false"
              class="mt-2 grid w-60 hover:bg-n-purple rounded-md p-4 cursor-pointer"
              :class="darkMode ? 'bg-n-bg' : 'bg-white'"
            >
              <div class="grid gap-1">
                <p
                  class="text-sm font-semibold"
                  :class="darkMode ? 'text-white' : 'text-n-dark-blue'"
                >
                  {{ element.title }}
                </p>
                <p
                  class="text-xs"
                  :class="
                    element.hovered && darkMode
                      ? 'text-white'
                      : element.hovered && !darkMode
                      ? 'text-n-dark-blue'
                      : 'text-n-grey-text'
                  "
                >
                  <!-- {{
                    element.subTasks.filter((ele) => ele.completed === true)
                      .length
                  }}
                  of {{ element.subTasks.length }} subtasks -->
                  {{ element.subTasks.length }} subtasks
                </p>
              </div>
            </div>
          </template>
        </draggable>
      </div>

      <div
        class="flex flex-col gap-3"
        @drop="onDrop($event, 'Approved')"
        @dragover.prevent
        @dragenter.prevent
      >
        <div
          class="flex items-center gap-3 text-n-grey-text text-sm font-semibold w-60"
        >
          <div class="w-5 h-5 rounded-full bg-[#44d26e]"></div>
          {{ "Approved" + " (" + approved.length + ")" }}
        </div>
        <draggable
          class="mt-3 flex flex-col gap-2 text-n-grey-text text-sm font-semibold min-h-screen w-60"
          :list="approved"
          group="people"
          itemKey="id"
        >
          <template #item="{ element }">
            <div
              @dragstart="startDrag($event, element)"
              @click="showDetails(element)"
              @mouseover="element.hovered = true"
              @mouseout="element.hovered = false"
              class="mt-2 grid w-60 hover:bg-n-purple rounded-md p-4 cursor-pointer"
              :class="darkMode ? 'bg-n-bg' : 'bg-white'"
            >
              <div class="grid gap-1">
                <p
                  class="text-sm font-semibold"
                  :class="darkMode ? 'text-white' : 'text-n-dark-blue'"
                >
                  {{ element.title }}
                </p>
                <p
                  class="text-xs"
                  :class="
                    element.hovered && darkMode
                      ? 'text-white'
                      : element.hovered && !darkMode
                      ? 'text-n-dark-blue'
                      : 'text-n-grey-text'
                  "
                >
                  <!-- {{
                    element.subTasks.filter((ele) => ele.completed === true)
                      .length
                  }}
                  of {{ element.subTasks.length }} subtasks -->
                  {{ element.subTasks.length }} subtasks
                </p>
              </div>
            </div>
          </template>
        </draggable>
      </div>

      <div v-if="newColumns.length" class="flex gap-8">
        <div
          v-for="(column, idx) in newColumns"
          :key="idx"
          class="flex flex-col gap-3"
          @drop="onDrop($event, column)"
          @dragover.prevent
          @dragenter.prevent
        >
          <div
            class="flex items-center gap-3 text-n-grey-text text-sm font-semibold w-60"
          >
            <div class="w-5 h-5 rounded-full bg-white"></div>
            {{ column + " (" + newColumnData.length + ")" }}
          </div>

          <draggable
            class="mt-3 flex flex-col gap-2 text-n-grey-text text-sm font-semibold min-h-screen w-60"
            :list="newColumnData"
            group="people"
            itemKey="id"
          >
            <template #item="{ element }">
              <div
                @dragstart="startDrag($event, element)"
                @click="showDetails(element)"
                @mouseover="element.hovered = true"
                @mouseout="element.hovered = false"
                class="mt-2 grid w-60 hover:bg-n-purple rounded-md p-4 cursor-pointer"
                :class="darkMode ? 'bg-n-bg' : 'bg-white'"
              >
                <div class="grid gap-1">
                  <p
                    class="text-sm font-semibold"
                    :class="darkMode ? 'text-white' : 'text-n-dark-blue'"
                  >
                    {{ element.title }}
                  </p>
                  <p
                    class="text-xs"
                    :class="
                      element.hovered && darkMode
                        ? 'text-white'
                        : element.hovered && !darkMode
                        ? 'text-n-dark-blue'
                        : 'text-n-grey-text'
                    "
                  >
                    <!-- {{
                      element.subTasks.filter((ele) => ele.completed === true)
                        .length
                    }}
                    of {{ element.subTasks.length }} subtasks -->
                    {{ element.subTasks.length }} subtasks
                  </p>
                </div>
              </div>
            </template>
          </draggable>
        </div>
      </div>

      <div class="mt-9">
        <div
          @click="openNewColumnModal"
          class="mr-10 w-60 h-[90%] rounded-md p-4 text-n-grey-text flex justify-center items-center gap-1 cursor-pointer"
          :class="darkMode ? 'bg-n-bg' : 'bg-n-silver-sec'"
        >
          <i class="fa fa-plus text-sm"></i>
          <p class="text-sm font-semibold">New Column</p>
        </div>
      </div>
    </div>

    <div
      class="mt-60 mb-4 flex justify-center items-center text-xs attribution"
      :class="darkMode ? 'text-white' : 'text-n-bg'"
    >
      Challenge by
      <a
        href="https://www.frontendmentor.io?ref=challenge"
        target="_blank"
        class="ml-1"
      >
        Frontend Mentor</a
      >. Coded by
      <a href="https://jekon-dev.netlify.app/" class="ml-1">Jekon</a>.
    </div>
  </div>

  <Modal
    title="Create New Column"
    v-if="showNewColumnModal"
    @close-modal="showNewColumnModal = false"
  >
    <form @submit.prevent="createNewColumn" class="grid gap-4">
      <div class="grid gap-1">
        <label for="" class="text-white text-sm">Column Name</label>
        <input
          type="text"
          placeholder="Name of column"
          autofocus
          class="h-10 bg-transparent text-white border border-n-grey-text rounded-md pl-1 placeholder:pl-1 placeholder:text-sm"
          ref="inputRef"
          v-model="newColumn"
        />
      </div>

      <div
        class="bg-n-bg rounded-xl py-2 px-5 flex justify-center items-center"
      >
        <input type="submit" value="Submit" class="text-white cursor-pointer" />
      </div>
    </form>
  </Modal>

  <Modal
    v-if="showTaskDetailsModal && selectedTask"
    title="Task Details"
    @close-modal="showTaskDetailsModal = false"
  >
    <TaskDetails :task="selectedTask" @success="showTaskDetailsModal = false" />
  </Modal>

  <Toast v-if="showToast" />
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
