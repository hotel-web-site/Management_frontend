// src/api/adminAuditApi.js
import axiosInstance from "./axiosConfig";

const adminAuditApi = {
    // 감사 로그 목록 조회
    getLogs: async (params) => {
        // 백엔드: GET /api/audit/admin/logs
        const response = await axiosInstance.get("/audit/admin/logs", { params });
        return response.data;
    },
};

export default adminAuditApi;