<script setup lang="ts">
import LinkIcon from './LinkIcon.vue'
import EditIcon from './EditIcon.vue'
import LoadingIcon from './LoadingIcon.vue'
import SelectedIcon from './SelectedIcon.vue'
import DisabledIcon from './DisabledIcon.vue'

const icons = {
  link: LinkIcon,
  edit: EditIcon,
  loading: LoadingIcon,
  selected: SelectedIcon,
  disabled: DisabledIcon
}

interface Props {
  icon: keyof typeof icons
}

withDefaults(defineProps<Props>(), {})
</script>

<template>
  <component :is="icons[icon]" v-bind="$attrs" fill="var(--color)"></component>
</template>

<style lang="less" scoped></style>
