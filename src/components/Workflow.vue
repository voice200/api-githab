<template>
  <div class="workflow_container">
    <InputAutocomplete :changeDisable="changeDisable" />
    <button class="workflow_button" @click="getData">Use It</button>
    <AppSelect :items="getBranches" defaultValue="master" />
    Choose Interval
    <div class="date-interval">
      <div class="date-start">
        <select
          name="dayStart"
          id="dayStart"
          :disabled="!getBranches.length"
          v-model="dateStartUser.day"
        >
          <option v-for="(day, i) in dayItems" :key="i" :value="day">
            {{ day }}
          </option>
        </select>
        <select
          name="monthStart"
          id="monthStart"
          :disabled="!getBranches.length"
          v-model="dateStartUser.month"
        >
          <option
            :disabled="month < new Date(getSearch.dateStart).getMonth()"
            v-for="(month, i) in monthItems"
            :key="i"
            :value="month"
          >
            {{ month }}
          </option>
        </select>
        <select
          name="yearStart"
          id="yearStart"
          :disabled="!getBranches.length"
          v-model="dateStartUser.year"
        >
          <option v-for="(year, i) in yearItems" :key="i" :value="year">
            {{ year }}
          </option>
        </select>
      </div>
      <div class="date-end">
        <select
          name="dayEnd"
          id="dayEnd"
          :disabled="!getBranches.length"
          v-model="dateEndUser.day"
        >
          <option v-for="(day, i) in dayItems" :key="i" :value="day">
            {{ day }}
          </option>
        </select>
        <select
          name="monthEnd"
          id="monthEnd"
          :disabled="!getBranches.length"
          v-model="dateEndUser.month"
        >
          <option v-for="(month, i) in monthItems" :key="i" :value="month">
            {{ month }}
          </option>
        </select>
        <select
          name="yearEnd"
          id="yearEnd"
          :disabled="!getBranches.length"
          v-model="dateEndUser.year"
        >
          <option v-for="(year, i) in yearItems" :key="i" :value="year">
            {{ year }}
          </option>
        </select>
      </div>
      <button
        class="workflow_button"
        :disabled="!getBranches.length"
        @click="changeDate"
      >
        Save Date
      </button>
    </div>
    <hr />
    <button
      class="workflow_button"
      :disabled="disableAllData"
      @click="getAllDataSearch"
    >
      Choose
    </button>
  </div>
</template>

<script>
import InputAutocomplete from '@/components/InputAutocomplete'
import AppSelect from '@/components/AppSelect'
import { handlerEvent } from '@/handlerEvent'
import { formatDate, getCalendar } from '@/utils/utils'

export default {
  name: 'workflow',
  components: { AppSelect, InputAutocomplete },
  data() {
    return {
      disable: false,
      disableAllData: true,
      dateStartUser: {
        day: '',
        month: '',
        year: ''
      },
      dateEndUser: {
        day: '',
        month: '',
        year: ''
      },
      dayItems: getCalendar('day'),
      monthItems: getCalendar('month'),
      yearItems: getCalendar('year')
    }
  },
  computed: {
    getBranches() {
      return this.$store.getters.getBranches
    },
    getSearch() {
      return this.$store.getters.getSearch
    }
  },
  methods: {
    changeDisable(value) {
      this.disable = value
      console.log('disable', this.disable)
    },
    getData() {
      this.$store.dispatch('setRepository').then(() => {
        this.$store.dispatch('setBranches')
        const { dateStart, dateEnd } = this.$store.getters.getSearch
        this.dateStartUser.year = new Date(dateStart).getFullYear()
        this.dateStartUser.month = +new Date(dateStart).getMonth() + 1
        this.dateStartUser.day = new Date(dateStart).getDate()
        this.dateEndUser.year = new Date(dateEnd).getFullYear()
        this.dateEndUser.month = +new Date(dateEnd).getMonth() + 1
        this.dateEndUser.day = new Date(dateEnd).getDate()
      })
    },
    getAllDataSearch() {
      console.log('получить дату')
    },
    disableButton() {
      this.disableAllData = false
    },
    changeDate() {
      const startDate = Object.entries(this.dateStartUser)
        .reverse()
        .map((item) => item[1])
      const endDate = Object.entries(this.dateEndUser)
        .reverse()
        .map((item) => item[1])
      this.$store
        .dispatch('setSearch', {
          dateStart: formatDate(startDate.join('-')),
          dateEnd: formatDate(endDate.join('-'))
        })
        .then(() => {
          const { dateStart, dateEnd } = this.$store.getters.getSearch
          this.dateStartUser.year = new Date(dateStart).getFullYear()
          this.dateStartUser.month = +new Date(dateStart).getMonth() + 1
          this.dateStartUser.day = new Date(dateStart).getDate()
          this.dateEndUser.year = new Date(dateEnd).getFullYear()
          this.dateEndUser.month = +new Date(dateEnd).getMonth() + 1
          this.dateEndUser.day = new Date(dateEnd).getDate()
        })
    }
  },
  mounted() {
    handlerEvent.$on('choicedone', this.disableButton)
  }
}
</script>

<style scoped lang="scss">
.workflow {
  &_container {
  }
  &_button {
    width: 200px;
  }
}
</style>
