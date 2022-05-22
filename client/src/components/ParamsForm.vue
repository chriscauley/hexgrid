<template>
  <unrest-form :schema="schema" :state="state" :onInput="input">
    <template #actions>
      <div class="btn -danger" @click="$local.reset">Reset</div>
      <div class="btn -info" @click="save">Save</div>
    </template>
  </unrest-form>
</template>

<script>
const schema = {
  type: 'object',
  properties: {
    board_length: { type: 'string' },
    hex_radius: { type: 'string' },
    space: { type: 'string' },
    px_per_inch: { type: 'string' },
    layout: { type: 'string', enum: ['board', 'pieces'] },
  },
}

export default {
  data() {
    const { state } = this.$local
    return { schema, state }
  },
  methods: {
    input() {
      this.$local.save(this.state)
    },
    save() {
      const data = document.querySelector('svg').outerHTML
      const blob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      const is_board = this.$local.state.layout === 'board'
      link.href = url
      link.download = `${is_board ? 'board' : 'pieces'}.svg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
  },
}
</script>

<style>
.ur-form {
  background: var(--bg);
  border-width: 1px;
  bottom: 0;
  padding: 0.5rem;
  position: fixed;
  right: 0;
  width: 300px;
}
</style>
