import React from 'react';
import { Link } from 'react-router-dom';
import { LinkService } from '../../services/link-service';
import cloneDeep from 'lodash/cloneDeep';

/**
 * Renders current Link list with anchors to each link statistics and actual url.
 * 
 * @param {object} props Receives stored Link array.
 * @returns 
 */
export function LinkList (props) {

    const { linkList, setLinkList, setShowError, setErrorMessage } = props;    

    let tableRows = null;

    const deleteLink = (linkId) => {
            LinkService.deleteLink(linkId)
            .catch(err => {
                setShowError(true);
                setErrorMessage('Error deleting a link.');
            })
            .then(() => {
                setShowError(false);
                setErrorMessage('');
                let newLinkList = cloneDeep(linkList);

                newLinkList = newLinkList.filter(function(links) { return links.LinkId !== linkId }) || [];

                setLinkList(newLinkList);                
            });  
    };

    if(Array.isArray(linkList) && linkList.length > 0){
        tableRows = linkList.map((link) => { 
            return <tr key={`link-${link.LinkId}`}>
                        <td>{ link.LinkUrl }</td>
                        <td><Link to={`/${link.ShortenedLinkUrl}`}>{ link.ShortenedLinkUrl }</Link></td>
                        <td>{ link.CreateDate }</td>
                        <td><Link to={`/statistics/${link.LinkId}`}><button>See statistics</button></Link></td>
                        <td><button onClick={ () => deleteLink(link.LinkId) } >Delete</button></td>
                    </tr>;
            });
    }

    const renderedLinks = <div><table><tbody>{ tableRows }</tbody></table></div>;

    return <div style={{float: 'left', clear:'both'}} >{ renderedLinks }</div>;
}