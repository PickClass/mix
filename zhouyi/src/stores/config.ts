import { defineStore } from "pinia"

export const useMyConfigStore = defineStore("myConfigStore", {
  state: () => ({ collapsed: false }),
  actions: {
    toggleCollapsed() {
      console.log(this.collapsed);
      
      this.collapsed = !this.collapsed
    }
  },
  getters: {}
})
