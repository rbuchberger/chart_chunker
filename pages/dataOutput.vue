<template>
  <v-card class="my-5">
    <v-container class="mb-5">
      <v-row
        align="center"
        class="text-center"
      >
        <v-col cols="2">
          <v-btn
            nuxt
            color="grey darken-2"
            to="/outputSettings"
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

        <v-col cols="2" />
      </v-row>
    </v-container>

    <v-tabs
      v-model="tabs"
      center-active
      grow
      color="orange"
    >
      <v-tab>Analysis</v-tab>
      <v-tab>Cycle Details</v-tab>
    </v-tabs>
    <v-tabs-items
      v-model="tabs"
      mandatory
    >
      <v-tab-item>
        <AllCycles />
      </v-tab-item>
      <v-tab-item>
        <CycleDetails />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import AllCycles from '~/components/AllCycles.vue'
import CycleDetails from '~/components/CycleDetails.vue'
import { mapState } from 'vuex'

export default {
  components: { AllCycles, CycleDetails },
  data() {
    return {
      tabs: 0
    }
  },

  computed: {
    ...mapState(['file'])
  }
}
</script>
