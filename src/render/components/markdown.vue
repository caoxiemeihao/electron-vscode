<template>
  <div class="markdown-box">
    <div class="left">
      <textarea v-model="htmlRaw" />
    </div>
    <div class="right" v-html="htmlTpl" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  setup() {
    const htmlRaw = ref('')
    const htmlTpl = ref('')

    watch(htmlRaw, () => {
      console.log(htmlRaw.value)
    })
    
    console.log('=====================')

    return {
      htmlRaw,
      htmlTpl,
    }
  },
})
</script>

<style scoped>
.markdown-box {
  height: 100%;
}
</style>
