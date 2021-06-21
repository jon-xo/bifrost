import React from "react";
// import { useParams } from "react-router-dom";
// import { Link, useHistory } from "react-router-dom"
// import { ComicContext } from "../providers/ComicProvider";
import { Card, 
         Content,
         Tag
} from "react-bulma-components";
import "../index.css"

const SearchComic = ({ comic }) => {
    return (
        <>
            <Card style={{ width: '50rem', margin: 'auto', marginTop: '1rem' }}>
                <Card.Image
                    size='4by2'
                    src={comic.image.super_url} 
                />
                <Card.Content>
                    <Content>
                        <h4 className="title is-4">{comic.name}</h4>
                        <h6 className="title is-6">{comic.cover_date}</h6>
                    </Content>
                    <Content>
                        <Tag rounded>{comic.publisher}</Tag>
                    </Content>
                    <Content>
                        <div dangerouslySetInnerHTML={{__html:[`${comic.description}`]}}></div>
                    </Content>
                </Card.Content>
            </Card>
        </>
    );
};

export default SearchComic;