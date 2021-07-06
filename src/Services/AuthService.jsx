import rp from 'request-promise'

class AuthService{

    urlBase = "http://localhost:8080/re-senia";

    authenticate(messageBody){
        const options = {
            url: this.urlBase + "/clientPlatform/login",
            body: messageBody,
            json: true,
        };
        return rp.put(options)
    }

}

export default new AuthService();