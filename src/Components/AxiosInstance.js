import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://64.110.89.251:8081' // 기본 요청 URL 설정
});

// 응답 인터셉터: 로그인 성공 시 토큰을 localStorage에 저장
// 여기 토큰설정때문에 팅기는 가능성이 발생할 수 있음
instance.interceptors.response.use(response => {
    console.log('Response:', response);
    
    if (response.config.url === 'api/auth/login' && response.data) {
        // 로그인 요청에 대한 응답인 경우
        if(response.data.accessToken) {
            // 기존 토큰 삭제
            localStorage.removeItem('AccessToken');

            // 새 토큰 저장
            localStorage.setItem('AccessToken', response.data.accessToken.value);
        }
    }

    return response;
}, error => {
    console.error('Response Error:', error); // 에러 발생시 콘솔에 에러 출력

    if (error.response) {
        if (error.response.status === 500) {
            alert('서버에서 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.');
        } else if (error.response.status === 401) {
            alert('로그아웃 되었습니다.');
            localStorage.removeItem('AccessToken'); // 토큰 삭제
            localStorage.removeItem('userId');
            window.location = '/'; // 로그인 페이지로 리다이렉트
        }
    }

    return Promise.reject(error);
});

// 요청 인터셉터: 모든 요청의 헤더에 토큰 추가
instance.interceptors.request.use(config => {
    console.log('Starting Request:', config); // 요청 시작시 요청 정보 출력
    const token = localStorage.getItem('AccessToken');
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;  // Bearer 토큰을 사용
    }
    return config;
}, error => {
    console.error('Request Error:', error); // 요청 에러시 콘솔에 에러 출력
    return Promise.reject(error);
});

export default instance;