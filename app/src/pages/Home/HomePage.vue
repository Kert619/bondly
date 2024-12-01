<template>
  <page-component>
    <page-header separator class="justify-between">
      <app-logo class="text-h6" />
      <div class="row items-center q-gutter-x-sm">
        <q-btn flat dense icon="search" round to="/home/child" />
        <q-btn flat dense icon="chat" round />
        <q-btn flat dense round>
          <q-avatar size="sm">
            <ImageBase
              :src="userThumbnail"
              transformations="n-small_thumbnail"
            />
          </q-avatar>
        </q-btn>
      </div>
    </page-header>
    <page-body>
      <div class="q-pa-md">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus magnam
          commodi eveniet reiciendis, eum recusandae voluptatibus aliquam
          necessitatibus ex. Voluptas dicta quasi alias impedit magni,
          recusandae obcaecati quis dolorem nesciunt sed accusantium tenetur.
          Quasi quos possimus impedit nam accusamus aperiam delectus laboriosam
          nisi et aut eum vero at quam dolorum, incidunt neque. Incidunt
          repellendus ut odit eum earum obcaecati amet in ex quae praesentium,
          reiciendis libero dolor tenetur labore saepe molestias corrupti fugit
          ratione exercitationem? Ut fugiat, voluptatibus, aperiam quo qui natus
          pariatur amet sint mollitia autem tempora quibusdam hic nihil modi
          laborum at, nobis architecto porro repellendus corrupti? Totam
          accusamus vitae delectus amet aut ducimus, autem eos, possimus eum
          aspernatur odio, commodi rerum ad. Architecto, aliquid esse. Sapiente
          voluptates perferendis amet fuga obcaecati voluptas vitae deleniti vel
          quod aperiam autem commodi repellat eligendi dignissimos quibusdam
          recusandae modi possimus, nihil aut sit! Error voluptates deserunt
          quia repellendus iure minima harum aut quisquam, iusto obcaecati
          repudiandae accusantium facere beatae blanditiis, autem, voluptate
          doloribus tempore excepturi! Ab natus explicabo reiciendis corrupti
          vitae nulla et iusto quo mollitia sapiente hic nemo fuga eveniet
          praesentium repellat itaque odio, aut nobis tempore dolorum dicta.
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus
          adipisci illo vel eveniet deleniti reiciendis, ipsam quam doloribus
          exercitationem quaerat a. Eveniet similique quos nisi voluptates
          possimus. Incidunt earum voluptatibus autem, neque, sed sequi
          consequatur molestiae libero reiciendis tempore ab architecto quisquam
          iure, dolores recusandae! Ab assumenda enim delectus possimus,
          doloribus, repellendus, repudiandae ut laborum impedit expedita quos
          repellat perferendis ea? Maiores excepturi, eaque eius sunt repellat
          amet, qui exercitationem sint, voluptate tenetur error a inventore
          itaque similique minima corrupti cumque? Voluptatibus possimus quidem,
          est dignissimos totam ratione consequuntur consectetur eos doloremque
          ullam ipsam, aspernatur maxime facere facilis maiores veritatis? Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Quis dolorem ex,
          nihil rem maiores aspernatur enim facilis, eos provident quisquam sed
          harum. Inventore, fuga cupiditate. Consectetur dolores asperiores
          quisquam incidunt, magni dicta reiciendis. Vel praesentium harum
          dolorum quibusdam quod optio a possimus! Ea molestias, sequi fuga
          iusto enim at vero officiis nihil nesciunt aspernatur ad magnam
          repudiandae ullam odio ab quis mollitia! Fugiat quasi pariatur
          excepturi animi dicta consequatur exercitationem placeat minus ex
          repudiandae, quo eaque. Suscipit sunt, nostrum quisquam
          exercitationem, officiis ullam corrupti tempora facere nihil,
          excepturi officia minima. Deserunt beatae quibusdam rerum ipsam facere
          corporis non eaque, ex commodi voluptate sint odit ipsa excepturi
          dolorem assumenda. Delectus nulla temporibus architecto dolores nam,
          quam corporis voluptas repudiandae doloremque praesentium quaerat
          dolor minima ipsum sequi repellendus! Tempora exercitationem
          distinctio, ab similique, possimus saepe sint ex in nemo accusamus,
          dignissimos nobis assumenda! Delectus rerum commodi laboriosam porro
          odio, repellat quibusdam minima esse aliquid, ex quis consequatur
          beatae accusamus non iusto reiciendis repudiandae eos? Perspiciatis
          eveniet consequuntur in repudiandae? Nemo officia vero eligendi quod
          ullam voluptatibus ad, porro cum! Necessitatibus facere consectetur
          fugiat sit architecto, minus, quod pariatur asperiores labore nam
          beatae animi! A nihil libero totam aliquam, est repudiandae rem porro.
          Delectus rerum commodi laboriosam porro
        </p>
      </div>
    </page-body>
  </page-component>
</template>

<script setup lang="ts">
import { ImagePath } from 'src/enums/image-path';
import { useAuthStore } from 'src/stores/auth';
import { computed } from 'vue';
import ImageBase from 'components/UI/ImageBase.vue';

const authStore = useAuthStore();

const userThumbnail = computed(() => {
  return authStore.userProfile?.profile_photo
    ? `${ImagePath.Profile_Photo_Cropped}/${authStore.userProfile.profile_photo}`
    : '/default-profile-256.png';
});
</script>
