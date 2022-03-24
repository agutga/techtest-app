import cfg from './cfg/cfg';

export class LinkEventService {
    static submitLinkEvent(shortenedLinkUrl){
        return fetch(`${cfg.apiurl}/link-event`, 
        {
            method: 'POST',
            headers: cfg.headers,
            body: JSON.stringify({ shortenedLinkUrl })
        });
    }
}