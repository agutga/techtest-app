import React, { useState } from 'react';
import { isValidHttpUrl } from '../../utils/url-util';
import { LinkService } from '../../services/link-service';
import cloneDeep from 'lodash/cloneDeep';


/**
 * Validates and submits new Links to the link list.
 * 
 * Renders a textbox, a button and two hidden validation messages. Checks if the string submitted is a valid url and returns an error message if it's not.
 * 
 * @param {object} props Receives stored Link array and the setter function to be able to update it.
 */
export function InputLink(props)
{
    const [ url, setUrl] = useState('');
    const [ validUrl, setValidUrl ] = useState(true);    
    const { linkList, setLinkList, setShowError, setErrorMessage } = props;

    const handleSubmitUrl = (ev) => {
        ev.preventDefault();
        try{
            if(isValidHttpUrl(url))
            {
                LinkService.submitLink({ 
                    linkUrl: url
                }).then(response => response.json())
                .catch(err => {
                    setShowError(true);
                    setErrorMessage('Error submitting a link.');
                })
                .then(newLink => {
                    setShowError(false);
                    setErrorMessage('');
                    let newLinkList = cloneDeep(linkList || []);

                    newLinkList = newLinkList.concat(newLink) || [];

                    setLinkList(newLinkList);
                    setValidUrl(true);
                    setUrl('');
                });            
            }
            else{
                setValidUrl(false);
            }  
        }
        catch(error) {
            setShowError(true);
            setErrorMessage('Error submitting a link.');
        }      
    };
    
    const validateUrl = (url) =>{        
        if(url)        
        {
            if(isValidHttpUrl(url)){
                setValidUrl(true);
            }
            else {
                setValidUrl(false);
            }
        }

        return true;        
    }    

    return <React.Fragment>
        <form onSubmit={(ev) => handleSubmitUrl(ev) }>
            <input  type='text' 
                    style={ { float:'left' } }
                    onChange={(ev) => { setUrl(ev.target.value) } } 
                    onBlur={(ev) => { validateUrl(ev.target.value) }}
                    value={ url } 
                    placeholder="URL"
                    />
            <input type="submit" style={ { float:'left' } } value="Add link" />                          
            <span style={ { float:'left' } } className={ !validUrl ? 'visible' : 'invisible' }>URL not valid. Please add "https://" or "http://" to the URL.</span>
        </form>
    </React.Fragment>;
}