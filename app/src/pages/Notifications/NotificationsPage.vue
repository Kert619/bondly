<template>
  <page-component>
    <page-header separator>
      <span>NOTIFICATIONS PAGE</span>
    </page-header>
    <page-body>
      <div class="q-pa-md">
        <p v-for="i in 20" :key="i">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet
          minus ex iure. Rem natus neque esse assumenda, aut perferendis?
          Voluptatibus, ea eveniet similique nihil perspiciatis facilis ab
          placeat quos sunt.
        </p>
      </div>
    </page-body>
  </page-component>
</template>

<script setup lang="ts"></script>
