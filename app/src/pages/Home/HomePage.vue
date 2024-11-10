<template>
  <page-component>
    <page-header class="bg-primary"> HELLO HEADER </page-header>
    <page-body>
      <div class="q-pa-md">
        <p v-for="i in 20" :key="i">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo quidem
          perspiciatis iure quaerat sequi dolore totam, ipsa ipsam sint magni
          voluptatum sit obcaecati esse dolor nostrum amet est mollitia quasi!
        </p>
      </div>
    </page-body>
  </page-component>
</template>

<script setup lang="ts"></script>
