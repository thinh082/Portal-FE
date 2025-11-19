// API Configuration
const API_CONFIG = {
    BASE_URL: 'http://localhost:5117/api/Student',
    VNPAY_BASE_URL: 'http://localhost:5117/api/Vnpay',
    HEADERS: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
};

// Helper function để gọi API
async function apiCall(endpoint, method = 'GET', data = null) {
    try {
        const options = {
            method: method,
            headers: API_CONFIG.HEADERS
        };

        if (data && (method === 'POST' || method === 'PUT')) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, options);
        const result = await response.json();
        
        return {
            success: response.ok,
            status: response.status,
            data: result
        };
    } catch (error) {
        console.error('API Error:', error);
        return {
            success: false,
            status: 500,
            data: { message: 'Lỗi kết nối đến server', code: 500 }
        };
    }
}

// API Functions
const StudentAPI = {
    // 1. Đăng nhập
    login: async (mssv, password) => {
        return await apiCall('/login', 'POST', { mssv, password });
    },

    // 2. Xem thông tin sinh viên
    getStudentInfo: async (id) => {
        return await apiCall(`/${id}`, 'GET');
    },

    // 3. Xem danh sách môn học
    getAllSubjects: async () => {
        return await apiCall('/subjects', 'GET');
    },

    // 4. Đăng ký môn học
    registerSubject: async (studentId, subjectId) => {
        return await apiCall('/register-subject', 'POST', { studentId, subjectId });
    },

    // 5. Xem danh sách môn đã đăng ký
    getRegisteredSubjects: async (studentId) => {
        return await apiCall(`/${studentId}/registered-subjects`, 'GET');
    },

    // 6. Hủy đăng ký môn học
    cancelRegistration: async (studentSubjectId) => {
        return await apiCall('/cancel-registration', 'POST', { studentSubjectId });
    },

    // 7. Xem thời khóa biểu
    getSchedule: async (studentId) => {
        return await apiCall(`/${studentId}/schedule`, 'GET');
    },

    // 8. Xem học phí
    getTuitionFee: async (studentId) => {
        return await apiCall(`/${studentId}/tuition-fee`, 'GET');
    }
};

// VNPay API Functions
const VnpayAPI = {
    // Tạo URL thanh toán học phí
    createPaymentUrl: async (studentId, tuitionFeeId, money) => {
        try {
            const options = {
                method: 'POST',
                headers: API_CONFIG.HEADERS,
                body: JSON.stringify({
                    studentId: studentId,
                    tuitionFeeId: tuitionFeeId,
                    money: money
                })
            };

            const response = await fetch(`${API_CONFIG.VNPAY_BASE_URL}/CreatePaymentUrl`, options);
            const result = await response.json();
            
            return {
                success: response.ok,
                status: response.status,
                data: result
            };
        } catch (error) {
            console.error('VNPay API Error:', error);
            return {
                success: false,
                status: 500,
                data: { message: 'Lỗi kết nối đến server', code: 500 }
            };
        }
    }
};

// Local Storage helpers
const Storage = {
    setStudent: (student) => {
        localStorage.setItem('student', JSON.stringify(student));
    },
    getStudent: () => {
        const student = localStorage.getItem('student');
        return student ? JSON.parse(student) : null;
    },
    clearStudent: () => {
        localStorage.removeItem('student');
    },
    isLoggedIn: () => {
        return Storage.getStudent() !== null;
    }
};

