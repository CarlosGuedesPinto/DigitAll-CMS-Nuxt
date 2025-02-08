<template>
  <div
    v-editable="blok"
    class="component-table"
  >
    <span v-if="blok.title" class="ldtech component-table__title" v-html="formatText(blok.title)" />
    <div class="component-table__table" ref="tableContainer" v-if="blok.orientation === 'vertical'">
      <table>
        <thead>
          <tr class="component-table__header extrabold" :class="{ 'component-table__header--headersBlack': blok.tableHeadersColor === 'black' }"> 
            <td v-for="(row, index) in blok.table.thead" :key="index" :class="{
                'sticky-cell': index === 0 && blok.hasFirstLockedColumn,
                'td--scroll-second': index === 1 && blok.hasFirstLockedColumn,
              }">
              <span v-html="formatText(row.value)" />
            </td>
          </tr>
        </thead>
        <tbody class="component-table__body extralight">
          <tr v-for="(row, index) in blok.table.tbody" :key="index">
            <td v-for="(cell, index) in row.body" :key="index" :class="{
                'sticky-cell': index === 0 && blok.hasFirstLockedColumn,
                'td--scroll-second': index === 1 && blok.hasFirstLockedColumn,
              }">
              <span v-html="formatText(cell.value)" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="component-table__table" ref="tableContainer" v-else>
      <table>
        <tbody class="component-table__body component-table__horizontal extralight">
          <tr v-for="(row, index) in blok.table.tbody" :key="index">
            <td v-for="(cell, index) in row.body" :key="index" :class="{
                'semibold content-start': index === 0 && blok.tableHeadersColor === 'black',
                'semibold content-start component-table__blue-content': index === 0 && blok.tableHeadersColor === 'blue',
              }">
              <span v-html="formatText(cell.value)" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <span v-if="blok.footer" class="extralight component-table__footer" v-html="formatText(blok.footer)" />
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

const tableContainer = ref(null);
let previousScrollLeft = 0;

const handleScroll = (event) => {
  const scrollLeft = event.target.scrollLeft;
  const isScrollingLeft = scrollLeft > previousScrollLeft;
  previousScrollLeft = scrollLeft;

  if (isScrollingLeft) {
    tableContainer.value.querySelectorAll('.td--scroll-second').forEach(td => {
      td.classList.add('scrolling');
    });
  } else {
    tableContainer.value.querySelectorAll('.td--scroll-second').forEach(td => {
      td.classList.remove('scrolling');
    });
  }
};

onMounted(() => {
  if (tableContainer.value) {
    tableContainer.value.addEventListener('scroll', handleScroll);
  }
});

onBeforeUnmount(() => {
  if (tableContainer.value) {
    tableContainer.value.removeEventListener('scroll', handleScroll);
  }
});
</script>