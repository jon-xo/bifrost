import React from "react";
import { Container, Heading, Notification } from "react-bulma-components";
import { BfLoader } from "../UtilityMethods";
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
                            <p className="logo-header-sansSerif">bifröst</p>
                        </Heading>
                        <BfLoader />
                     </div>
                 </Notification>
            </Container>
        </>
    )
};

export default HomeLoader;