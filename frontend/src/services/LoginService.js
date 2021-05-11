import axios from 'axios';

const LoginService = data => (
    axios.post('http://localhost:5000/login', data)
    .then(res => res.status)
)

export default LoginService;
