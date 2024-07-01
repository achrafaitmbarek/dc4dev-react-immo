import { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const Signin = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("access_token")) {
            navigate("/");
        }
    }, [navigate]);

    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await AuthService.signin(credentials);
            if (localStorage.getItem("access_token")) {
                navigate("/");
            }
        } catch (error) {
            console.log("handleSubmit error: ", error);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '50px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Login</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={credentials.email}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '15px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '16px' }}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={credentials.password}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '15px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '16px' }}
                    />
                </div>
                <input
                    type="submit"
                    value="Signin"
                    style={{ padding: '15px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', textAlign: 'center' }}
                />
            </form>
        </div>
    );
};

export default Signin;
