<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import rawRoutes from '@/router/routes'
import Button from '@/components/Button/index.vue'

const route = useRoute()

const { t } = useI18n()

const routes = rawRoutes.filter((r) => !r.meta?.hide)
</script>

<template>
  <div class="nav">
    <div v-for="r in routes" :key="r.path" class="btn">
      <RouterLink :to="r.path">
        <Button :type="route.name === r.name ? 'link' : 'text'">
          {{ (r.meta && t(r.meta.name as string)) || r.name }}
        </Button>
      </RouterLink>
    </div>
  </div>
</template>

<style lang="less" scoped>
.nav {
  display: flex;
  justify-content: center;
}
</style>
