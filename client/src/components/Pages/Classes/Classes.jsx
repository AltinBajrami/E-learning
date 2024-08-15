import axios from 'axios'
import React, { useState } from 'react'
import { Link, useLoaderData, useOutletContext } from 'react-router-dom';
import './classes.scss'
import { toast } from 'react-toastify';
import Modal from '../../molecules/Modal/Modal'
import Pagination from '../../molecules/Pagination/Pagination';

export const loader = async () => {
    const { data } = await axios.get('http://localhost:4000/api/v1/classes', { withCredentials: true })
    return data?.classes;
}

const Classes = () => {
    const { user } = useOutletContext();
    const classes = useLoaderData();
    const [filteredClasses, setFilteredClasses] = useState(classes || []);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 6; // Changed to 5

    const filterClasses = (searchTerm) => {
        setFilteredClasses(classes.filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase())));
        setCurrentPage(0); // Reset to the first page when a search is performed
    }

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:4000/api/v1/classes/${deleteId}`, { withCredentials: true });
            setFilteredClasses(filteredClasses.filter(c => c._id !== deleteId));
            toast.success('Class deleted successfully');
            setIsModalOpen(false)
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        }
    }

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const getPaginatedClasses = () => {
        const offset = currentPage * itemsPerPage;
        return filteredClasses.slice(offset, offset + itemsPerPage);
    };

    return (
        <div className='classComponent'>
            <div className="searchClasses">
                <div className="search">
                    <label>Search classes:</label>
                    <input type="text" onChange={(e) => filterClasses(e.target.value)} />
                </div>
                {user?.role === 'superadmin' &&
                    <Link className='glow-on-hover' to={'create'}>Create Class</Link>
                }
            </div>
            <div className="classes">
                {getPaginatedClasses().map(c => (
                    <article key={c._id} className='class'>
                        <div className="titleInfo">
                            <Link to={c._id} className='classTitle'><h2>{c.title}</h2></Link>
                            {user.role === 'superadmin' && (
                                <>
                                    <button onClick={() => { setDeleteId(c._id); setIsModalOpen(true); }}>Delete</button>
                                    <Modal isOpen={isModalOpen} title={'Are you sure?'} onClose={() => setIsModalOpen(false)}
                                        onConfirm={handleDelete} />
                                </>
                            )}
                        </div>
                        <h5>{c.description.slice(0, 150)}  {c.description.length > 150 ? <span>...</span> : null} </h5>
                        <div className="info">
                            <p>instructor: <span>{c?.instructor?.firstName} {c?.instructor?.lastName}</span></p>
                            <p>students: <span>{c?.students?.length}</span></p>
                        </div>
                        <div className="actions">
                            {user.role === 'superadmin' &&
                                <>
                                    <Link to={'editStudents/' + c._id} className='glow-on-hover'>Edit Students</Link>
                                    <Link to={'update/' + c._id} className='glow-on-hover'>Update</Link>
                                </>
                            }

                            <Link to={c._id} className='glow-on-hover'>View</Link>

                            {c?.instructor?._id === user.userId && <Link to={`/dashboard/create-quiz/${c._id}`}
                                className="glow-on-hover createBtn">Create quiz</Link>}
                        </div>
                    </article>
                ))}
            </div>
            <Pagination
                pageCount={Math.ceil(filteredClasses.length / itemsPerPage)}
                onPageChange={handlePageClick}
                currentPage={currentPage}
            />
        </div>
    )
}

export default Classes
