import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosConfig';
import '../../styles/inquiry.scss'; // 👈 SCSS 임포트 필수!

const InquiryListPage = () => {
    const navigate = useNavigate();
    const [inquiries, setInquiries] = useState([]);
    const userRole = localStorage.getItem('userRole');

    useEffect(() => { fetchInquiries(); }, []);

    const fetchInquiries = async () => {
        try {
            const response = await axiosInstance.get('/inquiries');
            if (response.data && Array.isArray(response.data.inquiries)) {
                setInquiries(response.data.inquiries);
            } else {
                setInquiries([]);
            }
        } catch (error) {
            console.error(error);
            setInquiries([]);
        }
    };

    return (
        <div className="inquiry-container">
            <div className="page-header">
                <h2>💬 1:1 문의사항</h2>
                {userRole !== 'admin' && (
                    <button className="btn-write" onClick={() => navigate('/owner/inquiries/new')}>
                        ✍️ 문의하기
                    </button>
                )}
            </div>

            <div className="inquiry-table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th width="10%">상태</th>
                            <th width="50%">제목</th>
                            <th width="20%">작성자</th>
                            <th width="20%">작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inquiries.length === 0 ? (
                            <tr><td colSpan="4" className="empty-message">등록된 문의 내역이 없습니다.</td></tr>
                        ) : (
                            inquiries.map((item) => (
                                <tr key={item._id} onClick={() => navigate(`/owner/inquiries/${item._id}`)}>
                                    <td>
                                        <span className={`badge ${item.reply ? 'done' : 'wait'}`}>
                                            {item.reply ? '답변완료' : '대기중'}
                                        </span>
                                    </td>
                                    <td>{item.title} <span className="secret-icon">🔒</span></td>
                                    <td>{item.writer?.name || '익명'}</td>
                                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
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