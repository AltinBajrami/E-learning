import React, { useState, useEffect } from 'react';
import search_icon from '../../../assets/images/search_icon.png';
import x_delete from '../../../assets/images/x_delete.png';
import { useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import moment from 'moment';

const pages = [
    { name: "Dashboard", route: "/dashboard" },
    { name: "Classes", route: "/dashboard/classes" },
    { name: "Profile", route: "/dashboard/my-profile" },
    { name: "Events", route: "/dashboard/events" },
    { name: "Notifications", route: "/dashboard/notifications" },
    { name: "Chat", route: "/dashboard/chat" },
];

const SearchBar = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [currentDate, setCurrentDate] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setCurrentDate(moment().format('dddd, D MMMM YYYY'));
    }, []);

    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        if (term.length >= 3) {
            const results = pages.filter((page) =>
                page.name.toLowerCase().includes(term.toLowerCase())
            );
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    };

    const handleClearSearch = () => {
        setSearchTerm("");
        setSearchResults([]);
    };

    const handleClick = (route) => {
        navigate(route);
    };

    return (
        <header className="header">
            <input
                type="text"
                className="search-bar"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <img className="search-icon" src={search_icon} alt="Search Icon" />
            {searchTerm && (
                <img
                    className="x-delete"
                    src={x_delete}
                    alt="Clear Search Icon"
                    onClick={handleClearSearch}
                />
            )}
            {searchTerm.length >= 3 && (
                <div className="search-results">
                    {searchResults.length > 0 ? (
                        <ul>
                            {searchResults.map((result) => (
                                <li key={result.route} onClick={() => handleClick(result.route)}>
                                    {result.name}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div>No results found.</div>
                    )}
                </div>
            )}
            <div className="date-picker">{currentDate}</div>
            <div className="view-toggle">
                <button>Card</button>
                <button>List</button>
            </div>
            <div className="toggleMenu">
                <FaBars onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
            </div>
        </header>
    );
};

export default SearchBar;
