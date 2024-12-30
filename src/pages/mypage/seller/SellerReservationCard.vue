<script setup>
import { ref, onMounted, computed } from "vue";
import { useReservationStore } from "../../../stores/useReservationStore";

const reservationStore = useReservationStore();

const isModalVisible = ref(false);
const selectedReservation = ref(null);
const selectedDate = ref("");  // 선택한 날짜를 저장할 변수
const noReservationsModalVisible = ref(false);  // 예약이 없을 경우 모달 표시용 변수

// 예약 데이터의 날짜 형식 변환 함수 (년, 월, 일만 비교)
const parseDate = (dateString) => {
  const regex = /(\d{2})\.\s*(\d{2})\.\s*(\d{2})\.\([^\)]*\)\s*(오전|오후)?\s*(\d{1,2})\:(\d{2})/;
  const match = dateString.match(regex);

  if (!match) return null;

  const [, year, month, day] = match;

  const fullYear = `20${year}`;
  const formattedMonth = month.padStart(2, "0");
  const formattedDay = day.padStart(2, "0");

  const formattedDate = new Date(`${fullYear}-${formattedMonth}-${formattedDay}`);
  return formattedDate;
};

// 예약 필터링 및 정렬
const filteredReservations = computed(() => {
  if (!selectedDate.value) return reservationStore.reservations;

  const selectedDateObj = new Date(selectedDate.value); 
  const selectedDateString = selectedDateObj.toISOString().split('T')[0]; // 'yyyy-mm-dd' 형식으로 변환

  // 예약 목록 필터링
  const filtered = reservationStore.reservations.filter(reservation => {
    const reservationDate = parseDate(reservation.time);
    if (!reservationDate) return false;

    const reservationDateString = reservationDate.toISOString().split('T')[0];

    return reservationDateString === selectedDateString;
  });

  // 해당 날짜에 예약이 없으면 모달 표시
  if (filtered.length === 0) {
    noReservationsModalVisible.value = true;
  } else {
    noReservationsModalVisible.value = false;
  }

  return filtered.sort((a, b) => {
    const dateA = parseDate(a.time);
    const dateB = parseDate(b.time);
    return dateA - dateB;
  });
});

const showDetails = (reservationId) => {
  const reservation = reservationStore.reservations.find(res => res.idx === reservationId);
  selectedReservation.value = reservation;
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
  noReservationsModalVisible.value = false;  // 모달 닫을 때 예약 없음 모달도 닫기
};

const handleDateChange = (event) => {
  selectedDate.value = event.target.value;
};

onMounted(async () => {
  await reservationStore.getSellerReservationsList();
});
</script>

<template>
  <section class="reservation_list">
    <div class="container">
      <div class="reservation_title_box">
        <label class="reservation_title">예약 정보</label>
      </div>

      <div class="filter">
        <label for="date-filter">이용일 :</label>
        <input type="date" id="date-filter" v-model="selectedDate" @change="handleDateChange" /> 
      </div>

      <table>
        <thead>
          <tr>
            <th>예약번호</th>
            <th>예약자</th>
            <th>전화번호</th>
            <th>요청 사항</th>
            <th>이용일시</th>
            <th>인원</th>
            <th>상세보기</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="reservation in filteredReservations" :key="reservation?.idx">
            <td>{{ reservation?.idx }}</td>
            <td>{{ reservation?.name }}</td>
            <td>{{ reservation?.phone }}</td>
            <td>{{ reservation?.request }}</td>
            <td>{{ reservation?.time }}</td>
            <td>{{ reservation?.headcount }}</td>
            <td><button @click="showDetails(reservation?.idx)">상세보기</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <!-- 예약이 없을 때 표시할 모달 -->
  <div v-if="noReservationsModalVisible" class="modal">
    <div class="modal-content">
      <span class="close-button" @click="closeModal">&times;</span>
      <h2>알림</h2>
      <p class = "rsv_alert_modal">해당 날짜의 예약이 없습니다.</p>
    </div>
  </div>

  <!-- 예약 상세보기 모달 -->
  <div v-if="isModalVisible" id="modal" class="modal">
    <div class="modal-content">
      <span class="close-button" @click="closeModal">&times;</span>
      <h2>예약 상세보기</h2>
      <table>
        <tr>
          <th>예약번호</th>
          <td id="modal-reservation-number">{{ selectedReservation?.idx }}</td>
        </tr>
        <tr>
          <th>예약자</th>
          <td id="modal-reservation-name">{{ selectedReservation?.name }}</td>
        </tr>
        <tr>
          <th>전화번호</th>
          <td id="modal-reservation-phone">{{ selectedReservation?.phone }}</td>
        </tr>
        <tr>
          <th>요청사항</th>
          <td id="modal-reservation-request">{{ selectedReservation?.request }}</td>
        </tr>
        <tr>
          <th>이용일시</th>
          <td id="modal-reservation-date">{{ selectedReservation?.time }}</td>
        </tr>
        <tr>
          <th>인원</th>
          <td id="modal-reservation-people">{{ selectedReservation?.headcount }}명</td>
        </tr>
      </table>
    </div>
  </div>
</template>



<style scoped>
.rsv_alert_modal{
  margin: .625rem 0 0 0;
}
.container {
  margin: 0 0 0 2rem; /* margin-left만 적용된 상태 */
  text-align: left; /* 명시적으로 추가 */
  display: block; /* block 요소로 지정 */
}

.reservation_list{
    width: 46rem;
    margin: 0 auto;
}

.reservation_title_box {
  margin: 3.125rem 0 2.5rem;
  display: flex; /* 플렉스 박스 활성화 */
  justify-content: flex-start; /* 왼쪽 정렬 */
  text-align: left; /* 텍스트 왼쪽 정렬 */
  width: 100%; /* 부모 컨테이너의 전체 폭 사용 */
}
.reservation_title{
    font-size: 1.875rem;
    font-weight: 800;   
}
.filter {
    display: flex;
    gap: .625rem;
    align-items: center;
    margin: 0 0 1.875rem;
}

.filter select,
.filter input {
    padding: .3125rem .625rem;
    border: .0625rem solid #ddd;
    border-radius: .25rem;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1.25rem; 
    table-layout: fixed; /* 테이블의 레이아웃을 고정 */
    word-wrap: break-word; /* 긴 텍스트 줄바꿈 */
}

table thead {
    background-color: #f1f1f1;
}

table th,
table td {
    text-align: left;
    padding: .625rem;
    border: .0625rem solid #ddd;
    overflow: hidden; /* 내용을 강제로 제한 */
    text-overflow: ellipsis; /* 너무 긴 텍스트는 말줄임표(...)로 표시 */
    white-space: nowrap; /* 한 줄로 표시 */
}

table th {
    text-align: center;
    font-size: .875rem;
    font-weight: bold;
}

/* 각 열의 너비 설정 */
table th:nth-child(1), table td:nth-child(1) {
    width: 2.8rem; /* 예약번호 열 */
}

table th:nth-child(2), table td:nth-child(2) {
    width: 2.3rem; /* 예약자 열 */
}

table th:nth-child(3), table td:nth-child(3) {
    width: 4.8rem; /* 전화번호 열 */
}

table th:nth-child(4), table td:nth-child(4) {
    width: 10rem; /* 요청 사항 열 */
}

table th:nth-child(5), table td:nth-child(5) {
    width: 8.2rem; /* 이용일시 열 */
}

table th:nth-child(6), table td:nth-child(6) {
    width: 1.5rem; /* 인원 열 */
}

table th:nth-child(7), table td:nth-child(7) {
    width: 5rem; /* 상세보기 열 */
}

 /* 버튼 스타일 */
 .reservation_list table button {
    background-color: #007BFF; /* 버튼 배경색: 파란색 */
    color: white; /* 텍스트 색 */
    border: none; /* 테두리 없앰 */
    padding: .5rem 1rem; /* 패딩 */
    font-size: .875rem; /* 폰트 크기 */
    cursor: pointer; /* 마우스 포인터 변경 */
    border-radius: .3125rem; /* 둥근 테두리 */
    transition: background-color 0.3s, transform 0.2s; /* 배경색 변경 및 확대 효과 */
}

.reservation_list table button:hover {
    background-color: #0056b3; /* 호버시 배경색을 어두운 파란색으로 변경 */
}

/* 버튼을 포함한 테이블 셀 스타일 */
.reservation_list table td:last-child {
    text-align: center; /* 버튼을 가운데 정렬 */
}

/* 모달 전체 스타일 */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7); /* 배경색 */
    display: flex;
    justify-content: center;
    align-items: center;
    visibility: hidden; /* 기본적으로 숨김 */
    opacity: 0;
    transition: visibility 0.3s, opacity 0.3s ease-in-out;
    z-index: 1000; /* 다른 요소들 위로 올라오게 */
}

/* 모달이 보일 때 */
.modal:not(.hidden) {
    visibility: visible;
    opacity: 1;
}

/* 모달 내용 스타일 */
.modal-content {
    background-color: white;
    padding: 1.25rem;
    border-radius: .5rem;
    width: 80%;
    max-width: 37.5rem;
    overflow-y: auto;
    box-shadow: 0 .25rem .5rem rgba(0, 0, 0, 0.1);
    position: relative;
}

/* 모달 닫기 버튼 스타일 */
.close-button {
    position: absolute;
    top: .625rem;
    right: .625rem;
    font-size: 1.5em;
    color: #333;
    cursor: pointer;
    background: none;
    border: none;
}

/* 예약 정보 테이블 스타일 */
.modal-content table {
    width: 100%;
    margin-top: 1.25rem;
    border-collapse: collapse;
}

.modal-content th,
.modal-content td {
    padding: .5rem .75rem;
    text-align: left;
}

.modal-content th {
    width: 7.5rem;
    background-color: #f4f4f4;
}

.modal-content td {
    border-bottom: .0625rem solid #ddd;
}

.modal-content td#modal-reservation-request {
    white-space: pre-wrap; /* 줄 바꿈을 허용하고 텍스트가 길어질 경우 자동으로 줄 바꿈 */
    word-wrap: break-word; /* 긴 단어가 너무 길어지면 다음 줄로 넘어가도록 */
    overflow-wrap: break-word; /* 추가로 긴 단어가 넘어가지 않도록 처리 */
    max-width: 100%; /* 셀 너비를 100%로 설정하여 공간을 최대한 활용 */
    word-break: break-all; /* 긴 단어를 강제로 끊어줌 */
    height: auto; /* 높이는 자동으로 조정되어 내용이 잘리지 않음 */
    min-height: 3.125rem; /* 요청사항이 없는 경우에도 최소 높이를 설정 */
    padding: .625rem; /* 텍스트가 셀 안에서 여유 있게 보이도록 패딩 추가 */
}

/* 임시 스타일: 버튼으로 모달 호출 */
button {
    padding: .625rem;
    cursor: pointer;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: .25rem;
}

button:hover {
    background-color: #0056b3;
}
  </style>