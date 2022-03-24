import cfg from './cfg/cfg';

export class LinkStatisticsService {
    static getLinkStatistics(linkId){
        return fetch(`${cfg.apiurl}/statistics?linkId=${linkId}`, 
        {
            method: 'GET',
            headers: cfg.headers                                               
        });
    }
}