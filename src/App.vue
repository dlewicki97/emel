<template>
  <div id="app">
    <Header />
    <main>
      <router-view />
    </main>
    <Footer />

    <AlertBox />
    <Loader />
  </div>
</template>

<script>
import Header from '@/components/blocks/Header';
import Footer from '@/components/blocks/Footer';
import LazyLoad from 'vanilla-lazyload';
import AlertBox from '@/components/layout/AlertBox';
import Loader from '@/components/layout/Loader';

export default {
  components: {
    Header,
    Footer,
    AlertBox,
    Loader,
  },
  watch: {
    $route: {
      deep: true,
      handler() {
        this.setMetaTitle();
      },
    },
    settings: {
      deep: true,
      handler() {
        this.setMetaTitle();
      },
    },
    metaTitle() {
      this.setMetaTitle();
    },
  },
  computed: {
    settings() {
      return this.$store.getters.settings;
    },
    metaTitle() {
      return this.$store.getters.metaTitle;
    },
  },
  methods: {
    setMetaTitle() {
      const metaTitle = this.metaTitle || this.$route.meta.metaTitle;

      if (metaTitle && this.settings.meta_title)
        document.title = `${metaTitle} | ${this.settings.meta_title}`;
    },
  },
  name: 'App',
  async mounted() {
    await this.$store.dispatch('setup');

    setInterval(() => this.$store.dispatch('setup'), 600000);
  },
  async created() {
    await this.$store.dispatch('setup');
    this.$store.dispatch('session');
    this.$store.dispatch('settings');

    new LazyLoad();
    this.$store.dispatch('poradnikCategory');

    this.$store.dispatch('contactSettings');

    await this.$store.dispatch('autoLogin');
    await this.$store.dispatch('cart');
    this.$store.dispatch('favouriteProducts');
    this.setMetaTitle();

    var tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map(function(tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}
@media (max-width: 992px) {
  main {
    margin-top: 5rem;
  }
}
:root {
  --success: #06af06;
}
.custom-radio * {
  cursor: pointer;
}
</style>
