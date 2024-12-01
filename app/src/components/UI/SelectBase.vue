<template>
  <q-select
    v-model="model"
    :label="label"
    dense
    options-dense
    emit-value
    map-options
    :options="selectOptions"
    :use-input="useInput"
    :clearable="clearable"
    @filter="filterFn"
  >
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section>
          <q-item-label>{{ scope.opt.label }}</q-item-label>
        </q-item-section>

        <q-item-section class="items-end">
          <q-icon :name="scope.opt.icon" />
        </q-item-section>
      </q-item>
    </template>

    <template #selected-item="scope">
      <div class="row items-center q-gutter-x-sm">
        <span>{{ scope.opt.label }}</span>
        <q-icon
          v-if="scope.opt.icon"
          :name="scope.opt.icon"
          style="margin-bottom: 5px"
        />
      </div>
    </template>
  </q-select>
</template>

<script setup lang="ts">
import { QSelectOption } from 'quasar';
import { ref, Ref } from 'vue';

const props = defineProps<{
  options: QSelectOption<string | number>[];
  label?: string;
  useInput?: boolean;
  clearable?: boolean;
}>();

const model = defineModel<number | string | null>();

const selectOptions: Ref<QSelectOption<string | number>[]> = ref(props.options);

const filterFn = (val: string, update: (arg: () => void) => void) => {
  update(() => {
    if (val === '') {
      selectOptions.value = props.options;
    } else {
      const needle = val.toLowerCase().trim();
      selectOptions.value = props.options.filter(
        (v) => v.label.toLowerCase().trim().indexOf(needle) > -1
      );
    }
  });
};
</script>
