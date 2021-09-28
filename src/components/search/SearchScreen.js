import React from "react";
import { useLocation } from "react-router";
import { heroes } from "../../data/heroes";
import { useForm } from "../../hooks/useForm";
import { HeroCard } from "../heroes/HeroCard";
import queryString from "query-string";
import { getHeroesByName } from "../../selectores/getHeroeByName";

export const SearchScreen = ({ history }) => {
  const location = useLocation();
  console.log(queryString.parse(location.search));

  const { q = "" } = queryString.parse(location.search);

  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`?q=${search}`);
  };
  const [{ search }, handleInputChange, reset] = useForm({
    search: q,
  });

  const herosFilterer = getHeroesByName(q);

  return (
    <div>
      <h1>Search Screen</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Search Form</h4>
          <hr />

          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Find youy hero..."
              className="form-control"
              name="search"
              value={search}
              onChange={handleInputChange}
              autoComplete="off"
            />

            <button
              type="submit"
              className="btn m-1 btn-block btn-outline-primary"
            >
              Search...
            </button>
          </form>
        </div>
        <div className="col-7">
          <h4>Results:</h4>
          <hr />

          {q === "" && <div className="alert alert-info">Search a Hero</div>}
          {(q !== "" && herosFilterer.length ===0) &&  <div className="alert alert-danger">Hero not found</div>}
          {herosFilterer.map((hero) => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </div>
  );
};
