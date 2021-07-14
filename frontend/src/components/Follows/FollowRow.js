import React from "react";
import ViewFollowsButton from "./ViewFollowsButton";

const FollowRow = ({ follower }) => {
    
    return (
        <tr>
            <th>{follower.listIndex}</th>
            <td>{follower.displayName}</td>
            <td>{follower.name}</td>
            {follower.userSummary ?
            <td>{follower.userSummary}</td>
            :
            <td>No user summary</td>
            }
            <td><ViewFollowsButton sUser={follower.id} /> </td>
        </tr>
    );
};

export default FollowRow;