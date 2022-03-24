import cfg from './cfg/cfg';

export class LinkService {
    static getAllLinks(){
        try{
            return fetch(`${cfg.apiurl}/link/get-all`, 
            {
                method: 'GET',
                headers: cfg.headers                                               
            });
        }
        catch(error){
            throw new Error();
        }        
    }

    static getLink(linkId){
        return fetch(`${cfg.apiurl}/link?linkId=${linkId}`, 
        {
            method: 'POST',
            headers: cfg.headers
        });
    }

    static submitLink(link){
        return fetch(`${cfg.apiurl}/link`, 
        {
            method: 'POST',
            headers: cfg.headers,
            body: JSON.stringify(link)
        });
    }

    static deleteLink(linkId){
        return fetch(`${cfg.apiurl}/link?linkId=${linkId}`,
        {
            method: 'DELETE',
            headers: cfg.headers            
        });
    }
}