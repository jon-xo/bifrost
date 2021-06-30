import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom"
import { ComicContext } from "../../providers/ComicProvider";
import { Content, Columns, Table, Notification } from "react-bulma-components";
import RandomIssue from "./RandomIssue";
import ComicRow from "./ComicRow";
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
                    <Notification backgroundColor='dark' className='newsstand-container' style={{height: '74.5vh'}}>
                        <Content size='medium' textAlign='center' >
                            <h2 className='home-header-dark'>News Stand</h2>
                            <Table
                                hoverable
                                selected
                                size="default"
                                striped
                                className='newstand-table'
                            >
                                <thead>
                                    <tr>
                                        <th>
                                            <abbr title="Release Number">
                                            #
                                            </abbr>
                                        </th>
                                        <th>
                                            Title
                                        </th>
                                        <th>
                                            Creators
                                        </th>
                                        <th>
                                            Publisher
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentComics.comics?.length > 0 ?
                                    currentComics.comics.map((comic, index) => {
                                        comic.listIndex = index + 1;
                                        comic.featured = undefined;
                                        if(comic?.diamond_id === focusComic?.diamond_id)
                                        {
                                            comic.featured = true;
                                            return <ComicRow key={comic.diamond_id} comic={comic} />
                                        }
                                        return <ComicRow key={comic.diamond_id} comic={comic} />
                                    })
                                    :
                                    <tr></tr>
                                    }
                                </tbody>
                            </Table>
                        </Content>
                    </Notification>
                </Columns.Column>
            </Columns>
        </>
    )
};

export default Home;