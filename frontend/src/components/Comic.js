import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Link, useHistory } from "react-router-dom"
import { ComicContext } from "../providers/ComicProvider";
import { Card, 
         CardImage, 
         CardContent,
         Content,
         Title,
         Tag
} from "react-bulma-components";

const Comic = ({ comic }) => {
    return (
        <Card>
            <CardImage src={`https://www.tfaw.com/media/catalog/product/F/E/${comic.diamond_id}.jpg`} />
            <CardContent>
                <Content>
                    <Title size={4}>{comic.title}</Title>
                    <Title subtitle size={6}>{comic.creators}</Title>
                    <Title subtitle size={7}>{comic.release_date}</Title>
                </Content>
                <Content>
                    <Tag rounded>{comic.publisher}</Tag>
                </Content>
                <Content>
                    {comic.description}
                </Content>
            </CardContent>
        </Card>
    );
};

export default Comic;