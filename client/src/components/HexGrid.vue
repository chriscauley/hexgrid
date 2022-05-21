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
  </div>
</template>

<script>
import { range } from 'lodash'

const board_size = 20
const hex_r = 0.8
// const space = 0.06125
const space = 0.125

const px_per_inch = 48

// convert from inches to px
const SIZE = board_size * px_per_inch
const HEX_R = hex_r * px_per_inch
const SPACE = space * px_per_inch
const a = 0.5
const b = Math.sqrt(3) / 2

export default {
  data() {
    setTimeout(this.adjust, 200)
    return {
      rando: 0,
    }
  },
  computed: {
    offset() {
      const inner = this.$refs.g?.getBoundingClientRect()
      const outer = this.$refs.svg?.getBoundingClientRect()
      if (!(inner && outer)) {
        // this forces the component to recalculate this after render
        this.tick()
        return { x: 0, y: 0, rando: this.rando }
      }
      return {
        y: (outer.height - inner.height) / 2,
        x: (outer.width - inner.width) / 2,
      }
    },
    W() {
      return SIZE
    },
    H() {
      return SIZE
    },
    inner_height() {
      return 11 * b * 2 * HEX_R + 10 * (SPACE + 3)
    },
    xys() {
      const per_row = [1, 2, 3, 4, 5, 6, 5, 6, 5, 6, 5, 6, 5, 6, 5, 6, 5, 4, 3, 2, 1]
      // NOTE the 3.5 * SPACE is a guess :(
      const dx = 2 * HEX_R + 3.5 * SPACE + 2 * a * HEX_R
      const out = []
      let y_offset = this.offset.y
      per_row.map((cols) => {
        const x_offset = (dx * (6 - cols)) / 2 + this.offset.x
        range(cols).map((col) => {
          out.push([col * dx + x_offset, y_offset])
        })
        y_offset += b * HEX_R + SPACE
      })
      return out
    },
    d() {
      const r = HEX_R
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
  methods: {
    tick() {
      setTimeout(() => {
        this.rando += 1
      }, 0)
    },
  },
}
</script>
