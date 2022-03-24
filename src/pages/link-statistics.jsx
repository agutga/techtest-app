import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LinkStatisticsService } from "../services/link-statistics-service";
import { CanvasChart } from "./components/canvas-chart";
import { StatisticsLinkHeader } from "./components/statitics-header";
import { Link } from "react-router-dom";



/**
 * Retrieves Link statistics from the API and pass them on header and chart components. It extracts LinkId from url parameters.
 * 
 * @returns 
 */
export function LinkStatistics(){
    const params = useParams();
    const [ loadedStatistics, setLoadedStatistics] = useState(false);
    const [ linkStatistics, setLinkStatistics ] = useState([]);
    const [ linkData, setLinkData ] = useState({});    
    const [ showError, setShowError ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');

    useEffect(() => {       
        if(!loadedStatistics){
            LinkStatisticsService.getLinkStatistics(params.id)
            .then(response => response.json())
            .catch(err => {
                setShowError(true);
                setErrorMessage('Error trying to retrieve statistics');
            })
            .then(statistics => {
                if(statistics) {
                    setLoadedStatistics(true);

                    if(statistics){
                        setLinkData({
                            LinkId: statistics.LinkId,
                            LinkUrl: statistics.LinkUrl,
                            ShortenedLinkUrl: statistics.ShortenedLinkUrl,
                            CreateDate: statistics.CreateDate
                        });
                    }

                    if(statistics.data){
                        setLinkStatistics(statistics.data);
                    } 

                    setShowError(false);
                    setErrorMessage('');

                }
                else {
                    setShowError(true);
                    setErrorMessage('Error trying to retrieve statistics');
                }                                       
            });                
        }        
    });    

    return <div>
                <StatisticsLinkHeader linkData={ linkData } />
                <CanvasChart linkStatistics={ linkStatistics }/>                
                <div>
                    <Link to='/'>Back to link list</Link>
                </div>
                <div className="divFleft">
                    <span style={ { float:'left', color: 'red' } } className={ showError ? 'visible' : 'invisible' }>{ errorMessage }</span>
                </div>
            </div>;
}