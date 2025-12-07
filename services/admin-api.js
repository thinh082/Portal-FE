// Admin API Configuration
const ADMIN_API_CONFIG = {
    BASE_URL: 'http://localhost:5117/api/Admin',
    HEADERS: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
};

// Helper function để gọi API
async function adminApiCall(endpoint, method = 'GET', data = null) {
    try {
        const options = {
            method: method,
            headers: ADMIN_API_CONFIG.HEADERS
        };

        if (data && (method === 'POST' || method === 'PUT')) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(`${ADMIN_API_CONFIG.BASE_URL}${endpoint}`, options);
        const result = await response.json();
        
        return {
            success: response.ok,
            status: response.status,
            data: result
        };
    } catch (error) {
        console.error('Admin API Error:', error);
        return {
            success: false,
            status: 500,
            data: { message: 'Lỗi kết nối đến server', code: 500 }
        };
    }
}

// Admin API Functions
const AdminAPI = {
    // ========== ADMIN LOGIN ==========
    login: async (username, password) => {
        return await adminApiCall('/login', 'POST', { username, password });
    },

    // ========== DASHBOARD STATISTICS ==========
    getDashboardStats: async () => {
        return await adminApiCall('/dashboard/stats', 'GET');
    },

    // ========== STUDENTS CRUD ==========
    getAllStudents: async () => {
        return await adminApiCall('/students', 'GET');
    },

    getStudent: async (id) => {
        return await adminApiCall(`/students/${id}`, 'GET');
    },

    createStudent: async (studentData) => {
        return await adminApiCall('/students', 'POST', studentData);
    },

    updateStudent: async (id, studentData) => {
        return await adminApiCall(`/students/${id}`, 'PUT', studentData);
    },

    deleteStudent: async (id) => {
        return await adminApiCall(`/students/${id}`, 'DELETE');
    },

    // ========== SUBJECTS CRUD ==========
    getAllSubjects: async () => {
        return await adminApiCall('/subjects', 'GET');
    },

    getSubject: async (id) => {
        return await adminApiCall(`/subjects/${id}`, 'GET');
    },

    createSubject: async (subjectData) => {
        return await adminApiCall('/subjects', 'POST', subjectData);
    },

    updateSubject: async (id, subjectData) => {
        return await adminApiCall(`/subjects/${id}`, 'PUT', subjectData);
    },

    deleteSubject: async (id) => {
        return await adminApiCall(`/subjects/${id}`, 'DELETE');
    },

    // ========== SCHEDULES CRUD ==========
    getAllSchedules: async () => {
        return await adminApiCall('/schedules', 'GET');
    },

    createSchedule: async (scheduleData) => {
        return await adminApiCall('/schedules', 'POST', scheduleData);
    },

    updateSchedule: async (id, scheduleData) => {
        return await adminApiCall(`/schedules/${id}`, 'PUT', scheduleData);
    },

    deleteSchedule: async (id) => {
        return await adminApiCall(`/schedules/${id}`, 'DELETE');
    },

    // ========== REGISTRATIONS CRUD ==========
    getAllRegistrations: async () => {
        return await adminApiCall('/registrations', 'GET');
    },

    deleteRegistration: async (id) => {
        return await adminApiCall(`/registrations/${id}`, 'DELETE');
    },

    // ========== TUITION FEES CRUD ==========
    getAllTuitionFees: async () => {
        return await adminApiCall('/tuition-fees', 'GET');
    },

    createTuitionFee: async (tuitionData) => {
        return await adminApiCall('/tuition-fees', 'POST', tuitionData);
    },

    updateTuitionFee: async (id, tuitionData) => {
        return await adminApiCall(`/tuition-fees/${id}`, 'PUT', tuitionData);
    },

    deleteTuitionFee: async (id) => {
        return await adminApiCall(`/tuition-fees/${id}`, 'DELETE');
    },

    // ========== CHARTS DATA ==========
    getStudentsByDepartment: async () => {
        return await adminApiCall('/charts/students-by-department', 'GET');
    },

    getTopSubjects: async (top = 10) => {
        return await adminApiCall(`/charts/top-subjects?top=${top}`, 'GET');
    },

    getSubjectsByCredits: async () => {
        return await adminApiCall('/charts/subjects-by-credits', 'GET');
    },

    getTuitionStatus: async () => {
        return await adminApiCall('/charts/tuition-status', 'GET');
    },

    getTuitionBySemester: async () => {
        return await adminApiCall('/charts/tuition-by-semester', 'GET');
    },

    getStudentsByClass: async (top = 10) => {
        return await adminApiCall(`/charts/students-by-class?top=${top}`, 'GET');
    },

    // ========== EXPORT EXCEL ==========
    exportStudents: async () => {
        try {
            const response = await fetch(`${ADMIN_API_CONFIG.BASE_URL}/export/students`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                }
            });
            
            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                const contentDisposition = response.headers.get('Content-Disposition');
                let fileName = 'DanhSachSinhVien.xlsx';
                if (contentDisposition) {
                    const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/i);
                    if (fileNameMatch && fileNameMatch[1]) {
                        fileName = fileNameMatch[1];
                    }
                }
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
                return { success: true, message: 'Xuất Excel thành công' };
            } else {
                return { success: false, message: 'Xuất Excel thất bại' };
            }
        } catch (error) {
            console.error('Export Excel Error:', error);
            return { success: false, message: 'Có lỗi xảy ra khi xuất Excel' };
        }
    },

    exportSubjects: async () => {
        try {
            const response = await fetch(`${ADMIN_API_CONFIG.BASE_URL}/export/subjects`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                }
            });
            
            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                const contentDisposition = response.headers.get('Content-Disposition');
                let fileName = 'DanhSachMonHoc.xlsx';
                if (contentDisposition) {
                    const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/i);
                    if (fileNameMatch && fileNameMatch[1]) {
                        fileName = fileNameMatch[1];
                    }
                }
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
                return { success: true, message: 'Xuất Excel thành công' };
            } else {
                return { success: false, message: 'Xuất Excel thất bại' };
            }
        } catch (error) {
            console.error('Export Excel Error:', error);
            return { success: false, message: 'Có lỗi xảy ra khi xuất Excel' };
        }
    },

    exportRegistrations: async () => {
        try {
            const response = await fetch(`${ADMIN_API_CONFIG.BASE_URL}/export/registrations`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                }
            });
            
            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                const contentDisposition = response.headers.get('Content-Disposition');
                let fileName = 'DanhSachDangKy.xlsx';
                if (contentDisposition) {
                    const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/i);
                    if (fileNameMatch && fileNameMatch[1]) {
                        fileName = fileNameMatch[1];
                    }
                }
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
                return { success: true, message: 'Xuất Excel thành công' };
            } else {
                return { success: false, message: 'Xuất Excel thất bại' };
            }
        } catch (error) {
            console.error('Export Excel Error:', error);
            return { success: false, message: 'Có lỗi xảy ra khi xuất Excel' };
        }
    },

    exportTuitionFees: async () => {
        try {
            const response = await fetch(`${ADMIN_API_CONFIG.BASE_URL}/export/tuition-fees`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                }
            });
            
            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                const contentDisposition = response.headers.get('Content-Disposition');
                let fileName = 'DanhSachHocPhi.xlsx';
                if (contentDisposition) {
                    const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/i);
                    if (fileNameMatch && fileNameMatch[1]) {
                        fileName = fileNameMatch[1];
                    }
                }
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
                return { success: true, message: 'Xuất Excel thành công' };
            } else {
                return { success: false, message: 'Xuất Excel thất bại' };
            }
        } catch (error) {
            console.error('Export Excel Error:', error);
            return { success: false, message: 'Có lỗi xảy ra khi xuất Excel' };
        }
    }
};

// Local Storage helpers for Admin
const StorageAdmin = {
    setAdmin: (admin) => {
        localStorage.setItem('admin', JSON.stringify(admin));
    },
    getAdmin: () => {
        const admin = localStorage.getItem('admin');
        return admin ? JSON.parse(admin) : null;
    },
    clearAdmin: () => {
        localStorage.removeItem('admin');
    },
    isLoggedIn: () => {
        return StorageAdmin.getAdmin() !== null;
    }
};

