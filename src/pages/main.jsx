import React, { useState, useEffect } from "react";
import { LinkList } from "./components/link-list";
import { InputLink } from "./components/input-link";
import { LinkService } from "../services/link-service";

/**
 * Main page component. Retrieves all links and pass them to input and link list components.
 */
export function Main(){
    const [ linkList, setLinkList] = useState([]);    
    const [ loadedLinks, setLoadedLinks] = useState(false);
    const [ showError, setShowError ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');

    useEffect(() => {        
        if(!loadedLinks){
            LinkService.getAllLinks()
            .then(response => {
                return response.json();
            })
            .catch(err=> {
                console.log(err);
            })
            .then(links => {
                if(links || (Array.isArray(links))) {
                    setLoadedLinks(true);
                    setLinkList(links); 
                }
                else {
                    setShowError(true);
                    setErrorMessage("Error trying to retrieve links.");
                }               
            });        
        }        
    }, [ linkList, loadedLinks ]);

    return <div className="mainDiv">
        <div style={{ "paddingBottom":"1em"}}>Hi!, you can add your links here.</div>
        <div><InputLink linkList = { linkList } setLinkList={ setLinkList } setShowError={ setShowError } setErrorMessage={ setErrorMessage } /> </div>
        <div><LinkList linkList = { linkList } setLinkList = { setLinkList } setShowError={ setShowError } setErrorMessage={ setErrorMessage } /></div>
        <span style={ { float:'left', color: 'red' } } className={ showError ? 'visible' : 'invisible' }>{ errorMessage }</span>
    </div>;
}