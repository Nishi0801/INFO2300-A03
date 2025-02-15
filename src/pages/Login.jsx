import React, {useState} from 'react';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../services/firebase';
import {Link, useLocation, useNavigate} from 'react-router-dom';

export default function Login() {
    const [formData, setFormData] = useState({email: '', password: ''});
    const [error, setError] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/dashboard';

    const handleChange = (e) => {
        setFormData(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            await signInWithEmailAndPassword(auth, formData.email, formData.password);
            navigate(from, { replace: true });
        } catch (err) {
            console.error({err});

            switch (err.code) {
                case 'auth/invalid-email':
                    setError('Invalid email address');
                    break;
                case 'auth/user-disabled':
                    setError('User is disabled');
                    break;
                default:
                    setError('Invalid credentials');
                    break;
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-base-200">

            <div className="card w-full max-w-sm shadow-2xl bg-base-100 border-primary border-2">
                <form onSubmit={handleLogin} className="card-body">
                    <div
                        className="w-24 h-24 bg-primary mx-auto"
                        style={{
                            WebkitMask: "url('Assets/logo_outlined.png') no-repeat center",
                            mask: "url('Assets/logo_outlined.png') no-repeat center",
                            WebkitMaskSize: "cover",
                            maskSize: "cover",
                        }}
                    ></div>
                    <h2 className="text-2xl font-bold text-center">Login</h2>

                    {error && <div className="text-error text-center">{error}</div>}

                    <div className="form-control">
                        <label className="label">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="input input-bordered"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="input input-bordered"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-control mt-4">
                        <button type="submit" className="btn btn-secondary w-full">
                            Login
                        </button>
                    </div>

                    <div className="text-center mt-2">
                        Don&#39;t have an account?{' '}
                        <Link to="/register" className="link link-secondary">Register</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
