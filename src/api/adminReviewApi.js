// src/api/adminReviewApi.js (최종본)
import axiosInstance from "./axiosConfig"; // 니 axiosConfig 가져오기
import { getReportsAdmin, processReport } from "./index"; // 신고 관련은 그대로

const adminReviewApi = {
  // 1. 리뷰 목록 조회 (이제 진짜 됨!)
  getReviews: async (params) => {
    // GET /api/reviews/admin/list
    const response = await axiosInstance.get('/reviews/admin/list', { params });
    return response.data;
  },

  // 2. 리뷰 상세 조회
  getReviewById: async (reviewId) => {
    const response = await axiosInstance.get(`/reviews/admin/${reviewId}`);
    return response.data;
  },

  // 3. 리뷰 삭제
  deleteReview: async (reviewId) => {
    const response = await axiosInstance.delete(`/reviews/admin/${reviewId}`);
    return response.data;
  },

  // 4. 리뷰 상태 변경 (껍데기지만 에러는 안 남)
  updateReviewStatus: async (reviewId, status) => {
    const response = await axiosInstance.put(`/reviews/admin/${reviewId}/status`, { status });
    return response.data;
  },

  // ==================================================
  // ✅ [핵심] 신고된 리뷰 관리
  // ==================================================

  // --- 아래는 신고(Report) 관련 (그대로 유지) ---
  getReportedReviews: async (params) => {
    const response = await getReportsAdmin(params);
    return response.data; 
  },

  handleReport: async (reportId, action) => {
    const response = await processReport(reportId, { status: action }); // action: resolved/dismissed
    return response.data;
  },
};

export default adminReviewApi;