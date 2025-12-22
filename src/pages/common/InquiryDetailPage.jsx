import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosConfig';

const InquiryDetailPage = () => {
    const { inquiryId } = useParams();
    const navigate = useNavigate();
    const [inquiry, setInquiry] = useState(null);
    const [replyText, setReplyText] = useState(""); // 답변 입력값
    const userRole = localStorage.getItem('userRole');

    useEffect(() => {
        fetchDetail();
    }, []);

    const fetchDetail = async () => {
        try {
            const res = await axiosInstance.get(`/inquiries/${inquiryId}`);
            setInquiry(res.data);
            if (res.data.reply) setReplyText(res.data.reply); // 기존 답변 있으면 채워넣기
        } catch (err) {
            alert("접근 권한이 없거나 삭제된 글입니다.");
            navigate('/inquiries');
        }
    };

    // 관리자용 답변 등록 함수
    const handleReplySubmit = async () => {
        try {
            await axiosInstance.patch(`/inquiries/${inquiryId}/reply`, { reply: replyText });
            alert("답변이 등록되었습니다.");
            window.location.reload();
        } catch (err) {
            console.error(err);
            alert("답변 등록 실패");
        }
    };

    if (!inquiry) return <div>로딩 중...</div>;

    return (
        <div className="p-6 max-w-4xl mx-auto">
            {/* 질문 영역 */}
            <div className="bg-white shadow rounded-lg p-6 mb-6 border border-indigo-100">
                <h1 className="text-xl font-bold mb-2 text-indigo-900">Q. {inquiry.title}</h1>
                <div className="text-gray-500 text-sm mb-6 border-b pb-2">
                    {inquiry.writer?.name} | {new Date(inquiry.createdAt).toLocaleDateString()}
                </div>
                <div className="min-h-[100px] whitespace-pre-wrap text-gray-800">{inquiry.content}</div>
            </div>

            {/* 답변 영역 (답변이 있거나, 관리자일 때만 보임) */}
            {(inquiry.reply || userRole === 'admin') && (
                <div className="bg-gray-50 shadow rounded-lg p-6 border border-gray-200">
                    <h2 className="text-lg font-bold mb-4 text-gray-700">A. 관리자 답변</h2>

                    {userRole === 'admin' ? (
                        // 관리자는 수정 가능
                        <div>
                            <textarea
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                rows="4"
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder="답변을 입력하세요..."
                            />
                            <div className="text-right mt-2">
                                <button
                                    onClick={handleReplySubmit}
                                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                                >
                                    답변 등록
                                </button>
                            </div>
                        </div>
                    ) : (
                        // 일반 유저는 읽기만 가능
                        <div className="whitespace-pre-wrap text-gray-800 bg-white p-4 rounded border">
                            {inquiry.reply || "아직 답변이 등록되지 않았습니다."}
                        </div>
                    )}
                </div>
            )}

            <div className="text-center mt-6">
                <button onClick={() => navigate('/inquiries')} className="text-gray-500 hover:text-gray-800 underline">
                    목록으로 돌아가기
                </button>
            </div>
        </div>
    );
};

export default InquiryDetailPage;