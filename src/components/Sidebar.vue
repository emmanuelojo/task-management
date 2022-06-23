<script setup lang="ts">
import { ref } from 'vue';

const sidebarTabs = ref(['Platform Launch', 'Marketing Plan', 'Roadmap' , 'Create New Board'])
</script>

<template>
    <nav class="bg-n-bg h-screen w-52 border flex flex-col justify-between"> 
        <div>
            <p class="uppercase text-white text-center pt-5 pb-10 font-bold">Logo </p>
        
            <div>
                <p class="px-4 pb-2 uppercase text-n-grey-text text-xs font-semibold">All Boards (3)</p>
                <ul class="grid gap-4">
                    <li v-for="(tab, idx) in sidebarTabs" :key="idx" class="px-4 w-44 flex items-center gap-[10px] font-semibold hover:bg-n-purple hover:text-white hover:rounded-r-3xl cursor-pointer" :class="idx === 0 ? 'bg-n-purple text-white rounded-r-3xl' : idx === sidebarTabs.length -1 ? ' text-n-purple-sec' :  'text-n-grey-text'">
                        <i :class="idx === sidebarTabs.length -1 ? 'fa fa-plus' : 'fa fa-film'"></i> <p class=" capitalize py-2 text-xs">{{ tab}}</p>
                    </li>
                </ul>
            </div>
        </div>

        <div class="grid gap-4 px-4 mb-4">
            <div class="bg-n-bg-sec text-n-grey-text flex justify-center items-center gap-4 rounded-md py-2">
                <i class=" fa fa-sun-o"></i>

                 <label class="switch">
                    <input
                    type="checkbox"
                    class="w-0 h-0"
                    />

                    <span class="slider rounded"></span>
                </label>

                <i class=" fa fa-moon-o"></i>
            </div>

            <div class="flex items-center gap-2 text-n-grey-text text-xs font-semibold">
                <i class=" fa fa-eye"></i> <p> Hide Sidebar</p>
            </div>
        </div>
    </nav>
</template>

<style>
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;}

 .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
 .switch input:checked + .slider {
    background-color: #6868f7;
  }

 .switch input:focus + .slider {
    box-shadow: 0 0 1px #6868f7;
  }

 .switch input:checked + .slider:before {
    -webkit-transform: translateX(20px);
    -ms-transform: translateX(20px);
    transform: translateX(20px);
  }
 .switch .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    border-radius: 20px;
    -webkit-transition: 0.4s;
    transition: 0.4s;
 }

   .switch .slider:before {
      position: absolute;
      content: '';
      height: 15px;
      width: 15px;
      left: 2px;
      bottom: 4px;
      top: 3px;
      border-radius: 50%;
      background-color: white;
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }

.c-switch {
  position: relative;
  display: block;
  height: 20px;
  width: 80px;
  border-radius: 40%;
  overflow: hidden;
  border: 2px solid;
  cursor: pointer;
  }

  .c-switch span {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    transition: 2s ease-in-out;
  }

    .c-switch span::after {
      content: '';
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      /* left: 4px; */
      right: 0;
      width: 12px;
      height: 12px;
      border-radius: 50%; 
      animation-duration: 300ms;
      border: 2px solid #d9d9d9;
    }


input:checked + span {
  background: #8470f4;
}

input:checked + span::after {
  top: 50%;
  left: calc(100% - 4px);
  transform: translateX(-100%) translateY(-50%);
  animation: toggleSize 300ms ease;
}

</style>