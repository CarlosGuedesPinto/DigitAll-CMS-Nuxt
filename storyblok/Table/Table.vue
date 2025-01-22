<template>
  <div
    v-editable="blok"
    class="component-table"
  >
    <span v-if="blok.title" class="ldtech component-table__title" v-html="formatText(blok.title)" />
    <div class="component-table__table">
      <table>
        <thead>
          <tr class="component-table__header extrabold" :class="{ 'component-table__header--headersBlack': blok.tableHeadersColor === 'black' }"> 
            <td v-for="(row, index) in blok.table.thead" :key="index" :class="{
                'sticky-cell': index < 2,
                'sticky-cell--second': index === 1,
              }":style="index === 1 ? { left: firstCellWidth + 'px' } : {}" ref="tableCells">
              <span v-html="formatText(row.value)" />
            </td>
          </tr>
        </thead>
        <tbody class="component-table__body extralight">
          <tr v-for="(row, index) in blok.table.tbody" :key="index">
            <td v-for="(cell, index) in row.body" :key="index" :class="{
                'sticky-cell': index < 2,
                'sticky-cell--second': index === 1,
              }" :style="index === 1 ? { left: firstCellWidth + 'px' } : {}" ref="tableCells">
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

const tableCells = ref([]);
const firstCellWidth = ref(0);

const updateFirstCellWidth = () => {
  if (tableCells.value.length > 0) {
    firstCellWidth.value = tableCells.value[0].offsetWidth;
  }
};

onMounted(() => {
  nextTick(() => {
    updateFirstCellWidth();
    window.addEventListener('resize', updateFirstCellWidth);
  });
});

</script>