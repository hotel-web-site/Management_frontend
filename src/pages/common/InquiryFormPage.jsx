import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosConfig';
import '../../styles/inquiry.scss'; // 👈 SCSS 임포트!

const InquiryFormPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ title: '', content: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/inquiries', formData);
            alert("등록되었습니다!");
            navigate('/owner/inquiries');
        } catch (error) { alert("실패했습니다."); }
    };

    return (
        <div className="inquiry-container">
            <div className="page-header">
                <h2>✍️ 1:1 문의 작성</h2>
            </div>

            <div className="inquiry-form-card">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>제목</label>
                        <input
                            type="text"
                            placeholder="제목을 입력해주세요"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>내용</label>
                        <textarea
                            placeholder="문의 내용을 자세히 적어주세요"
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        />
                    </div>
                    <div className="btn-group">
                        <button type="button" className="btn-cancel" onClick={() => navigate(-1)}>취소</button>
                        <button type="submit" className="btn-submit">등록하기</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InquiryFormPage;