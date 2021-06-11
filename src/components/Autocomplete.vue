<template>
    <div>
        <input
            type="text"
            :value="value"
            :style="{ width }"
            :disabled="disabled"
            @keydown.down="handleDown"
            @keydown.up="handleUp"
            @keydown.enter.exact="handleEnter"
            @input="updateInput($event.target.value)"
            @focus="active = true"
            @blur="active = false"
            @keydown.esc="active = false"
        />
        <ul v-show="active" class="list-group shadow position-absolute" ref="list">
            <li
                class="list-group-item"
                v-for="(cand, i) in candidates"
                :key="i"
                :class="{ active: i === focus }"
                @mousedown.prevent="select(cand)"
                @mouseover="focus = i"
                @mouseleave="focus = -1"
            >
                {{ cand }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, PropType, ref, toRefs, watch } from 'vue';

export default defineComponent({
    name: 'Autocomplete Input',
    emits: ['update'],
    props: {
        value: {
            type: String,
            required: true,
        },
        itemsList: {
            type: Array as PropType<string[][]>,
            required: true,
        },
        disabled: { type: Boolean, default: false },
        width: String,
    },
    setup(props) {
        const { value, itemsList } = toRefs(props);

        const active = ref(false);
        const focus = ref(-1);
        const down = ref(false);
        const list = ref<HTMLElement>();

        const candidates = computed(() => {
            if (down.value)
                return itemsList.value
                    .filter(x => x.some(y => y.includes(value.value)))
                    .map(elem => elem[0]);
            else
                return itemsList.value
                    .filter(x => x.some(y => y.includes(value.value)))
                    .reverse()
                    .map(elem => elem[0]);
        });

        watch(active, async cur => {
            if (!cur) return;
            await nextTick();
            const td = list.value!.closest('td')!;
            const wrapper = td.closest('section')!;
            down.value = showDirection(td, list.value!.closest('table')!, wrapper) === 'down';
            if (down.value) {
                setPositionBelow(list.value!, td);
                scrollToTop(list.value!);
                focus.value = -1;
            } else {
                setPositionAbove(list.value!, td, wrapper);
                scrollToBottom(list.value!);
                focus.value = candidates.value.length;
            }
        });

        return { active, focus, down, list, candidates };
    },
    methods: {
        updateInput(value: string) {
            this.active = true;
            this.$emit('update', value);
        },
        select(cand: string) {
            this.active = false;
            this.$emit('update', cand);
        },
        handleDown() {
            if (this.down) this.active = true;
            this.focus = Math.min(this.focus + 1, this.candidates.length - (this.down ? 1 : 0));
            if (this.focus < this.candidates.length) this.scrollView();
            else this.active = false;
        },
        handleUp() {
            if (!this.down) this.active = true;
            this.focus = Math.max(this.focus - 1, this.down ? -1 : 0);
            if (this.focus < 0) this.active = false;
            else this.scrollView();
        },
        handleEnter() {
            if (this.active && this.focus >= 0 && this.focus < this.candidates.length)
                this.select(this.candidates[this.focus]);
        },
        scrollView() {
            this.list!.children[this.focus].scrollIntoView({ block: 'nearest' });
        },
    },
});

const showDirection = (td: HTMLElement, table: HTMLElement, wrapper: HTMLElement) => {
    return td.offsetTop + td.offsetHeight + 200 <= table.offsetHeight ||
        td.offsetTop + td.offsetHeight + 200 <= wrapper.offsetHeight
        ? 'down'
        : 'up';
};

const setPositionBelow = (list: HTMLElement, td: HTMLElement) => {
    list.style.top = `${td.offsetTop + td.offsetHeight}px`;
    list.style.bottom = '';
};

const setPositionAbove = (list: HTMLElement, td: HTMLElement, wrapper: HTMLElement) => {
    list.style.bottom = `${wrapper.offsetHeight - td.offsetTop}px`;
    list.style.top = '';
};

const scrollToTop = (el: HTMLElement) => el.scrollTo(0, 0);

const scrollToBottom = (el: HTMLElement) => el.scrollTo(0, el.scrollHeight);
</script>

<style lang="scss" scoped>
.list-group {
    list-style: none;
    position: absolute;
    width: fit-content;
    max-height: 200px;
    overflow: auto;
    white-space: nowrap;
    z-index: 1;
}

.list-group-item {
    padding-top: 0;
    padding-bottom: 0;

    &:hover {
        cursor: pointer;
    }
}
</style>
