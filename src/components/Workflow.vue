<template>
  <div class="workflow_container" @click="closeComplete">
    <div class="workflow_title">Workflow</div>
    <InputAutocomplete :changeDisable="changeDisable" />
    <div class="buttons">
      <button class="workflow_button" @click="getData" :disabled="disable" :class="{'disable-button': disable}">Use It</button>
      <button class="workflow_button" @click="clearState" >New Search</button>
    </div>

    <AppSelect :items="getBranches" defaultValue="master"/>
    <div class="workflow_interval">
      <div class="workflow_interval_title">Choose Interval:</div>
      <div class="date-interval">
        <div class="date-start">
          <select
            @change="changeDate"
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
            @change="changeDate"
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
            @change="changeDate"
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
            @change="changeDate"
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
            @change="changeDate"
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
            @change="changeDate"
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
    <hr />
    <button
      class="workflow_button"
      :disabled="disableAllData"
      :class="{'disable-button': disableAllData}"
      @click="getAllDataSearch"
    >
      Choose
    </button>
    <div class="workflow_result" v-if="result">
      <div class="workflow_result_title">Result</div>
      <div class="workflow_result_sub-title">Members</div>
      <Members/>
      <div class="workflow_pulls">
        <div>
          <div class="pull">
            <div class="title" ><span class="name-pull">Active PR: </span> {{ getActivePR.length }}</div>
            <button class="workflow_button-more" @click="changeVisible('showActive')" v-if="getActivePR.length">{{ !this.showActive ? 'More' : 'Hide' }}</button>
          </div>
          <list-pulls title="Active PR" :pulls="getActivePR" v-show="showActive"/>
        </div>
        <div>
          <div class="pull">
            <div class="title" ><span class="name-pull">Closed PR:</span> {{ getClosedPR.length }} </div>
            <button class="workflow_button-more" @click="changeVisible('showClosed')" v-if="getClosedPR.length">{{ !this.showClosed ? 'More' : 'Hide' }}</button>
          </div>
          <list-pulls title="Closed PR" :pulls="getClosedPR" v-show="showClosed"/>
        </div>
        <div>
          <div class="pull">
            <div class="title"><span class="name-pull">Old PR:</span> {{ getOldPR.length }}</div>
            <button class="workflow_button-more" @click="changeVisible('showOld')" v-if="getOldPR.length">{{ !this.showOld ? 'More' : 'Hide' }}</button>
          </div>
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
    },
    getRepo() {
      return this.$store.getters.getRepo
    }
  },
  methods: {
    changeDisable(value) {
      this.disable = value
    },
    changeVisible(value) {
      this[value] = !this[value]
    },
    closeComplete(){
      handlerEvent.$emit('closeauto')
    },
    clearState(){
      this.$store.dispatch('clearState')
      this.disable = true
      this.disableAllData = true
      this.dateStartUser = {
        day: '',
          month: '',
          year: ''
      }
      this.dateEndUser = {
        day: '',
          month: '',
          year: ''
      },
      this.result = false
      this.showActive = false
      this.showClosed = false
      this.showOld = false
      handlerEvent.$emit('clearstate')
    },
    getData() {
      this.$store.dispatch('setRepository').then(() => {
        if ( this.getRepo?.id ){
          const { dateStart, dateEnd } = this.$store.getters.getSearch
          this.dateStartUser.year = new Date(dateStart).getFullYear()
          this.dateStartUser.month = +new Date(dateStart).getMonth() + 1
          this.dateStartUser.day = new Date(dateStart).getDate()
          this.dateEndUser.year = new Date(dateEnd).getFullYear()
          this.dateEndUser.month = +new Date(dateEnd).getMonth() + 1
          this.dateEndUser.day = new Date(dateEnd).getDate()
          this.$store.dispatch('setBranches').then(()=>{
            this.disableAllData = false
          })
        }
      })
    },
    getAllDataSearch() {
      this.result = true
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
  }
}
</script>

<style scoped lang="scss">
@media screen and (min-width: 601px) {
  .workflow_container {
    height: 100%;
    margin: 0;
    padding: 50px;
  }
}
@media screen and (max-width: 600px) {
  .workflow_container {
    height: 100%;
    margin: 0;
    padding: 20px;
  }
}
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
    background: #f7f3eb;
  }
  &_button {
    width: 200px;
    height: 50px;
    background: #fcce0d;
    color: black;
    text-align: center;
    font-size: 20px;
    line-height: 40px;
    font-weight: 800;
    border-radius: 10px;
    cursor: pointer;
    border: none;
    transition-duration: .4s;
    &:hover{
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
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
    width: 100%;
    &_title{
      font-size: 25px;
      font-weight: bold;
      margin-bottom: 30px;

    }
    &_sub-title{
      font-weight: bold;
      font-size: 22px;
      margin-bottom: 20px;
    }
  }
  &_pulls{
    align-self: flex-start;
    width: 100%;
    .pull{
      display: flex;
      margin-bottom: 15px;
      margin-top: 15px;
      border-bottom: 1px solid rgba(0,0,0, .2);
      width: 100%;
      padding: 15px;
      div:nth-child(1){
        margin-right: 30px;
      }
      .title{
        font-size: 18px;
        font-weight: bold;
        .name-pull{
          margin-right: 10px;
        }
      }
    }
  }
  &_button-more{
   border: none;
    width: 100px;
    height: 30px;
    background: #fcce0d;
    color: black;
    text-align: center;
    font-size: 18px;
    line-height: 20px;
    font-weight: 800;
    border-radius: 10px;
    cursor: pointer;
    transition-duration: .4s;
    &:hover{
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }
  }
}
.buttons{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
</style>
