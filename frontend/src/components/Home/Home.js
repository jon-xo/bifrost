import React, { useContext, useEffect, useState } from "react";
// import { useHistory } from "react-router-dom"
import { ComicContext } from "../../providers/ComicProvider";
import { ReadingContext } from "../../providers/ReadingProvider";
import { Content, Columns, Table, Notification } from "react-bulma-components";
import { ReleaseDate, WeekStart, getUserDetail } from "../UtilityMethods";
import HomeLoader from "./HomeLoader";
import RandomIssue from "./RandomIssue";
import ComicRow from "./ComicRow";
import clsx from 'clsx';


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
    
    const { currentComics, getCurrentComics, isLoading } = useContext(ComicContext);
    const { getUsersReadingList, allReading, refreshState, setRefreshState } = useContext(ReadingContext);
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

    let userId = getUserDetail();
    const newComicDay = ReleaseDate(currentComics);
        
    useEffect(() => {
        getCurrentComics();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if(userId){
            getUsersReadingList(userId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if(refreshState){
            getUsersReadingList(userId)
            .then(() => {
                setRefreshState(false);
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshState])

    useEffect(() => {
        if(currentComics.comics?.length > 0)
        {
            const newComic = comicRandomizer(currentComics?.comics)
            setFocusComic(newComic);
            const newIndex = featuredIndex(currentComics.comics, newComic);
            const finalComicArray = featuredIndexArray(currentComics.comics, newIndex, newComic)
            setFocusedComics(finalComicArray)           
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentComics])

    return (
        <>
            <div>
                {isLoading ?
                    <HomeLoader />
                    :
                    <Columns breakpoint="tablet">
                    <Columns.Column size={12}></Columns.Column>
                    <Columns.Column
                        mobile={{
                            narrow: false,
                            offset: 0,
                            size: 12,
                            textAlign: 'center',
                            textSize: 3
                        }}
                        tablet={{
                            narrow: false,
                            offset: 0,
                            size: 12,
                            display: 'grid',
                            justifyContent: 'center'
                        }}
                        desktop={{
                            narrow: false,
                            offset: 0,
                            size: 6,
                        }}
                    >
                        <Notification className={clsx("notification-col--container")} color='text' textAlign='center' >
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
                    <Columns.Column
                        mobile={{
                            narrow: false,
                            offset: 0,
                            size: 12,
                            textAlign: 'center',
                            textSize: 3
                        }}
                        tablet={{
                            narrow: false,
                            offset: 0,
                            size: 12
                        }}
                        desktop={{
                            narrow: false,
                            offset: 0,
                            size: 6
                        }}
                    >
                        <Notification justifyContent={"center"} className={clsx("notification-col--container, newsstand-container")} backgroundColor='dark'>
                            <Content size='medium' textAlign='center' >
                                <h2 className='home-header-dark'>Newsstand</h2>
                                {newComicDay === undefined ?
                                <h4 className='home-header-dark'>Week of ... </h4>
                                :
                                <h4 className='home-header-dark'>Week of {WeekStart(newComicDay)} </h4>
                                }
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
                                                comic.listIndex = index + 1;
                                                comic.featured = undefined;
                                                if(userId && allReading?.length > 0){
                                                    if(comic?.diamond_id === focusComic?.diamond_id)
                                                    {
                                                        comic.featured = true;
                                                        if(allReading?.find((r) => r.pbApiKey === comic.diamond_id)){
                                                            return <ComicRow key={comic.diamond_id} comic={comic} inReading={true} inverted={false}/>
                                                        } else {
                                                            return <ComicRow key={comic.diamond_id} comic={comic} inReading={false} inverted={false}/>                                                            
                                                        }
                                                    } else {
                                                        if(allReading?.find((r) => r.pbApiKey === comic.diamond_id)){
                                                            return <ComicRow key={comic.diamond_id} comic={comic} inReading={true} inverted={false}/>
                                                        } else {
                                                            return <ComicRow key={comic.diamond_id} comic={comic} inReading={false} inverted={false}/>
                                                        }
                                                    }

                                                } else {
                                                    if(comic?.diamond_id === focusComic?.diamond_id)
                                                    {
                                                        comic.featured = true;
                                                        return <ComicRow key={comic.diamond_id} comic={comic} />
                                                    }
                                                    return <ComicRow key={comic.diamond_id} comic={comic} />
                                                }
                                                })
                                            }
                                    </tbody>
                                </Table>
                            </Content>
                        </Notification>
                    </Columns.Column>
                </Columns>}
            </div>
        </>
    )
};

export default Home;