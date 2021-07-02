import React from "react";
// import { useParams } from "react-router-dom";
// import { Link, useHistory } from "react-router-dom"
// import { ComicContext } from "../providers/ComicProvider";
import { 
    Card, 
    Content,
    Tag,
    Image
} from "react-bulma-components";
import { StringArray, PublisherImage } from "../UtilityMethods";
import { ComicCardDate } from "../UtilityMethods";
// import "../index.css"

const Comic = ({ comic }) => {
    return (
        <>
            <Card style={{ width: '50rem', margin: 'auto', marginTop: '1rem' }}>
                <Image
                    size='4by2'
                    src={`https://www.tfaw.com/media/catalog/product/${StringArray(comic.diamond_id, 1)}/${StringArray(comic.diamond_id, 2)}/${comic.diamond_id}.jpg`}
                    fallback='https://www.tfaw.com/media/catalog/product/placeholder/default/missingimage600.png'                
                />
                <Card.Content>
                    <Content>
                        <h4 className="title is-4">{comic.title}</h4>
                        <h6 className="title is-6">{comic.creators}</h6>
                        <h6 className="title is-6">{ComicCardDate(comic.release_date)}</h6>
                    </Content>
                    <Content>
                        <Tag className={'tag--container'} size="medium">{PublisherImage(comic.publisher)}</Tag>
                    </Content>
                    <Content>
                        {comic.description === undefined || comic.description === "" ?
                            "Summary unavailable"
                            :
                            comic.description
                        }
                    </Content>
                </Card.Content>
            </Card>
        </>
    );
};

export default Comic;