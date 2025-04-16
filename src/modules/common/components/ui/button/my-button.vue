<template>
  <button class="h-8 w-8">
    <span class="short-text">
      <Terminal class="size-5" />
    </span>
    <span class="long-text"> G R E E T I N G S! </span>
  </button>
</template>

<script lang="ts" setup>
import { Terminal } from 'lucide-vue-next';
</script>

<style scoped>
button {
  border: 1px solid red;
  background-color: #00a750;
  transition: all 1s;
  cursor: pointer;
  padding: 10px;
  color: white;

  &:hover {
    transition: all 1s cubic-bezier(0.62, 0.1, 0.5, 1);
    width: 250px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;

    .long-text {
      transition:
        width 1s linear 1s,
        font-size 1s linear 1s;
      margin-left: 45px;
      width: auto;
      display: block;
    }
  }

  span {
    color: white;
    position: absolute;
    left: 25px;
    top: 20px;
    line-height: 28px;
  }

  .long-text {
    white-space: nowrap;
    color: white;
    width: 0;
    margin: 0;
    display: none;
  }
}
</style>
