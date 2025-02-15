import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getIdToken } from 'firebase/auth';
import { auth } from '../services/firebase';
import { createBackendUser } from '../services/authService';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
    const [formData, setFormData] = useState({ email: '', password: '', name: '', role: 'farmer' });
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            // 1. Create Firebase user
            const userCred = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const firebaseUser = userCred.user;

            // Add role to user metadata
            firebaseUser.role = formData.role;

            // 2. Get ID token
            const token = await getIdToken(firebaseUser);

            // 3. Call backend to create user
            const backendUser = await createBackendUser(token, {
                email: formData.email,
                name: formData.name,
                role: formData.role,
            }, firebaseUser);

            console.log('Backend user created:', backendUser);

            // 4. Redirect to dashboard or login
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || err.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-base-200">
            <div className="card w-full max-w-sm shadow-2xl bg-base-100 border-primary border-2">
                <form onSubmit={handleRegister} className="card-body">
                    <div
                        className="w-24 h-24 bg-primary mx-auto"
                        style={{
                            WebkitMask: "url('Assets/logo_outlined.png') no-repeat center",
                            mask: "url('Assets/logo_outlined.png') no-repeat center",
                            WebkitMaskSize: "cover",
                            maskSize: "cover",
                        }}
                    ></div>
                    <h2 className="text-2xl font-bold text-center">Register</h2>

                    {error && <div className="text-red-500 text-center">{error}</div>}

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

                    <div className="form-control">
                        <label className="label">Name</label>
                        <input
                            type="text"
                            name="name"
                            className="input input-bordered"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">Role</label>
                        <select
                            name="role"
                            className="select select-bordered"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value="farmer">Farmer</option>
                            <option value="agricultural_expert">Agricultural Expert</option>
                            <option value="consumer">Consumer</option>
                        </select>
                    </div>

                    <div className="form-control mt-4">
                        <button type="submit" className="btn btn-secondary w-full">
                            Register
                        </button>
                    </div>

                    <div className="text-center mt-2">
                        Already have an account?{' '}
                        <Link to="/login" className="text-secondary">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
