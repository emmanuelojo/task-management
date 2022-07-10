<script lang="ts">
import { defineComponent, onMounted, onUnmounted, PropType } from "vue";
export default defineComponent({
  props: {
    size: {
      type: String as PropType<
        | "sm"
        | "md"
        | "lg"
        | "xl"
        | "2xl"
        | "3xl"
        | "4xl"
        | "5xl"
        | "6xl"
        | "7xl"
        | "8xl"
        | "full"
      >,
      default: "md",
    },
    title: {
      type: String,
      default: "",
    },
    defaultPadding: {
      type: Boolean,
      default: true,
    },
    defaultTitleColour: {
      type: Boolean,
      default: true,
    },
    defaultBackgroundColour: {
      type: String,
      default: "#21212d",
    },
  },

  setup(_, { emit }) {
    onMounted(() => {
      document.body.style.maxHeight = "100vh";
      document.body.style.overflow = "hidden";
    });
    onUnmounted(() => {
      document.body.style.overflow = "auto";
    });
    const closeModal = () => {
      emit("closeModal");
    };
    return {
      closeModal,
    };
  },
  emits: ["closeModal"],
});
</script>

<template>
  <teleport to="#modal">
    <div
      class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 px-4"
      style="z-index: 888"
    >
      <div
        class="modal-content w-[90%] sm:w-96 flex-shrink-0 rounded-md overflow-hidden bg-n-bg-sec"
      >
        <div
          class="flex items-center px-6 mt-6"
          :class="[title ? 'justify-between' : 'justify-end']"
        >
          <h1 v-if="title" class="text-white text-base font-medium">
            {{ title }}
          </h1>
          <button @click="closeModal">
            <i class="fa fa-times text-sm text-white"></i>
          </button>
        </div>

        <div
          class="modal-content__body custom-scrollbar"
          :class="defaultPadding ? 'p-6' : ['p-0', 'mt-6']"
        >
          <slot></slot>
        </div>
      </div>
    </div>
  </teleport>
</template>

<style>
.modal-content {
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}
.modal-content__body {
  overflow: auto;
}
</style>
