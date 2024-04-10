import React, { useState } from "react";

const Register = () => {
    return (
        <div className="pt-20"> {/* Add padding top to create space below the navbar. Can add bg-black for bg*/}
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">

                <header className='text-center'>
                    <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Please Register</h2>

                    <p className="mt-4 max-w-md mx-auto text-gray-500">
                        Click the login button to register or login.
                    </p>

                </header>
            </div>
        </div>

    );  
};

    export default Register;
