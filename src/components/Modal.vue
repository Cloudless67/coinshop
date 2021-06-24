<template>
    <teleport to="#modal">
        <div class="back" @click="$emit('close')">
            <div
                class="container"
                :style="{ 'max-width': width, 'max-height': height }"
                @click.stop
            >
                <slot></slot>
            </div>
        </div>
    </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        width: {
            type: String,
            default: '720px',
        },
        height: {
            type: String,
            default: '1440px',
        },
    },
    emits: ['close'],
});
</script>

<style lang="scss" scoped>
.back {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
}

.container {
    border-radius: 10px;
    background: white;
    z-index: 2;
}
</style>
