<template>
  <v-container fluid>
    <v-row align="start">
      <v-spacer />
      <v-col
        cols="2"
        class="text-right"
      >
        <h4 class="headline">
          Cycle #
        </h4>
      </v-col>
      <v-col cols="2">
        <v-text-field
          v-model="selectedCycleOffset"
          dense
          outlined
        />
      </v-col>
      <v-col
        cols="2"
        class="text-left"
      >
        <h4 class="headline">
          of {{ cycleCount }}
        </h4>
      </v-col>
      <v-spacer />
    </v-row>
    <v-row class="d-flex">
      <div class="flex-grow-0">
        <v-btn
          icon
          class="my-auto"
          :disabled="atStart"
          @click="jump(-cycleCount)"
        >
          <v-icon>mdi-skip-backward</v-icon>
        </v-btn>
        <v-btn
          icon
          class="my-auto"
          :disabled="atStart"
          @click="jump(-10)"
        >
          <v-icon>mdi-step-backward-2</v-icon>
        </v-btn>
        <v-btn
          icon
          class="my-auto"
          :disabled="atStart"
          @click="jump(-1)"
        >
          <v-icon>mdi-step-backward</v-icon>
        </v-btn>
      </div>
      <div class="flex-grow-1">
        <v-slider
          v-model="selectedCycleIndex"
          class="my-auto"
          :max="cycleCount - 1"
          color="orange"
        />
      </div>
      <div class="flex-grow-0">
        <v-btn
          icon
          class="my-auto"
          :disabled="atEnd"
          @click="jump(1)"
        >
          <v-icon>mdi-step-forward</v-icon>
        </v-btn>
        <v-btn
          icon
          class="my-auto"
          :disabled="atEnd"
          @click="jump(10)"
        >
          <v-icon>mdi-step-forward-2</v-icon>
        </v-btn>
        <v-btn
          icon
          class="my-auto"
          :disabled="atEnd"
          @click="jump(cycleCount)"
        >
          <v-icon>mdi-skip-forward</v-icon>
        </v-btn>
      </div>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    cycleCount: { type: Number, default: 1 }
  },

  data() {
    return {
      selectedCycle: 0
    }
  },

  computed: {
    selectedCycleIndex: {
      get() {
        return this.selectedCycle
      },

      set(val) {
        if (val < 0) {
          this.selectedCycle = 0
        } else if (val > this.cycleCount - 1) {
          this.selectedCycle = this.cycleCount - 1
        } else {
          this.selectedCycle = val
        }
        this.$emit('input', this.selectedCycle)
      }
    },

    selectedCycleOffset: {
      get() {
        return this.selectedCycleIndex + 1
      },

      set(val) {
        this.selectedCycleIndex = val - 1
      }
    },

    atStart() {
      return this.selectedCycle === 0
    },

    atEnd() {
      return this.selectedCycleOffset === this.cycleCount
    }
  },

  methods: {
    jump(val) {
      this.selectedCycleIndex += val
    }
  }
}
</script>
