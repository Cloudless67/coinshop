<template>
    <tr>
        <td v-for="i in rowData.length" :key="i">
            <input
                class="form-control"
                :disabled="!rowData[i - 1].editable"
                type="text"
                v-model="rowData[i - 1].data"
            />
        </td>
    </tr>
</template>

<script lang="ts">
import { TableRow } from '@/types';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    name: 'Table Row',
    props: {
        rowData: {
            type: Object as PropType<TableRow>,
            required: true,
        },
    },
    data() {
        return {
            td: [] as Array<string | number>,
        };
    },
});
</script>
