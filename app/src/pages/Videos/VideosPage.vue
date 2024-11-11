<template>
  <page-component>
    <page-header separator>
      <span>VIDEOS PAGE</span>
    </page-header>
    <page-body>
      <div class="q-pa-md">
        <p v-for="i in 20" :key="i">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
          temporibus voluptates corrupti quas totam explicabo, vel placeat vero
          expedita fugit sint at maiores ullam sunt! Porro ullam placeat eius
          atque?
        </p>
      </div>
    </page-body>
  </page-component>
</template>

<script setup lang="ts"></script>
