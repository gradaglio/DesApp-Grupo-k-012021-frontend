import rp from 'request-promise'

class ClientService{

    urlBase = "localhost:8080/re-senia";
    
    static registerClient(messageBody){
        const options = {
            url: this.urlBase + "/clientPlatform/register",
            body: messageBody,
            json: true,
        };
        console.log("sale")
        return rp.post(options)
    }

    getAllClients(){
        return rp.get(this.urlBase + "/clientPlatform").then(response => {
            return response;
        }).catch(err => {
            console.log(err);
        });
    }

    getClient(id){
        return rp.get(this.urlBase + `/clientPlatform/${id}`).then(response => {
            let obj = JSON.parse(response)
            return obj;
        }).catch(err => {
            console.log(err);
        })
    }

    updateClient(id, messageBody){
        const options = {
            url: this.urlBase + `/clientPlatform/${id}`,
            body: messageBody,
            json: true,
        };
        
        console.log('options: ' + options)
        return rp.put(options)
    }

}

export default ClientService;