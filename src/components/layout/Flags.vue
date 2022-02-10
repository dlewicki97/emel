<template>
    <section class="flags">
        <div v-if="session.lang == 'en'" class="menu-icon px-1 d-flex align-items-center">
            <a href="#googtrans(pl|pl)" onclick="changeLang('pl');" title="Język polski">
                <img v-lazy="`${$baseUrl}assets/front/img/icons-menu/pl.svg`" class="img-fluid" alt="flaga polski">
            </a>
        </div>
        <div v-if="!session.lang || session.lang == 'pl'" class="menu-icon px-1 d-flex align-items-center">
            <a href="#googtrans(pl|en)" onclick="changeLang('en');" title="Język angielski">
                <img v-lazy="`${$baseUrl}assets/front/img/icons-menu/en.svg`" class="img-fluid"
                    alt="flaga wielkiej brytanii">
            </a>
        </div>
    </section>
</template>

<script>
export default {
    computed: {
        session() {
            return this.$store.getters.session;
        }
    }
}
</script>

<style>
section.flags {
    display: flex;
    align-items: center;
}
</style>