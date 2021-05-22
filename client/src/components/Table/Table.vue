<template>
    <table class="table table-sm table-borderless">
        <thead>
            <tr>
                <th v-for="header in tableData.headers" :key="header">
                    {{ header }}
                </th>
            </tr>
        </thead>
        <tbody>
            <TableRow
                v-for="i in tableData.bodyData.length"
                :key="i"
                :rowData="tableData.bodyData[i - 1]"
            />
        </tbody>
    </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { TableInfo } from '@/types';
import TableRow from './TableRow.vue';

export default defineComponent({
    name: 'Table',
    components: { TableRow },
    props: {
        tableData: {
            type: Object as PropType<TableInfo>,
            required: true,
        },
    },
});
</script>
