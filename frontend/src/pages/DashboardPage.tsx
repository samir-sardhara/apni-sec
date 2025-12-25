import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import issueService, { Issue } from '../services/issueService';
import authService from '../services/authService';

export default function DashboardPage() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterType, setFilterType] = useState<string>('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [user] = useState(authService.getStoredUser());

  const [newIssue, setNewIssue] = useState({
    type: 'cloud-security' as Issue['type'],
    title: '',
    description: '',
    priority: 'medium' as Issue['priority'],
    status: 'open' as Issue['status'],
  });

  useEffect(() => {
    fetchIssues();
  }, [filterType]);

  const fetchIssues = async () => {
    try {
      setLoading(true);
      const data = await issueService.getAllIssues(filterType || undefined);
      setIssues(data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch issues');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateIssue = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await issueService.createIssue(newIssue);
      setIssues([created, ...issues]);
      setShowCreateModal(false);
      setNewIssue({
        type: 'cloud-security',
        title: '',
        description: '',
        priority: 'medium',
        status: 'open',
      });
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create issue');
    }
  };

  const handleDeleteIssue = async (id: number) => {
    if (!confirm('Are you sure you want to delete this issue?')) return;

    try {
      await issueService.deleteIssue(id);
      setIssues(issues.filter((issue) => issue.id !== id));
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete issue');
    }
  };

  const handleUpdateStatus = async (id: number, status: Issue['status']) => {
    try {
      const updated = await issueService.updateIssue(id, { status });
      setIssues(issues.map((issue) => (issue.id === id ? updated : issue)));
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update issue');
    }
  };

  const getTypeLabel = (type: Issue['type']) => {
    const labels: Record<Issue['type'], string> = {
      'cloud-security': 'Cloud Security',
      'reteam-assessment': 'Reteam Assessment',
      'vapt': 'VAPT',
    };
    return labels[type];
  };

  const getPriorityColor = (priority?: Issue['priority']) => {
    const colors: Record<string, string> = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      critical: 'bg-red-100 text-red-800',
    };
    return colors[priority || 'medium'] || colors.medium;
  };

  const getStatusColor = (status?: Issue['status']) => {
    const colors: Record<string, string> = {
      open: 'bg-blue-100 text-blue-800',
      'in-progress': 'bg-purple-100 text-purple-800',
      resolved: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800',
    };
    return colors[status || 'open'] || colors.open;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome back{user?.firstName ? `, ${user.firstName}` : ''}!
            </h1>
            <p className="text-gray-600">Manage your security issues and track their progress</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                + Create New Issue
              </button>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              >
                <option value="">All Types</option>
                <option value="cloud-security">Cloud Security</option>
                <option value="reteam-assessment">Reteam Assessment</option>
                <option value="vapt">VAPT</option>
              </select>
            </div>
            <Link
              to="/profile"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              View Profile →
            </Link>
          </div>

          {/* Issues List */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              <p className="mt-4 text-gray-600">Loading issues...</p>
            </div>
          ) : issues.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No issues found</h3>
              <p className="mt-2 text-gray-500">Get started by creating your first security issue.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {issues.map((issue) => (
                <div key={issue.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
                          {getTypeLabel(issue.type)}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(issue.priority)}`}>
                          {issue.priority || 'medium'}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(issue.status)}`}>
                          {issue.status || 'open'}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{issue.title}</h3>
                      <p className="text-gray-600 mb-4">{issue.description}</p>
                      <p className="text-sm text-gray-500">
                        Created: {new Date(issue.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <select
                        value={issue.status || 'open'}
                        onChange={(e) => handleUpdateStatus(issue.id, e.target.value as Issue['status'])}
                        className={`px-3 py-2 rounded-lg text-sm font-medium border ${getStatusColor(issue.status)}`}
                      >
                        <option value="open">Open</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
                      </select>
                      <button
                        onClick={() => handleDeleteIssue(issue.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Create Issue Modal */}
          {showCreateModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Create New Issue</h2>
                    <button
                      onClick={() => setShowCreateModal(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <form onSubmit={handleCreateIssue} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Issue Type *
                      </label>
                      <select
                        value={newIssue.type}
                        onChange={(e) => setNewIssue({ ...newIssue, type: e.target.value as Issue['type'] })}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      >
                        <option value="cloud-security">Cloud Security</option>
                        <option value="reteam-assessment">Reteam Assessment</option>
                        <option value="vapt">VAPT</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title *
                      </label>
                      <input
                        type="text"
                        value={newIssue.title}
                        onChange={(e) => setNewIssue({ ...newIssue, title: e.target.value })}
                        required
                        maxLength={200}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                        placeholder="Enter issue title"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description *
                      </label>
                      <textarea
                        value={newIssue.description}
                        onChange={(e) => setNewIssue({ ...newIssue, description: e.target.value })}
                        required
                        maxLength={5000}
                        rows={6}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                        placeholder="Describe the security issue..."
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Priority
                        </label>
                        <select
                          value={newIssue.priority}
                          onChange={(e) => setNewIssue({ ...newIssue, priority: e.target.value as Issue['priority'] })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                          <option value="critical">Critical</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Status
                        </label>
                        <select
                          value={newIssue.status}
                          onChange={(e) => setNewIssue({ ...newIssue, status: e.target.value as Issue['status'] })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                        >
                          <option value="open">Open</option>
                          <option value="in-progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                          <option value="closed">Closed</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button
                        type="submit"
                        className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                      >
                        Create Issue
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowCreateModal(false)}
                        className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

