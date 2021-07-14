import React from "react";
import { Container, Content, Notification, Heading, Tile, Columns, Image, Tag, Button } from "react-bulma-components";
import { ComicCardDate, ReleaseComicImage, PublisherImage } from "../UtilityMethods";
import ReadingReadButton from "./ReadingReadButton";
import ReadingDeleteButton from "./ReadingDeleteButton";

const ReadingCard = ({ savedComic }) => {

    // const [ readStatus, setReadStatus ] = useState();

    let readStatus = "info";
    
    if (savedComic.read){
        readStatus = "success";
    } 
    
    if (savedComic.pbApiKey){
            // debugger
        return (
            <> 
                <Tile className={"reading-card--div"} kind={"child"} renderAs={Notification} color={readStatus} colorVariant={"light"}>
                    <div className="content">
                        <Columns>
                            <Columns.Column size={3}>
                                <Image
                                    size={128}
                                    src={savedComic.comicImage}
                                    fallback={ReleaseComicImage("fallback")}
                                className={"reading-cover--img"}
                                />
                            </Columns.Column>
                            <Columns.Column size={9}>
                                <Heading textAlign={"center"} size={4}>{savedComic.title}</Heading>
                                <Heading textAlign={"center"} subtitle size={6}>Release Date: {ComicCardDate(savedComic.publishDate)}</Heading>
                                <Tag.Group
                                    display={"flex"}
                                    justifyContent={"center"}
                                    
                                    hasAddons
                                    >
                                    <Tag 
                                        backgroundColor={"grey-light"}
                                        size={"normal"}
                                    >
                                        Type
                                    </Tag>
                                    <Tag 
                                        color={"link"}                                        
                                        size={"normal"}
                                    >
                                        Issue
                                    </Tag>
                                </Tag.Group>
                                <Content pull={"right"}>
                                    <Tag className={'reader-tag--div'} size="medium" justifyContent={"center"} alignContent={"center"}> {PublisherImage(savedComic.publisher)}</Tag>
                                </Content>
                            </Columns.Column>
                        </Columns>
                        <Columns>
                            <Columns.Column size={12}>
                                <Container fluid={"true"} mt={5}>
                                    <Button.Group align="right">
                                        <ReadingReadButton key={`read-btn--${savedComic.id}`} comicObject={savedComic} />
                                        <ReadingDeleteButton key={`delete-btn--${savedComic.id}`} comicObject={savedComic} />
                                    </Button.Group>
                                </Container>
                            </Columns.Column>
                        </Columns>
                    </div>
                </Tile>
            </>
        );
    } else if (savedComic.cvApiKey) {
        if (savedComic.comicType === "issue")
        {            
            return (
                <>
                    <Tile className={"reading-card--div"} kind={"child"} renderAs={Notification} color={readStatus} colorVariant={"light"}>
                        <div className="content">
                            <Columns>
                                <Columns.Column size={3}>
                                    <Image 
                                        size={128} 
                                        src={savedComic.comicImage}
                                        fallback={ReleaseComicImage("fallback")} 
                                        className={"reading-cover--img"}
                                    />
                                </Columns.Column>
                                <Columns.Column size={9}>
                                    <Heading textAlign={"center"} size={4}>{savedComic.title}</Heading>
                                    <Heading textAlign={"center"} subtitle size={6}>Release Date: {ComicCardDate(savedComic.publishDate)}</Heading>
                                    <Tag.Group
                                    display={"flex"}
                                    justifyContent={"center"}
                                    
                                    hasAddons
                                    >
                                    <Tag 
                                        backgroundColor={"grey-light"}
                                        size={"normal"}
                                    >
                                        Type
                                    </Tag>
                                    <Tag 
                                        color={"link"}
                                        size={"normal"}
                                    >
                                        Issue
                                    </Tag>
                                </Tag.Group>
                                    <Content pull={"right"}>
                                        {/* <Tag className={'tag--container'} size="medium" justifyContent={"center"} alignContent={"center"}> {PublisherImage(savedComic.publisher)}</Tag> */}
                                    </Content>
                                </Columns.Column>
                            </Columns>
                            <Columns>
                                <Columns.Column size={12}>
                                    <Container fluid={"true"} mt={5}>
                                        <Button.Group align="right">
                                            <ReadingReadButton key={`read-btn--${savedComic.id}`} comicObject={savedComic} />
                                            <ReadingDeleteButton key={`delete-btn--${savedComic.id}`} comicObject={savedComic} />
                                        </Button.Group>
                                    </Container>
                                </Columns.Column>
                            </Columns>
                        </div>
                    </Tile>
                </>
            );

        } else {
        return (
            <>
                <Tile className={"reading-card--div"} kind={"child"} renderAs={Notification} color={readStatus} colorVariant={"light"}>
                    <div className="content">
                        <Columns>
                            <Columns.Column size={3}>
                                <Image 
                                    size={128} 
                                    src={savedComic.comicImage}
                                    fallback={ReleaseComicImage("fallback")}
                                    className={"reading-cover--img"}
                                />
                            </Columns.Column>
                            <Columns.Column size={9}>
                                <Heading textAlign={"center"} size={4}>{savedComic.title}</Heading>
                                <Heading textAlign={"center"} subtitle size={6}>Release Date: {ComicCardDate(savedComic.publishDate)}</Heading>
                                <Tag.Group
                                    display={"flex"}
                                    justifyContent={"center"}
                                    
                                    hasAddons
                                    >
                                    <Tag 
                                        backgroundColor={"grey-light"}
                                        size={"normal"}
                                    >
                                        Type
                                    </Tag>
                                    <Tag 
                                        color={"primary"}
                                        colorVariant={"dark"}
                                        size={"normal"}
                                    >
                                        Volume
                                    </Tag>
                                </Tag.Group>
                                <Heading textAlign={"center"} subtitle size={6}>Issue Count: {parseInt(savedComic.altDescription)}</Heading>
                                <Content pull={"right"}>
                                    <Tag className={'tag--container'} size="medium" justifyContent={"center"} alignContent={"center"}> {PublisherImage(savedComic.publisher)}</Tag>
                                </Content>
                            </Columns.Column>
                        </Columns>
                        <Columns>
                            <Columns.Column size={12}>
                                <Container fluid={"true"} mt={5}>
                                    <Button.Group align="right">
                                        <ReadingReadButton key={`read-btn--${savedComic.id}`} comicObject={savedComic} />
                                        <ReadingDeleteButton key={`delete-btn--${savedComic.id}`} comicObject={savedComic} />
                                    </Button.Group>
                                </Container>
                            </Columns.Column>
                        </Columns>
                    </div>
                </Tile>
            </>
        );
        }
    } 
    return null;    
};

export default ReadingCard;