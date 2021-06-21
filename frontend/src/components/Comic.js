import React from "react";
// import { useParams } from "react-router-dom";
// import { Link, useHistory } from "react-router-dom"
// import { ComicContext } from "../providers/ComicProvider";
import { Card, 
         Content,
         Tag
} from "react-bulma-components";
import "../index.css"

const Comic = ({ comic }) => {
    return (
        <>
            <Card style={{ width: '50rem', margin: 'auto', marginTop: '1rem' }}>
                <Card.Image
                    size='4by2'
                    src={`https://www.tfaw.com/media/catalog/product/F/E/${comic.diamond_id}.jpg`} 
                    // className='comic-cover-img'
                />
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