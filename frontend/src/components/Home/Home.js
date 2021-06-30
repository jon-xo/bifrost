import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom"
import { ComicContext } from "../../providers/ComicProvider";
import { Content, Columns, Table, Notification } from "react-bulma-components";
import RandomIssue from "./RandomIssue";
import ComicRow from "./ComicRow";
import "../../index.css"

const Home = (params) => {
    // -- GitHub Issue Ticket # 3 ---
    // [Home [Ticket #3]](https://github.com/jon-xo/bifrost/issues/4)
    // 
    // - comicRandomizer selects an random interger within the range
    //   of the currentComics list.
    // - featuredIndex returns the index value of the currently 
    //   featured comic object
    // - featuredIndexArray is a callback method to remove the current
    //   object from the active array and re-adds object to index[0],
    //   once the array is modified, that array is mapped and 
    //   the ComicRow is returned inside JSX table
    
    const { currentComics, getCurrentComics } = useContext(ComicContext);
    const [ focusComic, setFocusComic ] = useState(undefined);
    const [ focusedComics, setFocusedComics ] = useState([]);
    
    const comicRandomizer = (array) => {
        const randomIndex = Math.floor(Math.random() * array.length);
        const selectedComic = array[randomIndex];
        return selectedComic;
    };

    const featuredIndex = (array, comicObject) => {        
        const targetObject = array.find(a => a.diamond_id === comicObject?.diamond_id)
        const matchedIndex = array.indexOf(targetObject);
        return matchedIndex;
    };

    const featuredIndexArray = (array, comicIndex, comic) => {        
        if (comicIndex > 0) {
            array.splice(comicIndex, 1);
            array.unshift(comic);            
        }
        return array;
    };

        
    useEffect(() => {
        getCurrentComics()
    }, [])

    useEffect(() => {
        if(currentComics.comics?.length > 0)
        {
            const newComic = comicRandomizer(currentComics?.comics)
            setFocusComic(newComic);
            const newIndex = featuredIndex(currentComics.comics, newComic);
            const finalComicArray = featuredIndexArray(currentComics.comics, newIndex, newComic)
            setFocusedComics(finalComicArray)           
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
                            <h2 className='home-header-dark'>Newsstand</h2>
                            <Table
                                hoverable
                                selected
                                size="default"
                                striped
                                className='newstand-table'
                                textAlign='center'
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
                                        {focusedComics?.map((comic, index) => {
                                                // debugger
                                                comic.listIndex = index + 1;
                                                comic.featured = undefined;
                                                if(comic?.diamond_id === focusComic?.diamond_id)
                                                {
                                                    comic.featured = true;
                                                    return <ComicRow key={comic.diamond_id} comic={comic} />
                                                }
                                                return <ComicRow key={comic.diamond_id} comic={comic} />
                                            })                                        
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