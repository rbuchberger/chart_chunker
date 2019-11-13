<template>
  <v-card>
    <v-container class="mb-5">
      <v-row
        align="center"
        class="text-center"
      >
        <v-col cols="2">
          <v-btn
            nuxt
            color="grey darken-2"
            to="/"
          >
            Back
          </v-btn>
        </v-col>

        <v-col class="text-center">
          <v-btn
            class="mono body-2 nocap"
            elevation="12"
            outlined
            nuxt
            to="/"
            large
          >
            {{ file.name }}
          </v-btn>
        </v-col>

        <v-col cols="2">
          <v-btn
            :loading="loading"
            color="orange"
            @click="handleNext"
          >
            Next
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-expansion-panels
        multiple
        focusable
        inset
      >
        <v-expansion-panel>
          <v-expansion-panel-header class="title">
            Which columns are which?
          </v-expansion-panel-header>

          <v-expansion-panel-content>
            <v-container>
              <v-row>
                <v-col>
                  <v-select
                    :items="columnItems"
                    :value="splitBasis"
                    label="Charge Current"
                    hint="I'll use this value's sign to sort out cycles, and discard
          lines where it's ~zero. It doesn't have to be included in the output
          data."
                    persistent-hint
                    @change="setSplitBasis"
                  />
                </v-col>
                <v-col>
                  <v-select
                    :items="keptColumnItems"
                    :value="voltageColumn"
                    label="Voltage"
                    @change="setVoltageColumn"
                  />
                </v-col>
                <v-col>
                  <v-select
                    :items="keptColumnItems"
                    :value="spcColumn"
                    label="Specific Capacity"
                    @change="setSpcColumn"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header class="title">
            Which columns do you want to keep?
          </v-expansion-panel-header>

          <v-expansion-panel-content>
            <v-container>
              <v-row no-gutters>
                <v-col
                  v-for="(column, index) in columns"
                  :key="index"
                  cols="12"
                  md="3"
                  sm="4"
                >
                  <v-checkbox
                    v-model="handleToggle"
                    :value="index"
                    :label="column"
                    color="orange"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header class="title">
            Would you like to modify them?
          </v-expansion-panel-header>

          <v-expansion-panel-content>
            <v-row
              v-for="item in keptColumnItems"
              :key="item.value"
              align="center"
            >
              <v-col class="text-right">
                {{ item.text }}:
              </v-col>
              <v-col>
                <v-text-field
                  label="Label"
                  hint="Customize the name"
                />
              </v-col>
              <v-col>
                <v-text-field
                  label="Multiply By"
                  hint="Unit Conversion"
                />
              </v-col>
              <v-col>
                <v-text-field
                  label="Round to"
                  hint="Decimal Places"
                />
              </v-col>
              <v-col>
                <v-checkbox
                  label="Absolute Value?"
                />
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </v-card>
</template>

<style>
.nocap {
  text-transform: none !important;
}

.mono {
  font-family: mono;
}
</style>
<script>
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'columnItems',
      'columns',
      'keptColumnItems',
      'spcColumn',
      'voltageColumn'
    ]),
    ...mapState(['splitBasis', 'keptColumns', 'loading', 'file']),
    handleToggle: {
      get() {
        return this.keptColumns
      },
      set(value) {
        this.setKeptColumns(value)
      }
    }
  },

  methods: {
    ...mapMutations([
      'setSplitBasis',
      'setKeptColumns',
      'setSpcColumn',
      'setVoltageColumn'
    ]),

    ...mapActions(['buildChunker']),
    handleNext() {
      this.buildChunker().then(this.$router.push('dataOutput'))
    }
  }
}
</script>
