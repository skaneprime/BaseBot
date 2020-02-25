import fetch from 'node-fetch';

const url = '/api/client';

class ClientService {
    // Get Data
    static async getData(extraUrl) {
        let result = await fetch(`${url}${extraUrl}`).then(r => r.json());
        return result;
    }
}


export default ClientService;