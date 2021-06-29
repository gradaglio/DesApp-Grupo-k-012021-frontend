import rp from 'request-promise'

class AuthService{

    urlBase = "http://localhost:8080/re-senia";

    authenticate(messageBody){
        const options = {
            url: this.urlBase + "/auth",
            body: messageBody,
            json: true,
        };
        return rp.post(options)
    }

}

export default new AuthService();