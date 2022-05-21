<template>
  <unrest-form :schema="schema" :state="state" :onInput="input">
    <template #actions>
      <div class="btn -primary" @click="$local.reset">Reset</div>
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
