import React, { FC } from "react";
import "./ListItem.css";
import { CharacterModal } from "../Types";
import Item from "../item/Item";
interface Props {
  characterList: CharacterModal[];
  checkFocusList: number | null;
}
const ListItem: FC<Props> = ({ characterList, checkFocusList }) => {
  return (
    <div className="list-item">
      {characterList.map((character, index) => (
        <div key={character.id}>
          <Item
            character={character}
            onFocus={index === checkFocusList ? true : false}
          />
        </div>
      ))}
    </div>
  );
};

export default ListItem;
