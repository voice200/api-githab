<template>
  <div class="workflow_container">
    <div class="workflow_title">Workflow</div>
    <InputAutocomplete :changeDisable="changeDisable" />
    <button class="workflow_button" @click="getData" :disabled="disable">Use It</button>
    <AppSelect :items="getBranches" defaultValue="master" />
    <div class="workflow_interval">
      <div class="workflow_interval_title">Choose Interval:</div>
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
            class="year"
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
            class="year"
            id="yearEnd"
            :disabled="!getBranches.length"
            v-model="dateEndUser.year"
          >
            <option v-for="(year, i) in yearItems" :key="i" :value="year">
              {{ year }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <button
      class="workflow_button"
      :disabled="!getBranches.length"
      @click="changeDate"
    >
      Save Date
    </button>
    <hr />
    <button
      class="workflow_button"
      :disabled="disableAllData"
      @click="getAllDataSearch"
    >
      Choose
    </button>
    <div class="workflow_result" v-if="result">
      <div class="workflow_result_title">Result</div>
      <div>Members</div>
      <Members/>
      <div class="workflow_pulls">
        <div>
          <div>Active PR: {{ getActivePR.length }}</div>
          <button @click="changeVisible('showActive')" v-if="getActivePR.length">{{ !this.showActive ? 'More' : 'Hide' }}</button>
          <list-pulls title="Active PR" :pulls="getActivePR" v-show="showActive" :old="true"/>
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
      disable: true,
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
      result: false,
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
      console.log('disable', value)
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
      }).catch(()=>{
          console.log('нет данных')
      })
    },
    getAllDataSearch() {
      this.result = true
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
          this.$store.dispatch('setCommits')
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
  &_interval{
    display: flex;
    width: 100%;
    margin-bottom: 30px;
    &_title{
      margin-right: 30px;
      font-size: 20px;
    }
    select{
      width: 50px;
      height: 30px;
      margin-right: 10px;
    }
    .year{
      width: 100px;
    }
  }
  .data-start{
    margin-bottom: 20px;
  }
  &_container {
    padding: 50px;
    background: #f7f3eb;
  }
  &_button {
    width: 200px;
    height: 40px;
    background: #fcce0d;
    color: black;
    text-align: center;
    font-size: 20px;
    line-height: 40px;
    font-weight: 800;
    border-radius: 10px;
    align-self: center;
    cursor: pointer;
    &:hover{
      background: #d9b219;
    }
    margin-bottom: 20px;
  }
  .center{
    align-self: center;
  }
  &_title{
    font-size: 25px;
    font-weight: 900;
    margin-bottom: 40px;
    width: 100%;
    text-align: center;
    color: #ff5400;
  }
  &_result {
    display: flex;
    flex-direction: column;
    align-items: center;
    &_title{
      font-size: 25px;
      font-weight: bold;
      margin-bottom: 40px;
    }
  }
}
</style>
