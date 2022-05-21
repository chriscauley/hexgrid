<template>
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="W"
      :height="H"
      :viewbox="`0 0 ${W} ${H}`"
      style="border: 1px solid black"
      ref="svg"
    >
      <g ref="g">
        <g v-for="([x, y], i) in xys" :key="i" :transform="`translate(${x}, ${y})`">
          <path stroke="black" fill="#fff" :d="d" />
        </g>
      </g>
    </svg>
    <params-form />
  </div>
</template>

<script>
import { range } from 'lodash'
import ParamsForm from './ParamsForm.vue'

const a = 0.5
const b = Math.sqrt(3) / 2

export default {
  components: { ParamsForm },
  data() {
    setTimeout(this.adjust, 200)
    return {
      offset_x: 0,
      offset_y: 0,
    }
  },
  computed: {
    params() {
      const { board_length, hex_radius, space, px_per_inch } = this.$local.state
      return {
        SIZE: board_length * px_per_inch,
        HEX_R: hex_radius * px_per_inch,
        SPACE: space * px_per_inch,
      }
    },
    W() {
      return this.params.SIZE
    },
    H() {
      return this.params.SIZE
    },
    inner_height() {
      return 11 * b * 2 * this.params.HEX_R + 10 * (this.params.SPACE + 3)
    },
    xys() {
      const { HEX_R, SPACE } = this.params
      const per_row = [1, 2, 3, 4, 5, 6, 5, 6, 5, 6, 5, 6, 5, 6, 5, 6, 5, 4, 3, 2, 1]
      // NOTE the 3.5 * SPACE is a guess :(
      const dx = 2 * HEX_R + 3.5 * SPACE + 2 * a * HEX_R
      const out = []
      let y_offset = this.offset_y
      per_row.map((cols) => {
        const x_offset = (dx * (6 - cols)) / 2 + this.offset_x
        range(cols).map((col) => {
          out.push([col * dx + x_offset, y_offset])
        })
        y_offset += b * HEX_R + SPACE
      })
      return out
    },
    d() {
      const r = this.params.HEX_R
      const points = [
        `M 0 ${r * b}`,
        `${r * a} 0`,
        `${3 * r * a} 0 `,
        `${4 * r * a} ${r * b} `,
        `${3 * r * a} ${2 * r * b} `,
        `${r * a} ${2 * r * b}Z`,
      ]
      return points.join(' L ')
    },
  },
  mounted() {
    this.tick()
  },
  updated() {
    this.tick()
  },
  methods: {
    tick() {
      const { offset_x, offset_y } = this
      const inner = this.$refs.g?.getBoundingClientRect()
      const outer = this.$refs.svg?.getBoundingClientRect()
      const new_offset_y = Math.floor((outer.height - inner.height) / 2)
      const new_offset_x = Math.floor((outer.width - inner.width) / 2)
      if (new_offset_x < 0 || new_offset_y < 0) {
        return
      }
      if (new_offset_y !== offset_y || offset_x !== new_offset_x) {
        this.offset_x = new_offset_x
        this.offset_y = new_offset_y
      }
    },
  },
}
</script>
