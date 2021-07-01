import React, { useContext, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { SearchComicContext } from "../../providers/SearchComicProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dropdown, Icon, Form, Button } from "react-bulma-components";
import { faSearch, faAngleDown } from '@fortawesome/free-solid-svg-icons'

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
    
    const [ queryString, setQueryString ] = useState("");
    const { searchIssues } = useContext(SearchComicContext);

    const handleSearch = (event) => {
        event.preventDefault();
        const encodedQuery = encodeURIComponent(queryString)
        searchIssues(encodedQuery)
        .then(() => {
            history.push("/search/issues")
        })
    };

    return (
        <>
            <form>
                <Form.Field kind="addons">
                    <Form.Control>
                        <Form.Input placeholder="Find a post" onChange={(e) => {setQueryString(e.target.value)}}/>
                    </Form.Control>
                    <Form.Control>
                        <Form.Select
                            color={"info"}
                            colorVariant={"light"}
                            value={"Filter"}
                            textColor={"info"}                         
                            // onChange={(e) => e.preventDefault()}
                        >
                            <option value="option 1">Option 1</option>
                            <option value="option 2">Option 2</option>
                        </Form.Select>
                    </Form.Control>
                    <Form.Control >
                        <Icon align="left" >
                            <FontAwesomeIcon className='search-icon' icon={faSearch} />
                        </Icon>
                        <Button color='info' onClick={(e) => {handleSearch(e)}} className='search-button--span'>
                            Search
                        </Button>
                    </Form.Control>
                </Form.Field>
            </form>
        </>
    );
};

export default SearchBar;