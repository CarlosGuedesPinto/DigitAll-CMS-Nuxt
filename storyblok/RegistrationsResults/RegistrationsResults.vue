<template>
  <div
    v-editable="blok"
    class="registrations-results"
  >
    <span v-if="blok.title" class="ldtech registrations-results__title" v-html="formatText(blok.title)" />
    <table class="registrations-results__table">
      <thead>
        <tr class="registrations-results__header extrabold"> 
          <td v-for="(row, index) in blok.table.thead" :key="index">
            <span v-html="formatText(row.value)" />
          </td>
        </tr>
      </thead>
      <tbody class="registrations-results__body extralight">
        <tr v-for="(row, rowIndex) in blok.table.tbody" :key="rowIndex">
          <td class="registrations-results__row-td" v-for="(cell, cellIndex) in row.body.slice(0, -3)" :key="cellIndex" :class="{
            'registrations-results__row-td--last': cellIndex === row.body.slice(0, -3).length - 1,
            'registrations-results__row-td--last-top': rowIndex === 0 && cellIndex === row.body.slice(0, -3).length - 1,
            'registrations-results__row-td--last-bottom': rowIndex === blok.table.tbody.length - 1 && cellIndex === row.body.slice(0, -3).length - 1,
          }">
            <span v-html="formatText(cell.value)" />
          </td>
          <td class="registrations-results__button semibold" v-for="(cell, cellIndex) in row.body.slice(-3)" :key="cellIndex">
            <Button
              :blok="parseCellValue(cell.value)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import "./RegistrationsResults.scss";
import { formatText } from '~/src/helpers/text';
import Button from '../Button/Button.vue';

const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});

const parseCellValue = (value) => {
  const match = value.match(/"([^"]+)"\s*\/\s*"([^"]+)"/);
  if (match) {
    const text = match[1].trim().replace(/"/g, '');
    const link = match[2].trim();
    
    return {
      text,
      link,
      variant: 'primary',
      iconLeft: false,
    };
  }
};
</script>