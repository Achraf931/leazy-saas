<template>
  <div class="items z-50 flex flex-col h-auto max-h-[330px] w-28 overflow-y-auto rounded-md border border-stone-200 bg-white p-1 shadow-md transition-all">
    <button
        class="item"
        v-for="(item, index) in items"
        :key="index"
        @click="selectItem(index)"
    >
      <div class="flex items-center w-full p-1 gap-1.5 space-x-2 text-sm text-left rounded-md text-stone-900 hover:bg-stone-100" :class="index === selectedIndex ? 'bg-stone-100 text-stone-900' : ''">
        <img v-if="item.fallbackImage" :src="item.fallbackImage" align="absmiddle">
        <template v-else>
          {{ item.emoji }}
        </template>
        :{{ item.name }}:
      </div>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },

    command: {
      type: Function,
      required: true,
    },

    editor: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      selectedIndex: 0,
    }
  },

  watch: {
    items() {
      this.selectedIndex = 0
    },
  },

  methods: {
    onKeyDown({ event }) {
      if (event.key === 'ArrowUp') {
        this.upHandler()
        return true
      }

      if (event.key === 'ArrowDown') {
        this.downHandler()
        return true
      }

      if (event.key === 'Enter') {
        this.enterHandler()
        return true
      }

      return false
    },

    upHandler() {
      this.selectedIndex = ((this.selectedIndex + this.items.length) - 1) % this.items.length
    },

    downHandler() {
      this.selectedIndex = (this.selectedIndex + 1) % this.items.length
    },

    enterHandler() {
      this.selectItem(this.selectedIndex)
    },

    selectItem(index) {
      const item = this.items[index]

      if (item) {
        this.command({ name: item.name })
      }
    },
  },
}
</script>

<style lang="scss">
.item {
  img {
    width: 1em;
    height: 1em;
  }
}
</style>
