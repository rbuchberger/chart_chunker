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

        <v-col class="text-center text-truncate">
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
        v-model="openPanel"
        focusable
        multiple
        inset
      >
        <v-expansion-panel>
          <v-expansion-panel-header class="title">
            Which columns are which?
          </v-expansion-panel-header>

          <v-expansion-panel-content>
            <v-container>
              <v-row>
                <p>
                  Cycles are chunked by looking at charge current (first item
                  below). When it changes sign, a new cycle half is created.
                  When it is ~zero, that line will be discarded.
                </p>
              </v-row>
              <v-row>
                <v-col>
                  <v-select
                    :items="columnItems"
                    :value="splitBasis"
                    label="Charge Current"
                    hint="Not required in kept columns."
                    persistent-hint
                    @change="setSplitBasis"
                  />
                </v-col>
                <v-col>
                  <v-select
                    :items="keptColumnItems"
                    :value="voltageColumn"
                    label="Voltage"
                    hint="Must be a kept column (below)"
                    persistent-hint
                    @change="setVoltageColumn"
                  />
                </v-col>
                <v-col>
                  <v-select
                    :items="keptColumnItems"
                    :value="spcColumn"
                    label="Specific Capacity"
                    hint="Must be a kept column (below)"
                    persistent-hint
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
              <v-row>
                <p>
                  Columns selected here will be included in the output data; all
                  others will be discarded.
                </p>
              </v-row>
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

        <!-- <v-expansion-panel>
          <v-expansion-panel-header class="title">
            Would you like to modify them?
          </v-expansion-panel-header>

          <v-expansion-panel-content>
            <v-container>
              <v-row>
                <p>
                  These settings allow you to modify the values in a given
                  column. You can modify the base header, multiply all entries
                  by some value (useful for unit conversions), round them to a
                  particular number of decimal places, or take their absolute
                  value.
                </p>
              </v-row>
              <v-container
                v-for="column in keptColumnItems"
                :key="column.value"
                class="my-4"
              >
                <h4 class="subtitle-1">
                  {{ column.text }}:
                </h4>
                <v-row align="center">
                  <v-col cols="5">
                    <v-text-field
                      :value="column.labelMod"
                      label="Label"
                      data-property="labelMod"
                      data-columnIndex="column.value"
                      hint="Customize the name"
                      @change="modColumn"
                    />
                  </v-col>
                  <v-col>
                    <v-text-field
                      :value="column.multiply"
                      label="Multiply By"
                      hint="Unit Conversion"
                    />
                  </v-col>
                  <v-col>
                    <v-text-field
                      :value="column.round"
                      label="Round to"
                      hint="Decimal Places"
                    />
                  </v-col>
                  <v-col>
                    <v-checkbox
                      :value="column.abs"
                      label="Absolute Value"
                      color="primary"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-container>
          </v-expansion-panel-content>
        </v-expansion-panel> -->
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
  data() {
    return {
      openPanel: [0]
    }
  },

  computed: {
    ...mapGetters(['columns', 'keptColumnItems', 'spcColumn', 'voltageColumn']),
    ...mapState([
      'splitBasis',
      'keptColumns',
      'columnItems',
      'loading',
      'file'
    ]),
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
      // 'modColumn'
    ]),

    modColumn(event) {
      console.log(event)
    },

    ...mapActions(['buildChunker']),
    handleNext() {
      this.buildChunker().then(this.$router.push('dataOutput'))
    }
  }
}
</script>
