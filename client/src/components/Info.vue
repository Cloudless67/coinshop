<template>
    <div class="d-inline-block ps-2">
        <div class="info-icon" @mouseover="active = true" @mouseleave="active = false">
            ?
        </div>
        <p class="info-box" v-show="active" v-html="info"></p>
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
}

.info-box {
    margin-top: 4px;
    min-width: 20ch;
    position: absolute;
    line-height: 2rem;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 8px;
    border-radius: 4px;
}
</style>
