import React from "react";
// import { useParams } from "react-router-dom";
// import { Link, useHistory } from "react-router-dom"
// import { ComicContext } from "../providers/ComicProvider";
import { Card, 
         Content,
         Tag,
         Image
} from "react-bulma-components";
import stringArray from "./StrMethods";
import "../index.css"

const Comic = ({ comic }) => {
    return (
        <>
            <Card style={{ width: '50rem', margin: 'auto', marginTop: '1rem' }}>
                <Image
                    size='4by2'
                    src={`https://www.tfaw.com/media/catalog/product/${stringArray(comic.diamond_id, 1)}/${stringArray(comic.diamond_id, 2)}/${comic.diamond_id}.jpg`}
                    fallback='https://www.tfaw.com/media/catalog/product/placeholder/default/missingimage600.png'                
                />
                {/* <img
                    // size='4by2'
                    src={`https://www.tfaw.com/media/catalog/product/${stringArray(comic.diamond_id, 1)}/${stringArray(comic.diamond_id, 2)}/${comic.diamond_id}.jpg`}
                    onError={(e) => {imageUnavail(e)}}
                    // src={comicCover(comic.diamond_id)}
                    // src={`https://static.wikia.nocookie.net/marvel_dc/images/f/fb/${titleEdit(comic.title)}.jpg`}                     
                /> */}
                <Card.Content>
                    <Content>
                        <h4 className="title is-4">{comic.title}</h4>
                        <h6 className="title is-6">{comic.creators}</h6>
                        <h6 className="title is-6">{comic.release_date}</h6>
                    </Content>
                    <Content>
                        <Tag rounded>{comic.publisher}</Tag>
                    </Content>
                    <Content>
                        {comic.description}
                    </Content>
                </Card.Content>
            </Card>
        </>
    );
};

export default Comic;