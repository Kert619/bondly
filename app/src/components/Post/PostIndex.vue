<template>
  <div class="column q-gutter-y-sm">
    <div class="q-pa-sm">
      <PostCreate />
    </div>
    <q-separator size="5px" :color="$q.dark.isActive ? 'grey-10' : 'grey-4'" />
    <div class="q-pa-sm">
      <p v-for="i in 20" :key="i">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus
        provident quibusdam voluptates nobis autem sed similique blanditiis enim
        corrupti accusantium, distinctio nam quis commodi nisi quisquam quam
        mollitia? Nostrum, voluptatem.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import PostCreate from 'components/Post/PostCreate.vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();
</script>
