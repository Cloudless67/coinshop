<template>
    <input
        class="w-100"
        :value="commaSeperatedNumber(modelValue)"
        @input="emitEvent($event.target.value)"
    />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useUtilities from '@/composables/useUtilities';

export default defineComponent({
    props: ['modelValue', 'min', 'max'],
    emits: ['update:modelValue'],
    setup: useUtilities,
    methods: {
        emitEvent(value: string) {
            let num = Number.parseInt(value.replaceAll(',', ''));
            if (this.min || this.min === 0) num = Math.max(num, this.min);
            if (this.max || this.max === 0) num = Math.min(num, this.max);
            this.$emit('update:modelValue', num || 0);
            this.$forceUpdate();
        },
    },
});
</script>
