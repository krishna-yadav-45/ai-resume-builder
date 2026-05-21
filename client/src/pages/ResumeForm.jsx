import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../api';

function ResumeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    personalInfo: { name: '', email: '', phone: '', location: '', linkedin: '', github: '' },
    summary: '',
    skills: '',
    experience: [{ company: '', position: '', startDate: '', endDate: '', description: '' }],
    education: [{ institution: '', degree: '', startDate: '', endDate: '', grade: '' }],
    projects: [{ name: '', description: '', technologies: '', link: '' }],
  });

  useEffect(() => {
    if (id) fetchResume();
  }, [id]);

  const fetchResume = async () => {
    try {
      const { data } = await API.get(`/resume/${id}`);
      setForm({
        ...data,
        skills: data.skills.join(', '),
        experience: data.experience.length > 0 ? data.experience : [{ company: '', position: '', startDate: '', endDate: '', description: '' }],
        education: data.education.length > 0 ? data.education : [{ institution: '', degree: '', startDate: '', endDate: '', grade: '' }],
        projects: data.projects.length > 0 ? data.projects : [{ name: '', description: '', technologies: '', link: '' }],
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePersonalChange = (e) => setForm({ ...form, personalInfo: { ...form.personalInfo, [e.target.name]: e.target.value } });

  const handleArrayChange = (section, index, e) => {
    const updated = [...form[section]];
    updated[index][e.target.name] = e.target.value;
    setForm({ ...form, [section]: updated });
  };

  const addItem = (section, emptyItem) => setForm({ ...form, [section]: [...form[section], emptyItem] });

  const removeItem = (section, index) => {
    const updated = form[section].filter((_, i) => i !== index);
    setForm({ ...form, [section]: updated });
  };

  const handleSubmit = async () => {
    try {
      const payload = { ...form, skills: form.skills.split(',').map(s => s.trim()) };
      if (id) {
        await API.put(`/resume/${id}`, payload);
      } else {
        await API.post('/resume', payload);
      }
      navigate('/dashboard');
    } catch (err) {
      console.log(err);
    }
  };

  const inputStyle = { display: 'block', width: '100%', marginBottom: '10px', padding: '8px', boxSizing: 'border-box' };
  const cardStyle = { border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px', marginBottom: '12px' };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px' }}>
      <h2>{id ? 'Edit Resume' : 'Create Resume'}</h2>

      <h3>Basic Info</h3>
      <input name="title" placeholder="Resume Title" value={form.title} onChange={handleChange} style={inputStyle} />

      <h3>Personal Info</h3>
      <input name="name" placeholder="Full Name" value={form.personalInfo.name} onChange={handlePersonalChange} style={inputStyle} />
      <input name="email" placeholder="Email" value={form.personalInfo.email} onChange={handlePersonalChange} style={inputStyle} />
      <input name="phone" placeholder="Phone" value={form.personalInfo.phone} onChange={handlePersonalChange} style={inputStyle} />
      <input name="location" placeholder="Location" value={form.personalInfo.location} onChange={handlePersonalChange} style={inputStyle} />
      <input name="linkedin" placeholder="LinkedIn URL" value={form.personalInfo.linkedin} onChange={handlePersonalChange} style={inputStyle} />
      <input name="github" placeholder="GitHub URL" value={form.personalInfo.github} onChange={handlePersonalChange} style={inputStyle} />

      <h3>Summary</h3>
      <textarea name="summary" placeholder="Write a short summary..." value={form.summary} onChange={handleChange} rows={4} style={inputStyle} />

      <h3>Skills</h3>
      <input name="skills" placeholder="React, Node.js, MongoDB (comma separated)" value={form.skills} onChange={handleChange} style={inputStyle} />

      {/* Experience */}
      <h3>Experience</h3>
      {form.experience.map((exp, i) => (
        <div key={i} style={cardStyle}>
          <input name="company" placeholder="Company" value={exp.company} onChange={(e) => handleArrayChange('experience', i, e)} style={inputStyle} />
          <input name="position" placeholder="Position" value={exp.position} onChange={(e) => handleArrayChange('experience', i, e)} style={inputStyle} />
          <input name="startDate" placeholder="Start Date" value={exp.startDate} onChange={(e) => handleArrayChange('experience', i, e)} style={inputStyle} />
          <input name="endDate" placeholder="End Date" value={exp.endDate} onChange={(e) => handleArrayChange('experience', i, e)} style={inputStyle} />
          <textarea name="description" placeholder="Description" value={exp.description} onChange={(e) => handleArrayChange('experience', i, e)} rows={3} style={inputStyle} />
          {form.experience.length > 1 && (
            <button onClick={() => removeItem('experience', i)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button>
          )}
        </div>
      ))}
      <button onClick={() => addItem('experience', { company: '', position: '', startDate: '', endDate: '', description: '' })} style={{ marginBottom: '16px', padding: '8px 16px', background: '#e5e7eb', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
        + Add Experience
      </button>

      {/* Education */}
      <h3>Education</h3>
      {form.education.map((edu, i) => (
        <div key={i} style={cardStyle}>
          <input name="institution" placeholder="Institution" value={edu.institution} onChange={(e) => handleArrayChange('education', i, e)} style={inputStyle} />
          <input name="degree" placeholder="Degree" value={edu.degree} onChange={(e) => handleArrayChange('education', i, e)} style={inputStyle} />
          <input name="startDate" placeholder="Start Date" value={edu.startDate} onChange={(e) => handleArrayChange('education', i, e)} style={inputStyle} />
          <input name="endDate" placeholder="End Date" value={edu.endDate} onChange={(e) => handleArrayChange('education', i, e)} style={inputStyle} />
          <input name="grade" placeholder="Grade/CGPA" value={edu.grade} onChange={(e) => handleArrayChange('education', i, e)} style={inputStyle} />
          {form.education.length > 1 && (
            <button onClick={() => removeItem('education', i)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button>
          )}
        </div>
      ))}
      <button onClick={() => addItem('education', { institution: '', degree: '', startDate: '', endDate: '', grade: '' })} style={{ marginBottom: '16px', padding: '8px 16px', background: '#e5e7eb', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
        + Add Education
      </button>

      {/* Projects */}
      <h3>Projects</h3>
      {form.projects.map((proj, i) => (
        <div key={i} style={cardStyle}>
          <input name="name" placeholder="Project Name" value={proj.name} onChange={(e) => handleArrayChange('projects', i, e)} style={inputStyle} />
          <input name="technologies" placeholder="Technologies Used" value={proj.technologies} onChange={(e) => handleArrayChange('projects', i, e)} style={inputStyle} />
          <textarea name="description" placeholder="Description" value={proj.description} onChange={(e) => handleArrayChange('projects', i, e)} rows={3} style={inputStyle} />
          <input name="link" placeholder="Project Link" value={proj.link} onChange={(e) => handleArrayChange('projects', i, e)} style={inputStyle} />
          {form.projects.length > 1 && (
            <button onClick={() => removeItem('projects', i)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button>
          )}
        </div>
      ))}
      <button onClick={() => addItem('projects', { name: '', description: '', technologies: '', link: '' })} style={{ marginBottom: '16px', padding: '8px 16px', background: '#e5e7eb', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
        + Add Project
      </button>

      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button onClick={handleSubmit} style={{ padding: '10px 20px', background: '#4f46e5', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
          {id ? 'Update Resume' : 'Save Resume'}
        </button>
        <button onClick={() => navigate('/dashboard')} style={{ padding: '10px 20px', background: '#6b7280', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ResumeForm;