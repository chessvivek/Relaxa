import axios from 'axios';
import { registerRoute} from '../constants/constants';

const UserRegistration = async (data) => {

    console.log(data);

    return {"yes": "yes"};

    // var response;

    // axios.post("localhost:5000/api/register", data)
    // .then(function(res) {
    //     response = res;
    //     console.log(response);
    //     return response;
    // });
};

export default UserRegistration;