import React, { useContext, useState } from "react";
import { ReadingContext } from "../../providers/ReadingProvider";
import { Button} from "react-bulma-components";
import { getUserDetail, currentDate } from "../UtilityMethods";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
// import ReadingCard from "./ReadingCard";


const ReadingReadButton = ({ comicObject }) => {
    const { disableReadingButtons, setDisableReadingButton, toggleReadStatus, getUsersReadingList } = useContext(ReadingContext);
    const [ buttonLoading, setButtonLoading ] = useState(false);

    let userId = getUserDetail();
    
    const handleMarkRead = (event, comicId) => {
        event.preventDefault();
        setButtonLoading(true);
        setDisableReadingButton(true);

        const updatedComic = {...comicObject};
        updatedComic.read = !comicObject.read;
        updatedComic.lastUpdated = currentDate;        

        toggleReadStatus(comicId, updatedComic)
        .then(() => {
            getUsersReadingList(userId);
            setButtonLoading(false);
            setDisableReadingButton(false);
        })
    };

    return (
        <>
            {comicObject.read ?
                <Button
                    color="success"
                    renderAs="span"                    
                    inverted
                    loading={buttonLoading}
                    disabled={disableReadingButtons}
                    onClick={(e) => {
                        handleMarkRead(e, comicObject.id)
                    }}
                >
                    Mark unread
                </Button>
            :
                <Button
                    color="success"
                    renderAs="span"
                    loading={buttonLoading}
                    disabled={disableReadingButtons}
                    onClick={(e) => {
                        handleMarkRead(e, comicObject.id)
                    }}
                >
                    Mark as read
                </Button>
            }
        </>
    )
};

export default ReadingReadButton;