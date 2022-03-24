/**
 * Renders Link information as a header for statistics page
 * 
 * @param {object} props Receives Link object
 * @returns Link data
 */

export function StatisticsLinkHeader(props){
    const { linkData } = props;
    return linkData && linkData.LinkUrl ? <div>
        <div className='headerDiv'><b>Link url: </b> { linkData.LinkUrl }</div>
        <div className='headerDiv'><b>Shortened url: </b>{ linkData.ShortenedLinkUrl }</div>
        <div className='headerDiv'><b>Creation date: </b>{ new Date(linkData.CreateDate).getDate() + "-"+ new Date(linkData.CreateDate).getMonth()+ "-" + new Date(linkData.CreateDate).getFullYear() }</div>
    </div> : null;
}