import React from "react";
import "./SuggestionsListItem.scss";
import type { SongDetails } from "../../appData/models";
import MuzaButton from "../../controls/MuzaButton";
import SongDetailsView from "../songLineDisplays/SongDetails";

export type SuggestionsListItemProps = {
  details: SongDetails;
};

const SuggestionsListItem: React.FC<SuggestionsListItemProps> = ({
  details,
}) => {
  return (
    <div className="suggestions-list-item">
      <span className="left">
        <SongDetailsView details={details} />
      </span>
      <MuzaButton content="+" />
    </div>
  );
};

export default SuggestionsListItem;
