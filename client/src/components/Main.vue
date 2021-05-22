<template>
    <div>
        <Table :tableData="tableData" />
    </div>
</template>

<script lang="ts">
import { TableInfo } from '@/types';
import { defineComponent } from 'vue';
import Table from './Table/Table.vue';

export default defineComponent({
    name: 'Main',
    components: { Table },
    data() {
        return {
            tableData: {
                headers: [
                    '닉네임',
                    '최대 보유 코인',
                    '사용할 코인',
                    '잉여 코인',
                ],
                bodyData: [
                    [
                        { data: '본캐', editable: true },
                        { data: 23200, editable: false },
                        { data: 0, editable: false },
                        { data: 23200, editable: false },
                    ],
                    [
                        { data: '부캐 1', editable: true },
                        { data: 16800, editable: false },
                        { data: 0, editable: false },
                        { data: 16800, editable: false },
                    ],
                ],
            } as TableInfo,
        };
    },
});
</script>
