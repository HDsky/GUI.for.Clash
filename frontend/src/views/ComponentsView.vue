<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/Button/index.vue'
import Switch from '@/components/Switch/index.vue'
import Select from '@/components/Select/index.vue'
import InputList from '@/components/InputList/index.vue'

const switchState = ref(false)
const selectState = ref('two')

const list = ref(['one', 'two', 'three'])
</script>

<template>
  <div>
    <Button type="primary">Primary Button</Button>
    <Button type="normal">Default Button</Button>
    <Button type="primary" size="small">Small Button</Button>
    <Button type="normal" size="large">Large Button</Button>
    <Button loading type="link">Link Button</Button>
    <Button loading type="text">Text Button</Button>
    <Button loading type="primary">Loading</Button>
    <Switch v-model="switchState" />
    <Select
      v-model="selectState"
      :options="[
        { label: 'one', value: 'one' },
        { label: 'two', value: 'two' },
        { label: 'three', value: 'three' },
        { label: 'four', value: 'four' }
      ]"
    />

    <InputList v-model="list" />
  </div>
</template>

<style lang="less" scoped></style>
