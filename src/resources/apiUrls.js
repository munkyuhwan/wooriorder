// POS API URL
export const POS_BASE_URL_TEST = "https://tordif.smilebiz.co.kr/";
export const POS_BASE_URL_REAL = "https://ordif.smilebiz.co.kr/";

export const POS_NEW_ORDER = "/partner/v1/table/order/new"; //신규 주문정보 등록
export const POS_ADD_ORDER = "/partner/v1/table/order/add"; // 추가 주문정보 등록
export const POS_POST_ORDER = "/partner/v1/table/order"; // 테이블 기준 10건
export const POS_POST_STORE_ORDER = "/partner/v2/table/order"; // 가맹점 전체 내역 (테이블당 5건)
export const POS_POST_MENU_STATE = "/partner/v1/menu/state"; // 상품정보 변경여부 확인
export const POS_POST_EDIT_MEUN = "/partner/v1/menu/edit"; // 변경상품 조회
export const POS_POST_TABLE_LIST = "/partner/v1/table"; //테이블 목록 조회
export const POS_POST_PUSH_STATE = "/partner/v1/push/state"; // 푸시 서비스 목록 조회
export const POS_POST_PUSH_EDIT = "/partner/v1/push/edit"; // 푸시 수신 여부 갱신
export const POS_POST_ORDER_STATE = "{partner URL}/partner/v1/push"; //주문상태를 스마트로에서 보내줌.
export const POS_POST_ORDER_CANCEL = "/partner/v1/table/order/cancel"; // 반품요청


// ADMIN API URL

