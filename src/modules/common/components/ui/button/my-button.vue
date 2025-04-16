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
  /* width: 100px; */
  /* height: 70px; */
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
        opacity 1s,
        width 1s linear 1s,
        font-size 1s linear 1s;
      opacity: 1;
      margin-left: 45px;
      font-size: 20px;
      width: auto;
    }
  }

  span {
    color: white;
    position: absolute;
    left: 25px;
    top: 20px;
    line-height: 28px;
  }

  .short-text {
    .icon {
      /* width: 30px; */
      /* height: 30px; */
    }
  }

  .long-text {
    transition: opacity 1s;
    opacity: 0;
    white-space: nowrap;
    color: white;
    font-size: 0;
    width: 0;
    margin: 0;
  }
}
</style>
