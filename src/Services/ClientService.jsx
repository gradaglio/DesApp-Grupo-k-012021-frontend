import rp from 'request-promise'

class ClientService{

    urlBase = "http://localhost:8080/re-senia";

    createClient(messageBody){
        const options = {
            url: this.urlBase + "/clientPlatform",
            body: messageBody,
            json: true,
        };
        return rp.post(options)
    }

    postClient(messageBody){
        const options = {
            url: this.urlBase + "/clientPlatform",
            body: messageBody,
            json: true,
        };
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