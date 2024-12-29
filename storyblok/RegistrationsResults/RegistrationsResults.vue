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
          <td v-for="(index) in blok.buttons" :key="index"/>
        </tr>
      </thead>
      <tbody class="registrations-results__body extralight">
        <tr v-for="(row, index) in blok.table.tbody" :key="index">
          <td class="registrations-results__row-td" v-for="(cell, index) in row.body" :key="index" :class="{
            'forced-border-right': index + 1 === row.body.length,
          }">
            <span v-html="formatText(cell.value)" />
          </td>
          <td class="registrations-results__button semibold" v-for="(button, index) in blok.buttons" :key="index">
            <component
              :is="button.component"
              :blok="button" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import "./RegistrationsResults.scss";
import { formatText } from '~/src/helpers/text';

const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});
</script>