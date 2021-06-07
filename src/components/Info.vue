<template>
    <div class="d-inline-block ps-2">
        <div class="info-icon" @mouseover="active = true" @mouseleave="active = false">
            ?
        </div>
        <transition name="grow-down">
            <p class="info-box" v-show="active" v-html="info"></p>
        </transition>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Info',
    props: {
        info: { type: String, required: true },
    },
    data() {
        return { active: false };
    },
});
</script>

<style lang="scss" scoped>
.info-icon {
    background: #000;
    border-radius: 50%;
    width: 1.5rem;
    height: 1.5rem;
    color: white;
    text-align: center;
    cursor: pointer;
    user-select: none;
}

.info-box {
    margin-top: 4px;
    min-width: 20ch;
    position: absolute;
    line-height: 2rem;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    border-radius: 4px;
    padding: 8px;
    user-select: none;
}

.grow-down-enter-active,
.grow-down-leave-active {
    transition: opacity 0.2s ease;
}

.grow-down-enter-from,
.grow-down-leave-to {
    opacity: 0;
}
</style>
