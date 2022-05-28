<template>
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="W"
      :height="H"
      :viewbox="`0 0 ${W} ${H}`"
      ref="svg"
    >
      <desc>
        {{ description }}
      </desc>
      <g ref="g">
        <g v-for="([x, y], i) in xys" :key="i" :transform="`translate(${x}, ${y})`">
          <path stroke="black" fill="#fff" :d="d" />
        </g>
      </g>
      <rect v-if="is_board" :width="W" :height="H" fill="none" stroke="black" />
    </svg>
    <params-form />
  </div>
</template>

<script>
import { range, sum } from 'lodash'
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
    description() {
      return JSON.stringify(this.$local.state, null, 2)
    },
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
    is_board() {
      return this.$local.state.layout === 'board'
    },
    rows() {
      const { board_radius } = this.$local.state
      const pieces = sum(range(board_radius).map((i) => i * 6))
      if (!this.is_board) {
        const r = 19
        const c = Math.ceil(pieces / r)
        return range(r).map(() => c)
      }
      const rows = range(1, board_radius + 1)
      range(board_radius).map(() => {
        rows.push(board_radius - 1)
        rows.push(board_radius)
      })
      rows.pop()
      range(2, board_radius + 1).map((i) => rows.push(board_radius - i))
      rows.pop()
      return rows
    },
    xys() {
      const { HEX_R, SPACE } = this.params
      // NOTE the 3.5 * SPACE is a guess :(
      const dx = 2 * HEX_R + 3.5 * SPACE + 2 * a * HEX_R
      const out = []
      let y_offset = this.is_board ? this.offset_y : 0
      this.rows.map((cols, i_row) => {
        let x_offset = (dx * (6 - cols)) / 2 + this.offset_x
        if (!this.is_board) {
          x_offset = i_row % 2 ? dx / 2 : 0
        }
        range(cols).map((col, i_col) => {
          if (this.is_board && i_row === this.rows.length / 2 - 0.5 && i_col === cols / 2 - 0.5) {
            return
          }
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
