import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://120.50.73.151:8080/api/' // 기본 요청 URL 설정
});

// 응답 인터셉터: 로그인 성공 시 토큰을 localStorage에 저장
instance.interceptors.response.use(response => {
    if (response.config.url === 'auth/login' && response.data && response.data.value) {
        localStorage.setItem('token', response.data.value);
    }
    return response;
}, error => {
    return Promise.reject(error);
});

// 요청 인터셉터: 모든 요청의 헤더에 토큰 추가
instance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;  // Bearer 토큰을 사용한다고 가정. 실제 토큰 유형에 따라 조정
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default instance;
