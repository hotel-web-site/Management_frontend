import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosConfig';
import '../../styles/inquiry.scss'; // 👈 SCSS 임포트!

const InquiryDetailPage = () => {
    const { inquiryId } = useParams();
    const navigate = useNavigate();
    const [inquiry, setInquiry] = useState(null);
    const [replyText, setReplyText] = useState("");
    const userRole = localStorage.getItem('userRole');

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const res = await axiosInstance.get(`/inquiries/${inquiryId}`);
                setInquiry(res.data);
                if (res.data.reply) setReplyText(res.data.reply);
            } catch (err) { navigate('/owner/inquiries'); }
        };
        fetchDetail();
    }, [inquiryId]);

    const handleReply = async () => {
        try {
            await axiosInstance.patch(`/inquiries/${inquiryId}/reply`, { reply: replyText });
            alert("답변 완료!");
            window.location.reload();
        } catch (e) { alert("에러 발생"); }
    };

    if (!inquiry) return <div className="inquiry-container">로딩 중...</div>;

    return (
        <div className="inquiry-container">
            <div className="page-header">
                <h2>📋 문의 상세</h2>
            </div>

            <div className="inquiry-detail-card">
                <div className="detail-header">
                    <h1>Q. {inquiry.title}</h1>
                    <div className="meta">
                        <span>작성자: {inquiry.writer?.name}</span>
                        <span>작성일: {new Date(inquiry.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>

                <div className="detail-content">
                    {inquiry.content}
                </div>

                {/* 답변 영역 */}
                <div className="admin-reply-section">
                    <h3>🅰️ 관리자 답변</h3>
                    {userRole === 'admin' ? (
                        <div>
                            <textarea
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder="답변을 입력하세요..."
                                rows="4"
                            />
                            <div style={{ textAlign: 'right' }}>
                                <button onClick={handleReply} className="btn-reply">답변 등록</button>
                            </div>
                        </div>
                    ) : (
                        <div className="reply-content">
                            {inquiry.reply ? inquiry.reply : "아직 답변이 등록되지 않았습니다."}
                        </div>
                    )}
                </div>

                <div className="detail-footer">
                    <button className="btn-back" onClick={() => navigate('/owner/inquiries')}>목록으로 돌아가기</button>
                </div>
            </div>
        </div>
    );
};

export default InquiryDetailPage;