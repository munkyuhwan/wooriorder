// POS API URL
//export const POS_BASE_URL_REAL = "https://tordif.smilebiz.co.kr";
export const POS_BASE_URL_REAL = "https://ordif.smilebiz.co.kr";

export const POS_ORDER_NEW = "/partner/v1/table/order/new"; //신규 주문정보 등록
export const POS_ORDER_ADD = "/partner/v1/table/order/add"; // 추가 주문정보 등록
export const POS_POST_ORDER = "/partner/v1/table/order"; // 테이블 기준 10건
export const POS_POST_STORE_ORDER = "/partner/v2/table/order"; // 가맹점 전체 내역 (테이블당 5건)
export const POS_POST_MENU_STATE = "/partner/v1/menu/state"; // 상품정보 변경여부 확인
export const POS_POST_MENU_EDIT = "/partner/v1/menu/edit"; // 변경상품 조회
export const POS_POST_TABLE_LIST = "/partner/v1/table"; //테이블 목록 조회
export const POS_POST_PUSH_STATE = "/partner/v1/push/state"; // 푸시 서비스 목록 조회
export const POS_POST_PUSH_EDIT = "/partner/v1/push/edit"; // 푸시 수신 여부 갱신
export const POS_POST_ORDER_STATE = "{partner URL}/partner/v1/push"; //주문상태를 스마트로에서 보내줌.
export const POS_POST_ORDER_CANCEL = "/partner/v1/table/order/cancel"; // 반품요청

// ADMIN API URL
export const ADMIN_BASE_URL = "https://wooriorder.co.kr/smartro";

export const ADMIN_GOODS = "/goods2.php";
export const ADMIN_OPTION = "/option.php";
export const ADMIN_CATEGORIES= "/category.php";
export const ADMIN_CALL_SERVICE = "/call.php";
export const ADMIN_POST_CALL_SERVICE = "/call_ok.php";
export const ADMIN_BANNER = "/banner.php";
export const ADMIN_TABLE_STATUS = "/store_table.php";

export const ADMIN_BANNER_DIR = "https://wooriorder.co.kr/smartro/upload_file/banner/";

//export const STORE_ID = "3100396007";
//export const STORE_ID = "7407191"; //테스트 
//export const SERVICE_ID = "532461";

// 내꺼 테스트용
export const STORE_ID = "3113810001"; 
export const SERVICE_ID = "3010";

// 우리포스 테스트용
//export const STORE_ID = "3113813001";
//export const SERVICE_ID = "3010";

//export const STORE_ID = "3113815001"; 
//export const SERVICE_ID = "3010";

// 미생 7519577001

export const CALL_SERVICE_GROUP_CODE = "99999";
// ADMIN API URL


