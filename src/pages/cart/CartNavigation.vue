<template>
    <section class="cart-navigation">
        <div class="list-style-checkout py-3 py-lg-5">
            <ul class="d-flex justify-content-center">
                <li v-for="(step, i) in steps" :key="`step-${i}`"
                    :class="[{'active': i == cartStepIndex}, 'd-flex align-items-center mx-1 mx-sm-3 py-3 py-lg-0']">
                    <span @click="cartStepIndex > i ? chooseStep(i) : true"
                        class="list-style-dot d-flex justify-content-center align-items-center mx-2"
                        :style="{cursor: getCursor(i)}">{{ i+1 }}</span>
                    <span class="dots-text"> {{ step }} </span></Koszyk>
                </li>

            </ul>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            steps: [
                'Koszyk', 'Dane zamawiającego', 'Dostawa i płatność', "Podsumowanie"
            ]
        }
    },
    computed: {
        cartStepIndex() {
            return this.$store.getters.cartStepIndex;
        }
    },
    methods: {
        chooseStep(index) {
            this.$store.commit('cartStepIndex', index);
        },
        getCursor(index) {
            return this.cartStepIndex > index ? 'pointer' : 'default';
        }
    }
}
</script>