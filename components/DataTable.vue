<template>
  <v-container>
    <v-row>
      <v-spacer />
      <v-col sm="8">
        <v-simple-table
          dense
          fixed-header
          height="500"
          class="datatable"
        >
          <thead>
            <tr>
              <th
                v-for="header in dataObject.headers"
                :key="header"
              >
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(line, lineIndex) in dataObject.lines"
              :key="lineIndex"
            >
              <td
                v-for="(entry, entryIndex) in line"
                :key="lineIndex.toString() + entryIndex.toString()"
              >
                {{ entry }}
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-col>
      <v-spacer />
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: ['dataObject']
}
</script>

<style scoped>
table.datatable {
  table-layout: fixed;
}
</style>
