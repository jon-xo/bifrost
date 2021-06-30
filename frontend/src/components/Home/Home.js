import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom"
import { ComicContext } from "../../providers/ComicProvider";
import { Content, Columns, Box, Block, Image, Notification } from "react-bulma-components";
import RandomIssue from "./RandomIssue";
import "../../index.css"

const Home = (params) => {
    const { currentComics, getCurrentComics } = useContext(ComicContext);
    const [ focusComic, setFocusComic ] = useState(undefined);
    
    const comicRandomizer = (array) => {
        const randomIndex = Math.floor(Math.random() * array.length);
        const selectedComic = array[randomIndex];
        return selectedComic;
    };
        
    useEffect(() => {
        getCurrentComics()
    }, [])

    useEffect(() => {
        if(currentComics.comics?.length > 0)
        {
            const newComic = comicRandomizer(currentComics?.comics)
            setFocusComic(newComic);
        }
    }, [currentComics])

    return (
        <>
            <Columns>
                <Columns.Column size={12}></Columns.Column>
                <Columns.Column size={6}>
                    <Notification color='text' textAlign='center' style={{height: '74.5vh'}}>
                        <Content size='medium'>
                            <h2>Featured Comic</h2>
                        </Content>
                        {
                            focusComic !== undefined ? 
                            <RandomIssue comic={focusComic} />
                            :
                            <></>
                        }
                    </Notification>
                </Columns.Column>
                <Columns.Column>
                    <Notification backgroundColor='dark' style={{height: '74.5vh'}}>
                        <Content size='medium' textAlign='center'>
                            <h2 className='home-header-dark'>News Stand</h2>
                        </Content>
                    </Notification>
                </Columns.Column>
            </Columns>
        </>
    )
};

export default Home;