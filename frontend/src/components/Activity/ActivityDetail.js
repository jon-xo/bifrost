import React, { useContext, useEffect, useState } from "react";
import { UserAccountContext } from "../../providers/UserAccountProvider";
import { Button, Icon, Image } from "react-bulma-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons'
import { blueDark, amberA, amberDark, Slate, slate } from '@radix-ui/colors';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import { styled, keyframes } from '@stitches/react';
import { getAvatarImage, getUserDetail } from "../UtilityMethods";


const scaleIn = keyframes({
    '0%': { opacity: 0, transform: 'scale(0)' },
    '100%': { opacity: 1, transform: 'scale(1)' },
});

const StyledContent = styled(HoverCardPrimitive.Content, {
    borderRadius: 4,
    padding: 15,
    fontSize: 15,
    lineHeight: 1,
    color: amberA.amberA4,
    backgroundColor: blueDark.blue1,
    width: 300,
    boxShadow:
      '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
    transformOrigin: 'var(--radix-hover-card-content-transform-origin)',
    animation: `${scaleIn} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
});

const DivStyle = styled('div', { display: 'flex' });
const DivCenter = styled('div', { display: 'flex', justifyContent: 'center' });
const HoverText = styled('span', { textDecoration: 'none', textDecorationLine: 'none' });

const Text = styled('div', {
    margin: 0,
    color: amberDark.amber9,
    fontSize: 17,
    lineHeight: '19px',
    variants: {
      faded: {
        true: { color: slate.slate8 },
      },
      bold: {
        true: { color: amberDark.amber9, fontWeight: 600 },
      },
    },
  });

export const HoverCard = HoverCardPrimitive.Root;
export const HoverCardTrigger = HoverCardPrimitive.Trigger;
export const HoverCardContent = StyledContent;

const ActivityDetail = ({ ...props }) => {

    const btnMarginTop = props?.props.mt;
    const padding = props?.props.paddingless;
    const currentUser = props?.props.userObject;

    const { DeleteFollow } = useContext(UserAccountContext);
    const [ buttonLoading, setButtonLoading ] = useState(false);
        
    const handleDeleteFollow = (e, targetUserId) => {
        e.preventDefault();
        setButtonLoading(true);
        const activeUser = getUserDetail();

        DeleteFollow(activeUser, targetUserId)
        .then(() => {
            setButtonLoading(false);
        })
    };
    
    return (
        <HoverCard 
            // open={displayCard} 
            openDelay={0}
        >
            <HoverCardTrigger
                as={"span"}
            >
                <Button                    
                    color={"warning"}
                    // outlined
                    inverted={true}
                    size={"small"}
                    mr={1}
                    mt={btnMarginTop}
                    paddingless={padding}
                    rounded={true}
                >
                    <Icon>
                        <FontAwesomeIcon icon={faCheckSquare} />
                    </Icon>
                    <HoverText>Followed</HoverText>
                </Button>
            </HoverCardTrigger>
            <HoverCardContent side="top" sideOffset={5}>
                <DivStyle css={{ flexDirection: 'column', gap: 15 }}>
                    <DivStyle css={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Text bold>{currentUser.name}</Text>
                        <DivStyle css={{ justifyItems: 'end', gap: 15, marginLeft: '25%'}}>
                            <Image
                                src={getAvatarImage(currentUser.imageLocation)}
                                size={96}
                            />
                        </DivStyle>                    
                    </DivStyle>
                    <DivStyle css={{ flexDirection: 'row' }}>
                            <Text faded>@{currentUser.displayName}</Text>
                    </DivStyle>
                    <DivStyle css={{ flexDirection: 'row' }}>
                        {currentUser?.summary ?
                            <Text bold>{currentUser.summary}</Text>
                            :
                            <Text faded>No user summary</Text>
                        }                    
                    </DivStyle>
                </DivStyle>
                <DivStyle css={{ flexDirection: 'column', gap: 15 }}>
                    <span></span>
                </DivStyle>
                <DivCenter css={{gap: 15}}>
                    <DivStyle css={{gap: 5, marginTop: '5%'}}>
                        <Button
                            color={"danger"}
                            rounded={"true"}
                            loading={buttonLoading}
                            size={"small"}
                            onClick={(e) => {
                                handleDeleteFollow(e, currentUser.id)
                            }}
                            >
                            Unfollow
                        </Button>
                    </DivStyle>
                </DivCenter>
            </HoverCardContent>
        </HoverCard>

    );
};

export default ActivityDetail;
