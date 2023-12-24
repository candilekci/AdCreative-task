import React, { FC, useEffect, useState } from "react";
import "./Item.css";
import { CharacterModal, NameModal } from "../Types";
import { CheckOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AddCharacter, RemoveCharacter } from "../../store/Features/AddSearch";
interface Props {
  character: CharacterModal;
  onFocus: boolean;
}
const Item: FC<Props> = ({ character, onFocus }) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState<boolean>(character.onSelect);
  const [name, setName] = useState<NameModal>({
    first: "",
    matched: "",
    after: "",
  });

  let characterList: CharacterModal[] = useSelector(
    (state: any) => state.CharacterList.CharacterList
  );
  let search: string = useSelector((state: any) => state.CharacterList.search);
  const itemCount: number = character.episode.length;

  useEffect(() => {
    const lowerCaseSearch = search.toLowerCase();
    const lowerCaseName = character.name.toLowerCase();
    const indexSearch = lowerCaseName.indexOf(lowerCaseSearch);

    setName({
      first: character.name.slice(0, indexSearch),
      matched: character.name.slice(indexSearch, indexSearch + search.length),
      after: character.name.slice(indexSearch + search.length),
    });
    setChecked(character.onSelect);
  }, [characterList, character.id, search, character.name, character.onSelect]);

  const handleCheck = () => {
    if (!checked) {
      dispatch(
        AddCharacter({
          ...character,
          onSelect: true,
        })
      );
      setChecked(true);
    } else {
      dispatch(RemoveCharacter(character.id));
      setChecked(false);
    }
  };

  return (
    <button
      onClick={handleCheck}
      className={`item ${onFocus ? "onFocus-Item" : ""}`}
      key={character.id}
    >
      <div className={`item-check ${checked ? "true-check" : ""}`}>
        {checked && <CheckOutlined />}
      </div>
      <img src={character.image} alt="" className="character-image" />
      <div className="character-info-cont">
        <div className="name-cont">
          <span className="character-name">{name.first}</span>
          <span className="character-name on-check">{name.matched}</span>
          <span className="character-name">{name.after}</span>
        </div>
        <span className="character-count">{itemCount} Episodes</span>
      </div>
    </button>
  );
};

export default Item;
