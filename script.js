// Google Apps Script Web App URL (나중에 설정)
// 구현 설명서의 지시에 따라 아래 URL을 업데이트하세요
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyP_Kf_tOxo8KiqJB9k27dv4BEIYNZCUALrGzgISBV5vEOHulfdYtReek5FcJDTFMlGPQ/exec';

// 오늘 날짜를 기본값으로 설정
window.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
});

// 폼 제출 이벤트
document.getElementById('reservationForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Google Apps Script URL 확인
    if (SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
        showMessage('Google Apps Script URL을 먼저 설정해주세요. 구현 설명서를 참조하세요.', 'error');
        return;
    }

    // 폼 데이터 수집
    const formData = {
        name: document.getElementById('name').value,
        department: document.getElementById('department').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        people: document.getElementById('people').value,
        purpose: document.getElementById('purpose').value,
        notes: document.getElementById('notes').value,
        timestamp: new Date().toISOString()
    };

    // 제출 버튼 비활성화
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = '예약 중...';

    try {
        // Google Apps Script로 데이터 전송
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        // no-cors 모드에서는 응답을 읽을 수 없으므로 성공으로 간주
        showMessage('예약이 완료되었습니다!', 'success');

        // 폼 초기화
        document.getElementById('reservationForm').reset();

        // 날짜 최소값 다시 설정
        const dateInput = document.getElementById('date');
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);

    } catch (error) {
        console.error('Error:', error);
        showMessage('예약 중 오류가 발생했습니다. 다시 시도해주세요.', 'error');
    } finally {
        // 제출 버튼 다시 활성화
        submitBtn.disabled = false;
        submitBtn.textContent = '예약하기';
    }
});

// 메시지 표시 함수
function showMessage(text, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;

    // 3초 후 메시지 숨기기
    setTimeout(() => {
        messageDiv.className = 'message';
    }, 5000);
}

// 부드러운 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
