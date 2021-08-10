<template>
  <div class="container">
    <div class="markdown-title">Another markdown editor</div>
    <div class="markdown-box">
      <div class="left">
        <textarea v-model="htmlRaw" />
      </div>
      <div class="right" v-html="htmlTpl" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  setup() {
    const htmlRaw = ref('')
    const htmlTpl = ref('')

    watch(htmlRaw, () => {
      window.postMessage({
        channel: 'markdown-raw',
        data: htmlRaw.value,
      }, '*')
    })

    window.addEventListener('message', ({ data }) => {
      if (data.channel === 'markdown') {
        htmlTpl.value = data.data
      }
    })

    return {
      htmlRaw,
      htmlTpl,
    }
  },
})
</script>

<style lang="less" scoped>
.container {
  height: 100%;
}

.markdown-title {
  line-height: 44px;
  font-size: 18px;
  margin-left: 24px;
}

.markdown-box {
  height: calc(100% - 44px);
  display: flex;

  .left {
    height: 100%;
    width: 50%;

    textarea {
      box-sizing: border-box;
      padding: 10px;
      height: 100%;
      width: 100%;
      outline: none;
      border: none;
    }
  }

  .right {
    box-sizing: border-box;
    padding: 10px;
    height: 100%;
    flex-grow: 1;
    background-color: aliceblue;
  }
}
</style>
