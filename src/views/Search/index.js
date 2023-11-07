import axios from "axios";
import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineFilter, AiOutlineSearch } from "react-icons/ai";
import { Button } from "bootstrap";

const SearchPage = () => {
  const [recipe, setRecipe] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState(""); // State untuk menyimpan nilai sort
  const location = useLocation();
  const navigate = useNavigate();
  const initialSearchQuery = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    setSearchQuery(initialSearchQuery || "");
    fetchData(initialSearchQuery, sort);
  }, [initialSearchQuery, sort]);

  
  const fetchData = async (query, sortOption) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/recipes?search=${query}&sort=${sortOption}`
      );
      setRecipe(response.data.message.rows);
      console.log(response.data.message.rows);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = () => {
    fetchData(searchQuery, sort);
    navigate(`/search?query=${searchQuery}&sort=${sort}`);
  };

  const handleClick = (recipes_id) => {
    navigate(`/DetailRecipe/${recipes_id}`);
  };

  return (
    <React.Fragment>
      <div className="container mt-5 d-flex justify-content-between">
        <div className="input-group flex-grow-1 me-2 w-50">
          <input
            type="text"
            className="form-control form-control-md"
            placeholder="Search Restaurant Food"
            aria-label=".form-control-lg example"
            name="searchQuery"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="input-group-text px-3" onClick={handleSearch}>
            <AiOutlineSearch />
          </span>
        </div>
        <div className="d-flex align-items-center">
          <select
            className="form-select form-select-md"
            aria-label="Default select example"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="ASC">A-Z</option>
            <option value="DESC">Z-A</option>
          </select>
        </div>
      </div>

      <div className="container mt-3">
        <div className="row">
          {recipe.map((recipeItem) => (
            <div className="col-lg-4 mb-3" key={recipeItem.recipes_id}>
              <div
                className={`bg-primary ${style.recipesContainer}`}
                onClick={() => handleClick(recipeItem.recipes_id)}
              >
                <img
                  src={recipeItem.image}
                  alt="myrecipe"
                  className={style.recipes}
                />
                <h1 className={style.foodName}>{recipeItem.food_name}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default SearchPage;
