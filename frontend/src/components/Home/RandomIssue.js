import React, { useContext, useEffect } from "react";
// import { useHistory } from "react-router-dom"
// import { ComicContext } from "../providers/ComicProvider";
import { Box, Block, Image } from "react-bulma-components";
import stringArray from "../StrMethods";
import clsx from 'clsx';

const RandomIssue = ({comic}) => {

    const comicCover = `https://www.tfaw.com/media/catalog/product/${stringArray(comic.diamond_id, 1)}/${stringArray(comic.diamond_id, 2)}/${comic.diamond_id}.jpg`;
    const fallbackCover = 'https://www.tfaw.com/media/catalog/product/placeholder/default/missingimage600.png';
    
    return (
    <>
        <Box className={'featured-comic--container'}>
            <Block>
                <Image 
                    src={comicCover}
                    fallback={fallbackCover}                    
                />
            </Block>
        </Box>
    </>
    );
};

export default RandomIssue;