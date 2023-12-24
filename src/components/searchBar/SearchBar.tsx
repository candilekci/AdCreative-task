import React, { useState, useEffect } from "react";
import "./SearchBar.css";
import CheckItem from "../checkItem/CheckItem";
import ListItem from "../listItem/ListItem";
import { CharacterModal } from "../Types";
import { useSelector, useDispatch } from "react-redux";
import { SetSearch } from "../../store/Features/AddSearch";
import { RemoveCharacter, AddCharacter } from "../../store/Features/AddSearch";
const SearchBar = () => {
  const [characters, setCharacters] = useState([] as CharacterModal[]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [checkFocus, setCheckFocus] = useState<number | null>(null);
  const [checkFocusList, setCheckFocusList] = useState<number | null>(null);
  const dispatch = useDispatch();
  const characterList: CharacterModal[] = useSelector(
    (state: any) => state.CharacterList.CharacterList
  );
  let searchCounter: number = 0;
  useEffect(() => {
    setLoading(true);
    setError(null);
    if (search) {
      fetch(`https://rickandmortyapi.com/api/character/?name=${search}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error || data.results.length === 0) {
            setError(data.error);
            setCharacters([]);
          } else {
            const updatedCharacters = data.results.map(
              (character: CharacterModal) => {
                character.onSelect = characterList.some(
                  (existingCharacter) => existingCharacter.id === character.id
                );
                return character;
              }
            );

            setCharacters(updatedCharacters);
          }
          setLoading(false);
        });
    } else {
      setCharacters([]);
      setLoading(false);
    }
    dispatch(SetSearch(search));
  }, [dispatch, search, characterList]);

  const handleKey = (event: { key: any }) => {
    searchCounter = search.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      if (searchCounter === 0) {
        if (event.key === "ArrowLeft") {
          if (checkFocus === null) {
            setCheckFocus(characterList.length - 1);
          } else if (checkFocus > 0 && checkFocus < characterList.length) {
            setCheckFocus(checkFocus - 1);
          } else if (checkFocus === 0) {
          }
        } else if (event.key === "ArrowRight") {
          if (checkFocus === null) {
            setCheckFocus(null);
          } else if (checkFocus >= 0 && checkFocus < characterList.length - 1) {
            setCheckFocus(checkFocus + 1);
          } else if (checkFocus === characterList.length - 1) {
            setCheckFocus(null);
          }
        }
      } else {
        setCheckFocus(null);
      }
    } else if (event.key === "ArrowDown" || event.key === "Tab") {
      if (checkFocusList === null) {
        setCheckFocusList(0);
      } else if (
        checkFocusList >= 0 &&
        checkFocusList < characters.length - 1
      ) {
        setCheckFocusList(checkFocusList + 1);
      } else if (checkFocusList === characters.length - 1) {
        setCheckFocusList(0);
      }
    } else if (event.key === "ArrowUp") {
      if (checkFocusList === null) {
        setCheckFocusList(null);
      } else if (checkFocusList > 0 && checkFocusList < characters.length) {
        setCheckFocusList(checkFocusList - 1);
      } else if (checkFocusList === 0) {
        setCheckFocusList(characters.length - 1);
      }
    } else if (event.key === "Enter") {
      if (checkFocusList !== null) {
        const isCharacterChecked = characterList.some(
          (item: CharacterModal) => item.id === characters[checkFocusList].id
        );
        if (!isCharacterChecked) {
          dispatch(
            AddCharacter({ ...characters[checkFocusList], onSelect: true })
          );
          setCheckFocusList(null);
        } else {
          dispatch(RemoveCharacter(characters[checkFocusList].id));
          setCheckFocusList(null);
        }
      }
    } else if (event.key === "Backspace" || event.key === "Delete") {
      if (checkFocus !== null) {
        dispatch(RemoveCharacter(characterList[checkFocus].id));
        setCheckFocus(null);
      }
    }
  };

  return (
    <div>
      <div onKeyDown={handleKey} className="search-bar">
        {characterList.map((character, index) => (
          <CheckItem
            key={character.id}
            character={character}
            onFocus={index === checkFocus ? true : false}
          />
        ))}
        <input
          type="text"
          className="search-bar-text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {characters && characters.length > 0 && search.length > 0 && (
        <div className="list">
          <ListItem
            checkFocusList={checkFocusList}
            characterList={characters}
          />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
