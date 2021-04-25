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
    <div class="workflow_result">
      <div>Result</div>
      <div>Members</div>
      <Members/>
      <div class="workflow_pulls">
        <div>
          <div>Active PR: {{ getActivePR.length }}</div>
          <button @click="changeVisible('showActive')" v-if="getActivePR.length">{{ !this.showActive ? 'More' : 'Hide' }}</button>
          <list-pulls title="Active PR" :pulls="getActivePR" v-show="showActive"/>
        </div>
        <div>
          <div>Closed PR: {{ getClosedPR.length }} </div>
          <button @click="changeVisible('showClosed')" v-if="getClosedPR.length">{{ !this.showClosed ? 'More' : 'Hide' }}</button>
          <list-pulls title="Closed PR" :pulls="getClosedPR" v-show="showClosed"/>
        </div>
        <div>
          <div>Old PR: {{ getOldPR.length }}</div>
          <button @click="changeVisible('showOld')" v-if="getOldPR.length">{{ !this.showOld ? 'More' : 'Hide' }}</button>
          <list-pulls title="Old PR" :pulls="getOldPR" v-show="showOld" :old="true"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputAutocomplete from '@/components/InputAutocomplete'
import AppSelect from '@/components/AppSelect'
import { handlerEvent } from '@/handlerEvent'
import { formatDate, getCalendar } from '@/utils/utils'
import Members from "@/components/Members";
import ListPulls from "@/components/listPulls";

export default {
  name: 'workflow',
  components: { ListPulls, Members, AppSelect, InputAutocomplete },
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
      yearItems: getCalendar('year'),
      showActive: false,
      showClosed: false,
      showOld: false,
    }
  },
  computed: {
    getBranches() {
      return this.$store.getters.getBranches
    },
    getSearch() {
      return this.$store.getters.getSearch
    },
    getActivePR() {
      return this.$store.getters.getActivePR
    },
    getOldPR() {
      return this.$store.getters.getOldPR
    },
    getClosedPR() {
      return this.$store.getters.getClosedPR
    }
  },
  methods: {
    changeDisable(value) {
      this.disable = value
      console.log('disable', this.disable)
    },
    changeVisible(value) {
      this[value] = !this[value]
    },
    getData() {
      this.$store.dispatch('setRepository').then(() => {
        const { dateStart, dateEnd } = this.$store.getters.getSearch
        this.dateStartUser.year = new Date(dateStart).getFullYear()
        this.dateStartUser.month = +new Date(dateStart).getMonth() + 1
        this.dateStartUser.day = new Date(dateStart).getDate()
        this.dateEndUser.year = new Date(dateEnd).getFullYear()
        this.dateEndUser.month = +new Date(dateEnd).getMonth() + 1
        this.dateEndUser.day = new Date(dateEnd).getDate()
        this.$store.dispatch('setBranches').then(()=>{
        })
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
          this.$store.dispatch('setPulls')
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
