import React, { useContext, useEffect } from "react";
import { PublisherImage } from "../UtilityMethods";
import clsx from 'clsx';

const ComicRow = ({comic}) => {
    // -- GitHub Issue Ticket # 3 ---
    // [Home [Ticket #3]](https://github.com/jon-xo/bifrost/issues/4)
    // 
    // - PublisherImage returns Image component from matching string     
    //   in comicObject passed in comic prop
    // - if comic.featured key equals true, ComicRow returns tr element 
    //   with the is-selected class to highlight selected row    
    
    return (
        <>
            {comic.featured === true ?
            <tr className={clsx('is-selected', 'table-row--container')}>
                <th>{comic.listIndex}</th>
                <td>{comic.title}</td>
                <td>{comic.creators}</td>
                <td>{PublisherImage(comic.publisher)}</td>
            </tr>
            :
            <tr className="table-row--container" >
                <th>{comic.listIndex}</th>
                <td>{comic.title}</td>
                <td>{comic.creators}</td>
                <td>{PublisherImage(comic.publisher)}</td>
            </tr>

            }
        </>
    );
};

export default ComicRow;