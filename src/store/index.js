import { defineStore } from 'pinia'

import { computed, ref } from 'vue'

export const useAgeStore = defineStore('age', {
    state: () => {
        return {
            age: 30,
            name: 'zs',
            arr: [1, 2, 3]
        }
    },
    getters: {
        gettersAge(state) {
            return state.age+5
        },
        gettersById: (state) => {
            return (id) => `传入到id参数是:${id},name:${state.name}`
        },
        //使用另一个 store 的 getter
     gettersOtherStoreGetters: () => {
        const CounterStore = useCounterStore();
        return 100 + CounterStore.gettersCounter
     }
    },
    actions: {
        addAge() {
            this.age++
        }
    }
})

export const useCounterStore = defineStore('counter', () => {
    const counter = ref(30)

    const gettersCounter = computed(() => counter.value + 5)
    
    function addCounter() {
        counter.value++
    }
    return { counter, gettersCounter, addCounter }
})