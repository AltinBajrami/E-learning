import { useState, useEffect } from 'react';
import 'chart.js/auto';
import './Dashboard.scss';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { Line } from 'react-chartjs-2';
import Pagination from '../../molecules/Pagination/Pagination';
import customFetch from '../../utilities/customFetch';
import { toast } from 'react-toastify';
import { format } from 'timeago.js';
import LoggedInUsersChart from '../../molecules/UsersLoggedInPast24Hours/LoggedInUsersChart';
import axios from 'axios';


function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5; // Changed to 5
  const [contacts, setContacts] = useState([]);
  const { user } = useOutletContext();

  const fetchStudents = async () => {
    try {
      const { data } = await customFetch('/users/users-based-on-role')
      const response = await axios.get('http://localhost:4000/api/contact');
      setContacts(response?.data?.contacts || []);

      if (Array.isArray(data.users)) {
        const studentData = data.users;
        setStudents(studentData);
      } else {
        console.error('Expected data.users to be an array but received:', data.users);
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg)
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);



  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const getPaginatedStudents = () => {
    const offset = currentPage * itemsPerPage;
    return students.slice(offset, offset + itemsPerPage);
  };




  return (
    <>
      <section className="tasks-section">
        <table className="tasks-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>ID</th>
              <th>last login</th>
            </tr>
          </thead>
          <tbody>
            {getPaginatedStudents().map(student => (
              <tr key={student._id}>
                <td>{student.firstName} {student.lastName}</td>
                <td>{student.email || 'N/A'}</td>
                <td>{student._id || 'N/A'}</td>
                <td>{student?.lastLogin ? format(student.lastLogin) : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          pageCount={Math.ceil(students.length / itemsPerPage)}
          onPageChange={handlePageClick}
          currentPage={currentPage}
        />
      </section>
      <div className="row">
        <section className="productivity-section">
          <h2>Productivity</h2>
          <LoggedInUsersChart />
        </section>
        {(user.role === 'superadmin' || user.role === 'teacher') && (
          <section className="projects-section">
            <h2>Submitted contacts:</h2>
            {
              contacts.map(c => {
                return <div className='project-card'>
                  <p>Name: <span>{c.name}</span></p>
                  <p>email: <span>{c.email}</span></p>
                  <p>description: <span>{c.description}</span></p>
                  <p>createdAt: <span>{new Date(c.createdAt).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}</span></p>
                </div>
              })
            }
          </section>
        )}

        {(user.role !== 'superadmin' && user.role !== 'teacher') && (
          <section className="projects-section">
            <h2>Projects in progress:</h2>
            <div className="project-card">
              <p>Feedback | Bug | Design System</p>
              <p>Improve cards readability</p>
              <div className="project-meta">
                <p>12 comments</p>
                <p>0 files</p>
              </div>
            </div>
            <div className="project-card">
              <p>Dashboard | Research</p>
              <p>Proof it works</p>
              <div className="project-meta">
                <p>3 comments</p>
                <p>0 files</p>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}

export default Dashboard;