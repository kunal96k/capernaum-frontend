import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal, 
  Edit2, 
  Trash2, 
  Building2, 
  Users, 
  Wallet 
} from 'lucide-react';
import './DepartmentMaster.css';

const API_BASE_URL = 'http://localhost:8081/api/departments';

const DepartmentMaster = () => {
  const [departments, setDepartments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentDept, setCurrentDept] = useState({
    name: '',
    head: '',
    staffCount: 0,
    budget: 0,
    status: 'Active'
  });

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_BASE_URL);
      if (!response.ok) throw new Error('Failed to fetch departments');
      const data = await response.ok ? await response.json() : [];
      setDepartments(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const method = currentDept.id ? 'PUT' : 'POST';
      const url = currentDept.id ? `${API_BASE_URL}/${currentDept.id}` : API_BASE_URL;
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentDept)
      });

      if (!response.ok) throw new Error('Failed to save department');
      
      await fetchDepartments();
      setIsModalOpen(false);
      resetForm();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this department?')) return;
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete department');
      fetchDepartments();
    } catch (err) {
      alert(err.message);
    }
  };

  const resetForm = () => {
    setCurrentDept({ name: '', head: '', staffCount: 0, budget: 0, status: 'Active' });
  };

  if (loading) return <div className="loading">Loading Departments...</div>;

  return (
    <div className="dept-container">
      <div className="dept-header">
        <div className="header-title">
          <h1>Department Master</h1>
          <p>Organize and manage your organizational structure</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary">
            <Download size={18} />
            Export
          </button>
          <button className="btn-primary" onClick={() => { resetForm(); setIsModalOpen(true); }}>
            <Plus size={18} />
            Add Department
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon purple">
            <Building2 size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Total Departments</span>
            <span className="stat-value">{departments.length}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue">
            <Users size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Total Staff</span>
            <span className="stat-value">
              {departments.reduce((acc, curr) => acc + (curr.staffCount || 0), 0)}
            </span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">
            <Wallet size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Total Budget</span>
            <span className="stat-value">
              ₹{departments.reduce((acc, curr) => acc + (curr.budget || 0), 0).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div className="table-container">
        <div className="table-controls">
          <div className="search-box">
            <Search size={18} />
            <input type="text" placeholder="Search departments..." />
          </div>
          <button className="btn-filter">
            <Filter size={18} />
            Filters
          </button>
        </div>

        <table className="dept-table">
          <thead>
            <tr>
              <th>Dept ID</th>
              <th>Department Name</th>
              <th>Head of Dept</th>
              <th>Staff Count</th>
              <th>Budget</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept) => (
              <tr key={dept.id}>
                <td><span className="dept-code">{dept.code}</span></td>
                <td>
                  <div className="dept-name-cell">
                    <div className="dept-avatar">{dept.name.charAt(0)}</div>
                    {dept.name}
                  </div>
                </td>
                <td>{dept.head}</td>
                <td>{dept.staffCount}</td>
                <td>₹{dept.budget?.toLocaleString()}</td>
                <td>
                  <span className={`status-badge ${dept.status?.toLowerCase()}`}>
                    {dept.status}
                  </span>
                </td>
                <td className="actions-cell">
                  <button className="icon-btn" title="Edit" onClick={() => { setCurrentDept(dept); setIsModalOpen(true); }}>
                    <Edit2 size={16} />
                  </button>
                  <button className="icon-btn delete" title="Delete" onClick={() => handleDelete(dept.id)}>
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{currentDept.id ? 'Edit' : 'Add'} Department</h2>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>
            <form onSubmit={handleSave}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Department Name</label>
                  <input 
                    type="text" 
                    required 
                    value={currentDept.name}
                    onChange={(e) => setCurrentDept({...currentDept, name: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Head of Dept</label>
                  <input 
                    type="text" 
                    required 
                    value={currentDept.head}
                    onChange={(e) => setCurrentDept({...currentDept, head: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Staff Count</label>
                  <input 
                    type="number" 
                    value={currentDept.staffCount}
                    onChange={(e) => setCurrentDept({...currentDept, staffCount: parseInt(e.target.value)})}
                  />
                </div>
                <div className="form-group">
                  <label>Budget (₹)</label>
                  <input 
                    type="number" 
                    value={currentDept.budget}
                    onChange={(e) => setCurrentDept({...currentDept, budget: parseFloat(e.target.value)})}
                  />
                </div>
                <div className="form-group full-width">
                  <label>Status</label>
                  <select 
                    value={currentDept.status}
                    onChange={(e) => setCurrentDept({...currentDept, status: e.target.value})}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Under Review">Under Review</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Save Department</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentMaster;
