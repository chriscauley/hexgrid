<template>
  <hex-grid />
</template>

<script>
import HexGrid from './components/HexGrid.vue'

export default {
  components: {
    HexGrid,
  },
}
</script>

<style>
body {
  overflow-x: auto !important;
}
#app > div {
  padding: 10px;
}
</style>
