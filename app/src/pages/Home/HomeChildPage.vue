<template>
  <page-component>
    <page-header separator class="justify-between">
      <page-back-button to="/home" />
      <q-btn label="GrandChild" flat to="/home/child/grandchild" />
    </page-header>
    <page-body :remove-space-footer="useHideFooter()">
      <div class="q-pa-md">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit,
        possimus. Vitae asperiores tempore veritatis fugiat! Iste autem
        perspiciatis cumque architecto! Excepturi eligendi delectus quis id!
        Laboriosam ipsum omnis tempore reprehenderit. Libero nostrum ducimus
        obcaecati unde nobis labore dolorem cupiditate enim. Quo eos quae vero
        quos corporis odio, cumque corrupti maxime sit nesciunt earum
        consequuntur excepturi dicta labore quam. Sapiente, unde necessitatibus!
        Nisi, ratione totam iste labore dolores dignissimos odit iusto ipsum
        nihil. Magnam odit deleniti minus suscipit doloribus consequatur natus
        quod, aperiam hic rerum consectetur repellat, error adipisci distinctio
        corporis impedit debitis sapiente reiciendis nam? Corrupti fuga aliquam
        aliquid maiores minus! Minus, quis! Ex quasi ad maxime maiores esse
        quisquam recusandae odit blanditiis laboriosam dolorum facere beatae
        officiis libero, molestiae atque pariatur eum labore eligendi modi
        perspiciatis sint. Laudantium commodi magnam hic aspernatur dicta.
        Adipisci delectus nisi doloribus eum quas cum labore ratione soluta?
        Accusamus vero corporis natus quae quo ratione voluptate pariatur facere
        molestias sed expedita, culpa tempora mollitia libero! Ipsam id, sed
        facilis commodi libero quam aut, nostrum rerum explicabo vero cupiditate
        iure amet nam quia! Nemo temporibus cupiditate ratione quasi quod, atque
        architecto deserunt dolorem excepturi dolore aspernatur modi ab
        molestias ullam dicta sapiente blanditiis consequatur delectus! Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Soluta ab labore amet
        maxime consequatur beatae minima! Delectus cupiditate, nobis quis
        tenetur ducimus, repellendus omnis, labore quibusdam ex beatae quo
        totam.
      </div>
    </page-body>
  </page-component>
</template>

<script setup lang="ts">
import { useHideFooter } from 'src/composables/useHideFooter';
</script>
