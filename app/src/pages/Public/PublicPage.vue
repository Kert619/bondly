<template>
  <page-component>
    <page-header separator>
      <span>PUBLIC PAGE</span>
    </page-header>
    <page-body>
      <div class="q-pa-md">
        <p v-for="i in 20" :key="i">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, ratione
          officiis. Reprehenderit, perspiciatis. Voluptatum, ratione neque dicta
          temporibus doloremque quam quae quisquam pariatur unde ipsum modi illo
          eligendi? Vitae, iure.
        </p>
      </div>
    </page-body>
  </page-component>
</template>

<script setup lang="ts"></script>
