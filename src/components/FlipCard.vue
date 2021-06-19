<template>
    <div class="flip-card" :class="{ flipped }">
        <div class="flip-card-front">
            <slot name="front"></slot>
        </div>
        <div class="flip-card-back">
            <slot name="back"></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        flipped: {
            type: Boolean,
            required: true,
        },
    },
});
</script>

<style lang="scss" scoped>
.flip-card {
    position: relative;
    transform-style: preserve-3d;
    transition: all 0.3s ease;
}

.flip-card.flipped {
    transform: rotateX(180deg);
}

.flip-card-front,
.flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
}

.flip-card-back {
    transform: rotateX(180deg);
}
</style>
