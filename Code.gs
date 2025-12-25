// Google Apps Script 파일
// 이 코드를 Google Apps Script 에디터에 복사하세요

// POST 요청 처리 함수
function doPost(e) {
  try {
    // 스프레드시트 가져오기
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // 첫 번째 행이 비어있으면 헤더 추가
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        '예약시간',
        '이름',
        '부서',
        '날짜',
        '시간',
        '인원',
        '목적',
        '특이사항'
      ]);
    }

    // JSON 데이터 파싱
    const data = JSON.parse(e.postData.contents);

    // 새 행 추가
    sheet.appendRow([
      data.timestamp,
      data.name,
      data.department,
      data.date,
      data.time,
      data.people,
      data.purpose,
      data.notes
    ]);

    // 성공 응답
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': '예약이 완료되었습니다.'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // 에러 응답
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// GET 요청 처리 함수 (테스트용)
function doGet(e) {
  return ContentService.createTextOutput('카페 예약 시스템이 정상 작동 중입니다.');
}

// 예약 목록 조회 함수 (선택사항)
function getReservations() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  return data;
}

// 특정 날짜의 예약 조회 함수 (선택사항)
function getReservationsByDate(date) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();

  // 헤더 제외하고 필터링
  const filtered = data.slice(1).filter(row => row[3] === date);
  return filtered;
}
