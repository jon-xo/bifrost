import React, { useContext } from "react";
// import { useParams } from "react-router-dom";
// import { Link, useHistory } from "react-router-dom"
import { UserAccountContext } from "../../providers/UserAccountProvider";
import { 
    Card, 
    Content,
    Tag,
    Image
} from "react-bulma-components";
import { ReleaseComicImage, PublisherImage } from "../UtilityMethods";
import { ComicCardDate } from "../UtilityMethods";
import HandleBuildContent from "../Reading/ReadingContent";

const Comic = ({ comic }) => {
    const { isLoggedIn } = useContext(UserAccountContext);
    
    return (
        <>
            <Card style={{ width: '50rem', margin: 'auto', marginTop: '1rem' }}>
                {isLoggedIn ? 
                <Card.Header backgroundColor={"string"} py={2} px={2} justifyContent={"flex-end"} alignContent={"center"}>
                    <HandleBuildContent comicId={comic.diamond_id} />
                </Card.Header>
                : 
                <Card.Header />
                }
                <Image
                    size='4by2'
                    src={ReleaseComicImage(comic.diamond_id)}
                    fallback={ReleaseComicImage("fallback")}
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