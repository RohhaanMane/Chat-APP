import { Link } from "react-router-dom";
import GenderCheckBox from "./GenderCheckBox";
import { useState } from "react";
import useSignup from "../hooks/useSignup";

const SignUp = () => {
    const [inputs, setInputs] = useState({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
        gender: "",
    });

    const { loading, signup } = useSignup();

    const handleCheckboxChange = (gender) => {
        setInputs({ ...inputs, gender: gender });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(inputs);
    };

    return (
        <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
            <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
                <h1 className="text-3xl font-semibold text-center text-gray-300">
                    Sign Up <span className="text-blue-500"> ChatApp</span>
                </h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="label p-2">
                            <span className="label-text text-base">
                                Full Name
                            </span>
                        </label>
                        <input
                            type="text"
                            placeholder="Jhon Doe"
                            className="w-full input input-bordered"
                            value={inputs.fullName}
                            onChange={(e) =>
                                setInputs({
                                    ...inputs,
                                    fullName: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div>
                        <label className="label p-2">
                            <span className="label-text text-base">
                                Username
                            </span>
                        </label>
                        <input
                            type="text"
                            placeholder="Jhondoe"
                            className="w-full input input-bordered"
                            value={inputs.username}
                            onChange={(e) =>
                                setInputs({
                                    ...inputs,
                                    username: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div>
                        <label className="label p-2">
                            <span className="label-text text-base">
                                Password
                            </span>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            className="w-full input input-bordered"
                            value={inputs.password}
                            onChange={(e) =>
                                setInputs({
                                    ...inputs,
                                    password: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div>
                        <label className="label p-2">
                            <span className="label-text text-base">
                                Confirm Password
                            </span>
                        </label>
                        <input
                            type="password"
                            placeholder="Confirm password"
                            className="w-full input input-bordered"
                            value={inputs.confirmPassword}
                            onChange={(e) =>
                                setInputs({
                                    ...inputs,
                                    confirmPassword: e.target.value,
                                })
                            }
                        />
                    </div>

                    <GenderCheckBox
                        onCheckboxChange={handleCheckboxChange}
                        selectedGender={inputs.gender}
                    />

                    <Link
                        to="/login"
                        className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
                    >
                        Already have an account
                    </Link>
                    <button className="btn btn-block btn-sm mt-2 border border-slate-700">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
