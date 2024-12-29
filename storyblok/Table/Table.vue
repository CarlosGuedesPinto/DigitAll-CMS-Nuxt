<template>
  <div
    v-editable="blok"
    class="component-table"
  >
    <table class="component-table__table">
      <thead>
        <tr class="component-table__header extrabold"> 
          <td v-for="(row, index) in blok.table.thead" :key="index">
            <span>{{ formatText(row.value) }}</span>
          </td>
        </tr>
      </thead>
      <tbody class="component-table__body extralight">
        <tr v-for="(row, index) in blok.table.tbody" :key="index">
          <td v-for="(cell, index) in row.body" :key="index">
            <span>{{ formatText(cell.value) }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import "./Table.scss";
import { formatText } from '~/src/helpers/text';

const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});

console.log(props.blok);
</script>