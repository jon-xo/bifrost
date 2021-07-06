import React, { useContext, useEffect, useState } from "react";
import { ReadingContext } from "../../providers/ReadingProvider";
import { Button, Icon, Modal } from "react-bulma-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import ReadingCard from "./ReadingCard";


const ReadingDeleteButton = ({ comicObject }) => {
    const { disableReadingButtons, setDisableReadingButton, deleteComicReadingList, getUsersReadingList } = useContext(ReadingContext);
    const [ buttonLoading, setButtonLoading ] = useState(false);
    const [ openModal, setModalOpen ] = useState(false);
    const userAccount = JSON.parse(sessionStorage.getItem("userAccount"));
    const userId = parseInt(userAccount?.id);
    
    const handleDelete = (event, comicId) => {
        event.preventDefault();
        setButtonLoading(true);
        setDisableReadingButton(true);
        // debugger
        deleteComicReadingList(comicId)
        .then(() => {
            getUsersReadingList(userId);
            setButtonLoading(false);
            setDisableReadingButton(false);
        })
    };

    return (
        <>
            <Modal 
                show={openModal}
                onClose={() => {
                    setModalOpen(!openModal)
                }}
            >
                <Modal.Card>
                    <Modal.Card.Header showClose>
                        <Modal.Card.Title>{comicObject.title}</Modal.Card.Title>
                    </Modal.Card.Header>
                    <Modal.Card.Body>
                        Are you sure you want to delete {comicObject.title} from your reading list?
                    </Modal.Card.Body>
                    <Modal.Card.Footer renderAs={Button.Group} align={"right"} hasAddons>
                        <Button color={"grey"}
                        onClick={() => {
                            setModalOpen(!openModal)
                        }}
                        >Cancel</Button>
                        <Button color={"danger"}
                        onClick={(e) => {
                            handleDelete(e, comicObject.id)
                        }}
                        >Delete</Button>
                    </Modal.Card.Footer>
                </Modal.Card>

            </Modal>
            {comicObject.read ?
                <Button
                    color="danger"
                    renderAs="span"                    
                    colorVariant="light"
                    loading={buttonLoading}
                    disabled={disableReadingButtons}
                    onClick={() => {
                        setModalOpen(true)}
                    }
                >
                    Delete
                </Button>
            :
                <Button
                    color="danger"
                    renderAs="span"
                    loading={buttonLoading}
                    disabled={disableReadingButtons}
                    onClick={() => {
                        setModalOpen(true)}
                    }
                >
                    Delete
                </Button>
            }
        </>
    )
};

export default ReadingDeleteButton;