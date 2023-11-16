import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchQuery,
  setSortOption,
  fetchRecipes,
} from "../../redux/reducer/searchSlice";
import style from "./style.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";

const SearchPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    searchQuery,
    sortOption,
    recipes,
    status,
    currentPage,
    totalPages,
    error,
  } = useSelector((state) => state.search);
  console.log(totalPages);
  console.log(currentPage)
  useEffect(() => {
    const page = new URLSearchParams(location.search).get("page") || 1;

    dispatch(setSearchQuery(searchQuery));
    dispatch(
      fetchRecipes({ query: searchQuery, sortOption, page: parseInt(page) })
    );
  }, [searchQuery, sortOption, location.search, dispatch]);
 

  const handleSearch = () => {
    const encodedQuery = encodeURIComponent(searchQuery);
    const encodedSort = encodeURIComponent(sortOption);
    dispatch(fetchRecipes({ query: encodedQuery, sortOption: encodedSort, page: 1 }));

    navigate (
      `/search?query=${encodedQuery}&sort=${encodedSort}&page=1`
    )
  };

  const handlePagination = (newPage) => {
    const updatedSearchQuery = encodeURIComponent(searchQuery);
    const updatedSortOption = encodeURIComponent(sortOption);
    const parsedPage = parseInt(newPage, 10) || 1;

    dispatch(
      fetchRecipes({
        query: updatedSearchQuery,
        sortOption: updatedSortOption,
        page: parsedPage,
      })
    );
    navigate(
      `/search?query=${updatedSearchQuery}&sort=${updatedSortOption}&page=${parsedPage}`
    );
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
          {status === "loading" && <p>Loading...</p>}
          {status === "failed" && <p>Error: {error}</p>}
          {status === "succeeded" &&
            recipes.map((recipeItem) => (
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
        {status === "succeeded" && recipes.length > 0 && (
          <div className="d-flex justify-content-center mt-3">
            {/* Left arrow */}
            <button
              className="btn btn-sm btn-outline-warning mx-1"
              onClick={() => handlePagination(currentPage - 1)}
              disabled={currentPage === 1}
            >
              {"<"}
            </button>
            

            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`btn btn-sm ${
                  currentPage === index + 1
                    ? "btn-warning color"
                    : "btn-outline-warning"
                } mx-1 px-3`}
                onClick={() => handlePagination(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            {/* Right arrow */}
            <button
              className="btn btn-sm btn-outline-warning mx-1"
              onClick={() => handlePagination(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              {">"}
            </button>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default SearchPage;
