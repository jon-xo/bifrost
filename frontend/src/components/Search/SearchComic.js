import React from "react";
// import { useParams } from "react-router-dom";
// import { Link, useHistory } from "react-router-dom"
// import { ComicContext } from "../providers/ComicProvider";
import { Card, 
         Content,
         Tag
} from "react-bulma-components";
import { StringArray, PublisherImage } from "../UtilityMethods";
import { ComicCardDate } from "../UtilityMethods";
import "../../index.css"

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
                        {comic?.cover_date !== undefined ?
                            <h6 className="title is-6">{ComicCardDate(comic?.cover_date)}</h6>
                            :
                            <h6 className="title is-6">Start date: {comic?.start_year}</h6>
                        }
                        {comic.count_of_issues !== undefined ?
                            <h6 className="title is-6">Number of issues: {comic?.count_of_issues}</h6>
                            :
                            <></>
                        }
                    </Content>
                    <Content>
                        {comic?.publisher?.name ?
                            <Tag className={'tag--container'}>{PublisherImage(comic?.publisher.name)}</Tag>
                            :
                            <></>
                        }
                    </Content>
                    <Content>
                    {comic.description === undefined || comic.description === null || comic.description === "" ?
                        "Summary unavailable"
                        :
                        <div dangerouslySetInnerHTML={{__html:[`${comic.description}`]}}></div>
                    }   
                    </Content>
                </Card.Content>
            </Card>
        </>
    );
};

export default SearchComic;