import React, { FC } from "react";
import "./CheckItem.css";
import { CloseOutlined } from "@ant-design/icons";
import { CharacterModal } from "../Types";
import { useDispatch } from "react-redux";
import { RemoveCharacter } from "../../store/Features/AddSearch";

interface Props {
  character: CharacterModal;
  onFocus: boolean;
}
const CheckItem: FC<Props> = ({ character, onFocus }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(RemoveCharacter(character.id));
  };

  return (
    <div className={`check-item ${onFocus ? "onFocus-check" : ""}`}>
      <p>{character.name}</p>
      <button onClick={handleDelete} className="check-item-delete">
        <CloseOutlined />
      </button>
    </div>
  );
};

export default CheckItem;
