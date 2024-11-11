<template>
  <page-component>
    <page-header separator>
      <span>EVENTS PAGE</span>
    </page-header>
    <page-body>
      <div class="q-pa-md">
        <p v-for="i in 20" :key="i">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque
          praesentium illo magnam ad impedit quo. Eaque repellendus culpa
          facilis cumque officia commodi officiis, fugit soluta ipsa? Ea
          repellendus possimus iure!
        </p>
      </div>
    </page-body>
  </page-component>
</template>

<script setup lang="ts"></script>
