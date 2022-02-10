<template>
  <footer :class="[{ 'pt-0': footerPaddingTopZero() }]">
    <div class="footer-main py-5 px-0 p-sm-5">
      <div class="container">
        <div class="row">
          <div v-if="settings.favicon" class="col-12 col-lg-3 text-center">
            <a :href="$baseUrl">
              <img
                v-lazy="uploadsFileUrl(settings.favicon)"
                class="img-fluid"
                width="115px"
              />
            </a>
          </div>
          <div
            class="col-12 col-md-6 col-lg-7 d-flex align-items-center py-5 py-lg-0"
          >
            <div class="footer-menu w-100 text-uppercase">
              <div class="row m-0">
                <div class="col-12 col-lg-3">
                  <ul>
                    <li><a :href="`${$baseUrl}o-nas`">o nas</a></li>
                    <li><a :href="`${$baseUrl}sklep`">sklep</a></li>
                    <li v-if="settings.privace">
                      <a :href="`${$baseUrl}uploads/${settings.privace}`"
                        >polityka prywatności</a
                      >
                    </li>
                  </ul>
                </div>
                <div class="col-12 col-lg-3">
                  <ul>
                    <li><a :href="`${$baseUrl}blog`">blog</a></li>
                    <li>
                      <a :href="`${$baseUrl}gdzie-kupic`">gdzie kupić?</a>
                    </li>
                    <li><a :href="`${$baseUrl}kontakt`">kontakt</a></li>
                  </ul>
                </div>
                <div class="col-12 col-lg-4">
                  <ul>
                    <li><a :href="`${$baseUrl}regulamin`">Regulamin</a></li>
                    <li>
                      <a :href="`${$baseUrl}dostawa-zwroty`"
                        >Dostawy i zwroty</a
                      >
                    </li>
                    <li><a :href="`${$baseUrl}reklamacje`">Reklamacje</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div
            class="col-12 col-md-6 col-lg-2 d-flex align-items-end flex-column social-media py-5 py-lg-0"
          >
            <div>
              <div class="text-uppercase text-center">social media</div>
              <div class="d-flex">
                <a v-if="settings.fb_link" :href="settings.fb_link"
                  ><img
                    v-lazy="assetsFront('img/fb_new.svg')"
                    width="50px"
                    class="img-fluid px-1"
                /></a>

                <a v-if="settings.inst_link" :href="settings.inst_link"
                  ><img
                    v-lazy="assetsFront('img/instagram-round-color.svg')"
                    width="50px"
                    class="img-fluid px-1"
                /></a>

                <a v-if="settings.tw_link" :href="settings.tw_link"
                  ><img
                    v-lazy="assetsFront('img/twitter.png')"
                    class="img-fluid px-1"
                /></a>

                <a v-if="settings.tw_link" :href="settings.tw_link"
                  ><img
                    v-lazy="assetsFront('img/youtube.png')"
                    class="img-fluid px-1"
                /></a>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-5 copyrights-row">
          <div class="col-12 col-md-6">
            EMEL {{ new Date().getFullYear() }} © Wszystkie prawa zastrzeżone
          </div>
          <div
            class="col-12 col-md-6 d-flex justify-content-end align-items-center"
          >
            Projekt i wdrożenie:
            <a href="https://agencjamedialna.pro/" class="font-weight-bold pl-2"
              >AdAwards</a
            >
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import assetsFront from "@/helpers/links/assetsFront";
import uploadsFileUrl from "@/helpers/links/uploadsFileUrl";

export default {
  methods: {
    uploadsFileUrl,
    assetsFront,
    footerPaddingTopZero() {
      const notAllowedPaths = [
        "gdzie-kupic",
        "dostawa_zwroty",
        "reklamacje",
        "produkt",
        "zwrot",
        "reklamacja",
        "produkcja-koszyk",
        "produkcja-dane-klienta",
        "regulamin",
      ];

      const firstPathSegment = this.$route.path.split("/")[1];

      return notAllowedPaths.includes(firstPathSegment);
    },
  },
  computed: {
    settings() {
      return this.$store.getters.settings;
    },
  },
};
</script>
