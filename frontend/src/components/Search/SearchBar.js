import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { SearchComicContext } from "../../providers/SearchComicProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Icon, Form, Button } from "react-bulma-components";
import { faSearch, faBox, faBoxes } from '@fortawesome/free-solid-svg-icons'

const SearchBar = () => {
    // 
    // ---- GitHub Issue Ticket # 5 ----
    // [Search [Ticket #5]](https://github.com/jon-xo/bifrost/issues/5)
    // 
    // - Added isLoggedIn state and logout method from UserAccountProvider to check
    // Firebase Status
    // - Created dedicated methods for Login and Registration Dropdowns
    // - Added ternary to display logout/settings button comboniation,
    // when succesful login/registration has occured.
    // 

    const history = useHistory();

    const queryObject = {
        placeholder: "Find a comic issues...",
        queryType: "Issues",
        icon: "faBox"
    };
    
    const [ queryString, setQueryString ] = useState("");
    const { searchIssues, searchVolumes } = useContext(SearchComicContext);
    const [ searchType, setSearchType ] = useState(queryObject);
    const [ searchDisabled, setSearchDisabled ] = useState(true);
    const [ searchLoading, setSearchLoading ] = useState(false);

    const handleSearch = (event) => {
        event.preventDefault();
        setSearchLoading(true);
        if( queryString !== undefined && queryString !== "" )
        {
            // const encodedQuery = encodeURIComponent(queryString)
            if(searchType?.queryType === "Volumes"){
                // debugger
                searchVolumes(queryString)
                .then(() => {
                    history.push("/search/volumes")
                    setSearchLoading(false);
                })
            } else if (searchType?.queryType === "Issues"){
                // debugger
                searchIssues(queryString)
                .then(() => {
                    history.push("/search/issues")
                    setSearchLoading(false);
                })
            }
        }
    };

    const handleQuery = (event) => {
        event.preventDefault();
        let activeQuery = undefined;

        if(event.target.value === "Issues") {
            setSearchType(queryObject);
        } else if (event.target.value === "Volumes") {
            activeQuery = {
                placeholder: "Find a comic series...",
                queryType: "Volumes",
                icon: "faBoxes"
            };
            setSearchType(activeQuery);
        }
    };

    const handleActiveSearch = (value) => {
        if(value !== undefined && value !== ""){
            setSearchDisabled(false);
            setQueryString(value)
        } else {
            setSearchDisabled(true);
        }
    };

    return (
        <>
            <form>
                <Form.Field kind="addons">
                    <Form.Control>
                        <Icon align="left" >
                            <FontAwesomeIcon className='search-icon' icon={faSearch} />
                        </Icon>
                        <Form.Input placeholder={searchType?.placeholder} onChange={(e) => {handleActiveSearch(e.target.value)}}/>
                    </Form.Control>
                    <Form.Control>
                        <Form.Select
                            color={"info"}
                            colorVariant={"light"}
                            value={searchType.queryType}
                            textColor={"info"}                         
                            onChange={(e) => handleQuery(e)}
                        >
                            <option value="Issues">Issues</option>
                            <option value="Volumes">Volumes</option>
                        </Form.Select>
                    </Form.Control>
                    <Form.Control >
                        <Icon align="left" >
                            {searchType.icon === "faBox" ?
                                <FontAwesomeIcon className='search-icon' icon={faBox} />
                                :                                
                                <FontAwesomeIcon className='search-icon' icon={faBoxes} />
                            }
                        </Icon>
                        <Button 
                            isStatic={searchDisabled}
                            loading={searchLoading}
                            color='info' 
                            onClick={(e) => {handleSearch(e)}} 
                            className='search-button--span'
                        >
                            Search
                        </Button>
                    </Form.Control>
                </Form.Field>
            </form>
        </>
    );
};

export default SearchBar;