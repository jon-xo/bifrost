import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { ComicContext } from "../../providers/ComicProvider";
import { Container, Content, Heading, Notification } from "react-bulma-components";
import { ReleaseDate, WeekStart, BfLoader } from "../UtilityMethods";
import clsx from 'clsx';

const HomeLoader = () => {
    return (
        <>
            <Container 
                max={true}
                breakpoint={"fluid"}
                display={"flex"}
                justifyContent={"center"} 
                alignContent={"center"}
                className={clsx("loading-container--div", "fade")}
                mt={5}
            >
                 <Notification 
                    color={"text"} 
                    light={false}
                    className={"loading-notification--div"}
                    // display={"flex"}
                    // justifyContent={"center"} 
                    // alignItems={"space-around"}
                 >
                     <div className={"loading-alignment"}>
                        <Heading
                            size={2}
                            weight={"bold"}
                            display={"block"}
                        >
                            bifröst
                        </Heading>
                        <BfLoader />
                     </div>
                 </Notification>
            </Container>
        </>
    )
};

export default HomeLoader;