import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(300);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isVegan, setIsVegan] = useState(false);

  const [filteredData, setFilteredData] = useState([]);

  const API_KEY = 'c3c0a8011b8144dba584d89f7e8a7821';

  const fetchRecipes = async (searchQuery) => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${searchQuery}&number=10&maxPrice=${maxPrice}${isVegetarian ? '&diet=vegetarian' : ''}${isVegan ? '&diet=vegan' : ''}`
      );
      setFilteredData(response.data.results);
    } catch (error) {
      console.error("Error fetching the data from Spoonacular API:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=15`
        );
        setData(response.data.recipes);
      } catch (error) {
        console.error("Error fetching the data from Spoonacular API:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (query) {
      fetchRecipes(query);
    } else {
      // Apply filters on the initial data when the search query is empty
      const filteredRecipes = data.filter((recipe) => 
        recipe.pricePerServing <= maxPrice &&
        (!isVegetarian || recipe.vegetarian) &&
        (!isVegan || recipe.vegan)
      );
      setFilteredData(filteredRecipes);
    }
  }, [query, maxPrice, isVegetarian, isVegan, data]);

  const handleSliderChange = (e) => {
    setMaxPrice(e.target.value);
  };

  const handleVegetarianChange = (e) => {
    setIsVegetarian(e.target.checked);
  };

  const handleVeganChange = (e) => {
    setIsVegan(e.target.checked);
  };

  return (
    <div className="App">
      <div className="centered-container">
        <h1>Who is Hungry?</h1>

        <div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a recipe..."
          />
        </div>

        <div>
          <label>Max Price: ${maxPrice}</label>
          <input
            type="range"
            min="0"
            max="300"
            step="1"
            value={maxPrice}
            onChange={handleSliderChange}
          />
        </div>

        <div>
          <label>Vegetarian:</label>
          <input
            type="checkbox"
            checked={isVegetarian}
            onChange={handleVegetarianChange}
          />
        </div>
        <div>
          <label>Vegan:</label>
          <input
            type="checkbox"
            checked={isVegan}
            onChange={handleVeganChange}
          />
        </div>

        <ul>
          {filteredData.map((recipe) => (
            <li key={recipe.id}>
              <h2>{recipe.title}</h2>
              <img src={recipe.image} alt={recipe.title} width="200" />
              <div dangerouslySetInnerHTML={{ __html: recipe.summary }}></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;



