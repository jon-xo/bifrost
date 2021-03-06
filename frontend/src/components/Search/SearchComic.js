import React, { useContext } from "react";
import { UserAccountContext } from "../../providers/UserAccountProvider";
import { Card, 
         Content,
         Tag
} from "react-bulma-components";
import { PublisherImage } from "../UtilityMethods";
import { ComicCardDate } from "../UtilityMethods";
import HandleBuildContent from "../Reading/ReadingContent";

const SearchComic = ({ ...props }) => {
    // 
    // ---- GitHub Issue Ticket # 5 ----
    // [Search [Ticket #5]](https://github.com/jon-xo/bifrost/issues/5)
    // 
    // - SearchComic.js returns results from both search API endpoints,
    // ternary operators are used to display returned results regardless of source
    // - Added div to display html returned by API provider
    // 

    const { isLoggedIn } = useContext(UserAccountContext);

    const comic = props.comic;
    const inReading = props.inReading;
    
    return (
        <>
            <Card style={{ width: '50rem', margin: 'auto', marginTop: '1rem' }}>
            {isLoggedIn ? 
                <Card.Header backgroundColor={"string"} py={2} px={2} justifyContent={"flex-end"} alignContent={"center"}>
                    <HandleBuildContent comicId={comic.id} inReading={inReading} />
                </Card.Header>
                : 
                <Card.Header />
            }
                <Card.Image
                    size='4by2'
                    src={comic.image.super_url} 
                />
                <Card.Content>
                    <Content>
                        {comic?.name === null ?
                            <h4 className="title is-4">{comic?.volume.name}</h4>
                            :
                            <h4 className="title is-4">{comic.name}</h4>
                        }
                        {comic.count_of_issues !== undefined ?
                            <h6 className="subtitle is-6">Number of issues {comic?.count_of_issues}</h6>
                            :
                            <h6 className="subtitle is-6">Issue #{comic?.issue_number}</h6>
                        }
                        {comic?.cover_date !== undefined ?
                            <h6 className="subtitle is-6">Published {ComicCardDate(comic?.cover_date)}</h6>
                            :
                            <h6 className="subtitle is-6">Start date {comic?.start_year}</h6>
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