<template>
    <thead>
        <tr>
            <th v-for="header in headers" :key="header">
                {{ header }}
            </th>
        </tr>
    </thead>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Table Header',
    props: ['headers'],
});
</script>

<style scoped>
th {
    text-align: center;
    white-space: pre-wrap;
}
</style>
