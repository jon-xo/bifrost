import React, { useContext } from "react";
import { UserAccountContext } from "../../providers/UserAccountProvider";
import { PublisherImage } from "../UtilityMethods";
import HandleBuildContent from "../Reading/ReadingContent";
import clsx from 'clsx';

const ComicRow = ({...props}) => {
    // -- GitHub Issue Ticket # 3 ---
    // [Home [Ticket #3]](https://github.com/jon-xo/bifrost/issues/4)
    // 
    // - PublisherImage returns Image component from matching string     
    //   in comicObject passed in comic prop
    // - if comic.featured key equals true, ComicRow returns tr element 
    //   with the is-selected class to highlight selected row    

    const { isLoggedIn } = useContext(UserAccountContext);

    const comic = props.comic;
    const inReading = props.inReading;
    
    return (
        <>
            {comic.featured === true ?
            <tr className={clsx('is-selected', 'table-row--container')}>
                <th>{comic.listIndex}</th>
                <td>{comic.title}</td>
                <td>{comic.creators}</td>
                <td>{PublisherImage(comic.publisher)}</td>
                {isLoggedIn ? 
                    <td><HandleBuildContent comicId={comic.diamond_id} inReading={inReading}/></td>
                : 
                    <td></td>
                }
            </tr>
            :
            <tr className="table-row--container" >
                <th>{comic.listIndex}</th>
                <td>{comic.title}</td>
                <td>{comic.creators}</td>
                <td>{PublisherImage(comic.publisher)}</td>
                {isLoggedIn ? 
                    <td><HandleBuildContent comicId={comic.diamond_id} inReading={inReading}/></td>
                : 
                    <td></td>
                }
            </tr>

            }
        </>
    );
};

export default ComicRow;