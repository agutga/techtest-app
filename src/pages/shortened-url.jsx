import React, { useState,  useEffect } from "react";
import { useParams } from "react-router-dom";
import { LinkEventService } from "../services/link-event-service";

/**
 * Saves a click event associated to the link related to the shortened url passed by query parameter and redirects to the link actual url.
 * 
 * If the shortened url passed doesn't exist, it shows an error message.
 */
export function ShortenedUrl(){
    const params = useParams();    
    const [ linkNotFound, setLinkNotFound ] = useState(false);    

    useEffect(() => {        
        LinkEventService.submitLinkEvent(params.shortenedUrl)
        .then(response => response.json())        
        .then(link => {        
            if(link && link.LinkUrl) {                
                //Redirect to actual URL.
                window.location.href = link.LinkUrl;
            }
            else{
                setLinkNotFound(true);
            }              
        });
    });

    return <React.Fragment>
        <span className={ !linkNotFound ? 'invisible' : 'visible' } >Link not found</span>
    </React.Fragment>;
}