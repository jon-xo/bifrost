import React, { useContext, useEffect, useState } from "react";
import { ReadingContext } from "../../providers/ReadingProvider";
import { Button, Icon } from "react-bulma-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import ReadingCard from "./ReadingCard";


const ReadingReadButton = ({ comicObject }) => {
    const { disableReadingButtons, setDisableReadingButton, toggleReadStatus, getUsersReadingList } = useContext(ReadingContext);
    const [ buttonLoading, setButtonLoading ] = useState(false);
    // const [ updateComic, setUpdateComic ] = useState({});
    const userAccount = JSON.parse(sessionStorage.getItem("userAccount"));
    const userId = parseInt(userAccount?.id);
    
    const handleMarkRead = (event, comicId) => {
        event.preventDefault();
        setButtonLoading(true);
        setDisableReadingButton(true);
        const readStatus = !comicObject.read;
        // debugger
        toggleReadStatus(comicId, readStatus)
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