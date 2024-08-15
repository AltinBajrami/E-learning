import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './LessonsDetails.scss';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const LessonsDetails = () => {
  const [results, setResults] = useState([]);
  const query = useQuery();
  const searchQuery = query.get('q');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/lessons/search?q=${searchQuery}`);
        console.log('Search results:', response.data.results);
        setResults(response.data.results);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };
  
    fetchResults();
  }, [searchQuery]);

  return (
    <div className="lesson-search-results">
      <h1>Search Results for "{searchQuery}"</h1>
      {results.length > 0 ? (
        <ul className="lesson-search-results-result">
          {results.map((lesson) => (
            <li key={lesson._id} className="lesson">
              <h2>{lesson.title}</h2>
              <p>{lesson.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default LessonsDetails;
