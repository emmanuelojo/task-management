<script  setup lang="ts">
import { ref } from 'vue';
// import { defineComponent } from "vue";

// export default defineComponent({
//   name: "CheckOutModal",
// });
</script>

<template>
  <div>
    <teleport to="#toast">
      <div>
        <transition name="slide" mode="out-in" appear>
          <div
            class="w-fit h-16 fixed top-1 right-0 translate grid justify-center items-center opacity-100 z-30 bg-white"
          >
            <div class="relative flex items-center">
              <div class="bg-yellow-500 absolute left-0 h-16 w-1"></div>
              <div class="px-4 flex items-center gap-5">
                <div
                  class="border border-yellow-500 rounded-full w-7 h-7 flex justify-center items-center"
                >
                  <i class="fa fa-exclamation text-yellow-500"></i>
                </div>

                <p class="text-sm font-medium">Maximum number of columns created</p>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </teleport>
  </div>
</template>

<style>
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 1s ease;
}
</style>
