import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, setSortOption, fetchRecipes } from '../../redux/reducer/searchSlice';
import style from "./style.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import { useLocation, useNavigate  } from 'react-router-dom';

const SearchPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { searchQuery, sortOption, recipes, status, error } = useSelector((state) => state.search);
  

  useEffect(() => {
    dispatch(setSearchQuery(searchQuery));
    dispatch(fetchRecipes({ query: searchQuery, sortOption }));
  }, [searchQuery, sortOption, dispatch]);
  

  const handleSearch = () => {
    const updatedSearchQuery = encodeURIComponent(searchQuery);
    const updatedSortOption = encodeURIComponent(sortOption);
    navigate(`/search?query=${updatedSearchQuery}&sort=${updatedSortOption}`);
    dispatch(fetchRecipes({ query: searchQuery, sortOption }));
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
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          />
          <span className="input-group-text px-3" onClick={handleSearch}>
            <AiOutlineSearch />
          </span>
        </div>
        <div className="d-flex align-items-center">
          <select
            className="form-select form-select-md"
            aria-label="Default select example"
            value={sortOption}
            onChange={(e) => dispatch(setSortOption(e.target.value))}
          >
            <option value="">Sort By</option>
            <option value="ASC">A-Z</option>
            <option value="DESC">Z-A</option>
          </select>
        </div>
      </div>

      <div className="container mt-3">
        <div className="row">
          {status === 'loading' && <p>Loading...</p>}
          {status === 'failed' && <p>Error: {error}</p>}
          {status === 'succeeded' && recipes.map((recipeItem) => (
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
