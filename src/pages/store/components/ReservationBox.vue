<script setup>
import { ref } from "vue";
import { useReservationStore } from "../../../stores/useReservationStore";
const timeList = ref(["17:00", "17:30", "18:00", "18:30", "19:00"]);

const rsvData = ref({
  date: new Date(),
  time: "",
  name: "",
  headCount: 1,
  request: "",
});

// 오늘 이전 날짜 비활성화
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
const disabledDates = ref([{ start: null, end: yesterday }]);

const reservationStore = useReservationStore();

const selectTime = (newTime) => {
  rsvData.value.time = newTime;
};

const increaseHeadCount = () => {
  if (rsvData.value.headCount < 20) {
    rsvData.value.headCount++;
  }
};

const decreaseHeadCount = () => {
  if (rsvData.value.headCount > 1) {
    rsvData.value.headCount--;
  }
};

const reservation = async () => {
  console.log(rsvData.value);
  const result = await reservationStore.reservation(rsvData.value);

  console.log(result);
  if (result.status === 200) {
    console.log("예약 성공");
  }
};
</script>

<template>
  <div class="side_container">
    <div class="side_main">
      <div class="side_title">
        <img src="/src/assets/icons/calendar.svg" alt="date" />
        <h4>날짜를 선택해주세요</h4>
      </div>
      <div class="side_calendar">
        <VDatePicker
          v-model="rsvData.date"
          :disabled-dates="disabledDates"
          mode="date"
          class="v-calendar"
          borderless
        />
      </div>
    </div>
    <div class="line"></div>
    <div class="side_main">
      <div class="side_title">
        <img src="/src/assets/icons/clock.svg" alt="time" />
        <h4>시간을 선택해주세요</h4>
      </div>
      <div class="side_time">
        <button
          v-for="time in timeList"
          :key="time"
          class="time"
          :class="{ picked: rsvData.time === time }"
          @click="selectTime(time)"
        >
          {{ time }}
        </button>
      </div>
    </div>
    <div class="line"></div>
    <div class="side_main">
      <div class="side_title">
        <img src="/src/assets/icons/write.svg" alt="" />
        <h4>정보를 입력해주세요</h4>
      </div>
      <div class="side_write">
        <div class="write_item">
          <p>이름</p>
          <div class="input_name">
            <input
              type="text"
              placeholder="이름을 입력해주세요."
              v-model="rsvData.name"
            />
          </div>
        </div>
        <div class="write_item">
          <p>인원수</p>
          <div class="headcount">
            <button @click="decreaseHeadCount">-</button>
            <div class="input_headcount">
              <input
                type="number"
                min="1"
                max="20"
                v-model="rsvData.headCount"
              />
            </div>
            <button @click="increaseHeadCount">+</button>
          </div>
        </div>
        <div class="write_item">
          <p>요청사항</p>
          <div class="input_request">
            <textarea
              name="request"
              placeholder="요청사항을 적어주세요."
              v-model="rsvData.request"
            >
            </textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
  <button class="side_button" @click="reservation">예약하기</button>
</template>

<style scoped>
.side_container {
  border: 1px solid #b6bdc7;
  border-radius: 1.5rem;
  padding: 0.5rem 0.3rem;
}

.side_main {
  padding: 1.5rem 1.3rem;
}

.side_main:first-child {
  padding: 1.5rem 1.3rem 1rem;
}

.line {
  height: 1px;
  background-color: #ccc;
}

.side_title {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.2rem;
  align-items: center;
}

.side_title > img {
  width: 1.3rem;
  height: 1.3rem;
}

.side_title > h4 {
  font-size: 1.2rem;
  margin: 0;
}

.side_time {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 0.7rem;
  padding: 0.3rem 0.5rem;
  height: 5rem;
}

.side_time > .time {
  border-radius: 0.5rem;
  border: 1px solid #ff7400;
  display: grid;
  place-content: center;
  width: 100%;
  font-size: 0.8rem;
  color: #ff7400;
  letter-spacing: 0.5px;
}

.side_time > .time:hover {
  background-color: #f6f1ec;
}

.side_time > .time.picked {
  color: white;
  background-color: #ff7400;
}

/* 정보 입력 */
.side_write {
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  padding: 0.3rem 0.5rem;
}

.write_item {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.write_item > p {
  font-size: 0.9rem;
  font-weight: 500;
}

/* 이름 입력 */
.input_name {
  border: 1px solid #9e9e9e;
  border-radius: 0.5rem;
  padding: 0.3rem 0.8rem;
}

.input_name > input {
  font-size: 0.8rem;
  width: 100%;
  outline: none;
  border: none;
  padding: 0;
}

.input_name > input::placeholder {
  color: #9e9e9e;
}

.input_name:focus-within {
  border-color: #202020;
}

/* 인원수 입력 */
.headcount {
  width: 7rem;
  height: 2rem;
  display: flex;
  align-items: center;
  border: 1px solid #9e9e9e;
  border-radius: 0.5rem;
}

.headcount > button {
  height: 100%;
  flex: 1 1 0%;
  font-size: 1rem;
}

.headcount > button:hover {
  background-color: #f6f1ec;
}

.headcount > button:first-child {
  border-radius: 0.5rem 0 0 0.5rem;
  border-right: 1px solid #ccc;
}

.headcount > button:last-child {
  border-radius: 0 0.5rem 0.5rem 0;
  border-left: 1px solid #ccc;
}

.input_headcount {
  height: 100%;
  flex: 1.5 1 0%;
}

.input_headcount > input {
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  text-align: center;
  font-size: 0.8em;
}

.input_headcount > input::-webkit-outer-spin-button,
.input_headcount > input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* 요청사항 입력 */
.input_request {
  border-radius: 0.5rem;
  border: 1px solid #9e9e9e;
  padding: 0.8rem;
  height: 5rem;
}

.input_request:focus-within {
  border-color: #202020;
}

.input_request > textarea {
  font-size: 0.8rem;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  resize: none;
  padding: 0;
}

.input_request > textarea::placeholder {
  color: #9e9e9e;
}

/* 예약하기 버튼 */
.side_button {
  width: 100%;
  height: 3rem;
  margin: 1rem auto;
  background-color: #ff7400;
  border-radius: 1rem;
  color: white;
  font-size: 1rem;
  font-weight: 700;
  display: grid;
  place-content: center;
}

.side_button:hover {
  background-color: #c96208;
}

@media (max-width: 960px) {
  .side_container {
    min-width: 25rem;
    max-width: 35rem;
    margin: 0 auto;
  }

  .side_calendar {
    display: flex;
    justify-content: center;
  }

  .side_time {
    grid-template-columns: repeat(4, 1fr);
    margin: 0 auto;
    height: 6rem;
    max-width: 25rem;
    padding: 0.3rem 1rem;
  }

  .side_write {
    max-width: 25rem;
    margin: 0 auto;
    padding: 0.3rem 1rem;
  }
}
</style>

<style>
.vc-highlight-content-solid {
  background-color: #ff7400;
}

.vc-day .vc-day-content:hover {
  background-color: hsla(30, 36%, 95%, 0.7);
}

.vc-day .vc-day-content.vc-focus:focus-within {
  box-shadow: none;
}

.v-calendar .vc-blue {
  --vc-accent-600: #ff7400;
}

.vc-weekdays {
  border-radius: 1rem;
  background-color: #f6f1ec;
  margin: 0.3rem 0;
}

.vc-weekdays > .vc-weekday {
  font-size: 0.8rem;
  color: #1a1a1a;
  font-family: "Pretendard", sans-serif;
  padding-top: 0.5rem;
}

.vc-day.weekday-1 {
  color: #ff322e;
}

.vc-day > .vc-day-content {
  font-size: 0.8rem;
  font-family: "Pretendard", sans-serif;
}
</style>
