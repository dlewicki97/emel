<template>
  <section class="alert-boxes">
    <transition-group name="fade">
      <section
        v-for="(alert, i) in alertBox"
        :key="`alertBox-${i}`"
        class="alert-box"
        :style="[{ backgroundColor: getBackgroundColor(alert.status) }]"
      >
        <img
          v-lazy="
            `${$baseUrl}assets/front/img/alert-box/alert-${alert.status.toLowerCase()}.svg`
          "
          alt=""
          class="lazy alert-box-icon"
        />
        <span @click="dismissAlert(i)" class="close">&#10006;</span>
        {{ alert.message }}
      </section>
    </transition-group>
  </section>
</template>

<script>
import statusesKeys from "@/helpers/alertBox/statusesKeys";

export default {
  data() {
    return {
      statuses: [
        {
          id: statusesKeys.success,
          backgroundColor: "#ee2722",
        },
        {
          id: statusesKeys.error,
          backgroundColor: "#ee2722",
        },
      ],
    };
  },
  computed: {
    alertBox() {
      return this.$store.getters.alertBox;
    },
  },
  methods: {
    dismissAlert(index) {
      this.$store.commit("removeAlertBox", index);
    },
    getBackgroundColor(alertStatus) {
      return this.statuses.find((status) => status.id == alertStatus)
        .backgroundColor;
    },
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.alert-boxes {
  position: fixed;
  right: 0;
  transform: translateX(-50%);
  top: 6rem;
  z-index: 99999999999;
  display: flex;
  flex-direction: column-reverse;
  max-height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
}

.alert-box {
  transition: 0.2s all;
  padding: 0.8rem 2rem;
  font-weight: 700;
  background-color: #ee2722;
  color: white;
  max-width: 300px;
  margin-bottom: 0.4rem;
  position: relative;
  display: flex;
}

.alert-box-icon {
  padding-right: 0.5rem;
  height: 27px;
}

.alert-box span.close {
  position: absolute;
  top: 7px;
  right: 7px;
  color: white !important;
  font-size: 1rem;
  z-index: 1;
  cursor: pointer;
}
@media (max-width: 992px) {
  .alert-boxes {
    transform: unset;
  }
  .alert-box {
    flex-direction: column;
  }
}
@media (max-width: 300px) {
  .alert-box {
    max-width: 100%;
  }
}
</style>
