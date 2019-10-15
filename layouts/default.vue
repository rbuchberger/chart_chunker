<template>
  <v-app dark>
    <v-content>
      <v-container>
        <v-layout column justify-center align-center>
          <v-flex xs12 sm8 md6>
            <header class="text-center">
              <h1>Chart Chunker</h1>
              <p>
                By <a href="https://robert-buchberger.com">Robert Buchberger</a>
              </p>
            </header>
            <v-banner two-line class="my-3">
              <v-avatar slot="icon" size="40"
                ><v-icon color="red">mdi-alert-circle-outline</v-icon></v-avatar
              >
              Warning: This tool is still under construction. It has no input
              validation, no error handling, and is mostly untested. Use with
              caution, and double-check anything it gives you.
            </v-banner>
            <nuxt />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script></script>
