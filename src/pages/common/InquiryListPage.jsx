import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosConfig';

const InquiryListPage = () => {
    const navigate = useNavigate();
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const userRole = localStorage.getItem('userRole'); // 역할 확인

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        try {
            const response = await axiosInstance.get('/inquiries');

            // 👇 [디버깅] 일단 콘솔에 찍어서 뭐가 오는지 눈으로 확인해봐!
            console.log("문의사항 데이터 원본:", response.data);

            // 🚨 [수정] 무조건 배열만 넣도록 강제 변환!
            // 만약 배열이면 그대로 넣고, 아니면(객체거나 null이면) 빈 배열([]) 넣어서 에러 방지
            if (Array.isArray(response.data)) {
                setInquiries(response.data);
            } else if (response.data && Array.isArray(response.data.data)) {
                // 혹시 백엔드가 { data: [...] } 형태로 줬을 경우
                setInquiries(response.data.data);
            } else {
                // 이도 저도 아니면 그냥 빈 배열 처리 (화면 안 뻗게)
                setInquiries([]);
            }

        } catch (error) {
            console.error('Q&A 로딩 실패:', error);
            setInquiries([]); // 에러 나도 빈 배열로 초기화
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">💬 1:1 문의사항</h2>
                {/* 유저(user)나 사업자(business)면 글쓰기 버튼 보임 */}
                {userRole !== 'admin' && (
                    <button
                        onClick={() => navigate('/inquiries/new')}
                        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition font-bold"
                    >
                        ✍️ 문의하기
                    </button>
                )}
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 w-16">상태</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500">제목</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 w-32">작성자</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 w-32">작성일</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {loading ? (
                            <tr><td colSpan="4" className="text-center py-10">로딩 중...</td></tr>
                        ) : inquiries.length === 0 ? (
                            <tr><td colSpan="4" className="text-center py-10 text-gray-500">문의 내역이 없습니다.</td></tr>
                        ) : (
                            inquiries.map((item) => (
                                <tr
                                    key={item._id}
                                    onClick={() => navigate(`/inquiries/${item._id}`)}
                                    className="hover:bg-indigo-50 cursor-pointer transition"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {item.reply ? (
                                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold">답변완료</span>
                                        ) : (
                                            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full font-bold">대기중</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {item.title} 🔒 {/* 비밀글 아이콘 느낌 */}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.writer?.name || '익명'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InquiryListPage;