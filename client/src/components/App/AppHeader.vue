<template>
  <header :class="['app-header', appHeaderClasses]">
    <div :class="['app-header-container', { fluid }]">
      <router-link v-if="brand" to="/" class="app-header-brand">
        {{ brand }}
      </router-link>
      <h1 v-if="title" class="app-header-title">{{ title }}</h1>

      <nav v-if="$slots.navigation" class="app-header-nav">
        <div class="app-header-nav-container">
          <slot name="navigation"></slot>
        </div>
      </nav>
      <div v-else class="app-header-separator"></div>

      <div v-if="$slots.right" class="app-header-right">
        <div class="app-header-right-container">
          <slot name="right"></slot>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  export default {
    props: {
      brand: { type: String },
      title: { type: String },
      fluid: { type: Boolean },
    },

    computed: {
      appHeaderClasses () {
        return {
          'no-brand': !this.brand,
          'no-title': !this.title,
          'no-navigation': !this.$slots.navigation,
          'no-right': !this.$slots.right,
        }
      },
    },
  }
</script>

<style lang="scss">
  .app-header {
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left: 2rem;
    padding-right: 2rem;

    background-color: $ly-color-grey-20;

    .app-header-container {
      display: flex;
      max-width: 80rem;
      margin-left: auto;
      margin-right: auto;

      align-items: stretch;

      &.fluid {
        max-width: none;
      }

      > .app-header-nav {
        flex-shrink: 1;
        flex-grow: 1;
      }
      > .app-header-separator {
        flex-grow: 1;
      }
      > .app-header-right {
        flex-shrink: 0;
      }
    }

    .app-header-brand,
    .app-header-title,
    .app-header-nav,
    .app-header-right {
      display: flex;

      flex-direction: column;
      justify-content: center;
    }

    .app-header-brand {
      color: $ly-color-grey-90;
      font-size: 1.2rem;
      font-weight: bold;
      text-decoration: none;
    }

    .app-header-title {
      margin-top: 0;
      margin-bottom: 0;

      font-size: 1.1rem;
      font-weight: normal;
      line-height: 2.5rem;
      text-transform: uppercase;
    }

    .app-header-nav {
      padding-left: 2rem;
      padding-right: 2rem;
    }

    .app-header-right {
      margin-top: -1rem;
      margin-bottom: -1rem;
      margin-right: -2rem;
      padding: 1rem 2rem 1rem 6rem;

      line-height: 2.5rem;
      white-space: nowrap;

      background: linear-gradient(45deg, $ly-color-grey-20 3.5rem,
                                         $ly-color-grey-10 3.5rem,
                                         $ly-color-grey-10 4rem,
                                         $ly-color-grey-20 4rem,
                                         $ly-color-grey-20 4.5rem,
                                         $ly-color-grey-10 4.5rem);
    }
  }

  @media(max-width: $small-screen-width) {
    .app-header {
      padding-left: 1rem;
      padding-right: 1rem;

      .app-header-nav {
        padding-left: 0;
        padding-right: 0;

        white-space: nowrap;
        overflow-x: auto;
      }

      .app-header-title,
      .app-header-right {
        display: none;
      }

      &.no-brand.no-navigation {
        padding: 0;
      }
    }
  }
</style>
