import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';
import API from '../api';
import ResumePDF from '../components/ResumePDF';

function Dashboard() {
  const [resumes, setResumes] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const { data } = await API.get('/resume');
      setResumes(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/resume/${id}`);
      fetchResumes();
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Welcome, {user?.name} 👋</h2>
        <button onClick={handleLogout} style={{ padding: '8px 16px', background: '#ef4444', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
          Logout
        </button>
      </div>

      <button onClick={() => navigate('/resume/new')} style={{ marginTop: '20px', padding: '10px 20px', background: '#4f46e5', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
        + Create New Resume
      </button>

      <div style={{ marginTop: '30px' }}>
        {resumes.length === 0 ? (
          <p>No resumes yet. Create your first one!</p>
        ) : (
          resumes.map((resume) => (
            <div key={resume._id} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: 0 }}>{resume.title}</h3>
                <p style={{ margin: '4px 0', color: '#6b7280' }}>{new Date(resume.createdAt).toLocaleDateString()}</p>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => navigate(`/resume/${resume._id}`)} style={{ padding: '8px 16px', background: '#4f46e5', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
                  Edit
                </button>
                <PDFDownloadLink
                  document={<ResumePDF resume={resume} />}
                  fileName={`${resume.title}.pdf`}
                >
                  {({ loading }) => (
                    <button style={{ padding: '8px 16px', background: '#10b981', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
                      {loading ? 'Loading...' : 'Download PDF'}
                    </button>
                  )}
                </PDFDownloadLink>
                <button onClick={() => handleDelete(resume._id)} style={{ padding: '8px 16px', background: '#ef4444', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;