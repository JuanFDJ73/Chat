import React from "react";
import { personAddOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import './SearchResults.css';

const SearchResults = ({ searchResults = [], handleAddContact }) => {
    return (
        <div className="search-results">
            {searchResults.map((user, idx) => (
                <div className="user-result" key={user.email || idx}>
                    <div className="user-info">
                        <div className="user-avatar-placeholder">
                            {user.displayName?.[0] || "?"}
                        </div>
                        <div className="user-details">
                            <div className="user-name">{user.displayName}</div>
                            <div className="user-email">{user.email}</div>
                        </div>
                    </div>
                    <button
                        className="add-button"
                        onClick={() => handleAddContact(user)}
                    >
                        <IonIcon icon={personAddOutline} />
                        Agregar
                    </button>
                </div>
            ))}
        </div>
    );
};

export default SearchResults;
