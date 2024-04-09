import React from 'react';
import Layout from '../Components/Layout';

const About = () => {
    return (
        <Layout>
            <br />
            <br />

            <div className="pt-32 flex flex-col items-center gap-4">
                <img
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                    className="size-20 rounded-lg object-cover"
                />

                <div>
                    <h3 className="text-lg/tight font-medium text-gray-900 text-center">Developer</h3>

                    <p className="mt-0.5 text-gray-700 text-center">
                        Capstone project for CNA Software Development Co-op course.

                        The Software Development Co-op three-year program focuses on the competencies
                        required to design, implement, and maintain software systems that operate in a secure 
                        business networked environment containing stationary and mobile devices. The program 
                        combines theoretical and practical learning experiences in a team-oriented setting.
                    </p>


                    <p className="mt-0.5 text-gray-700 text-center">
                        Developed by: 
                        <span className="text-blue-500">David Sparks, Imran Moin, Alberta Hansen, and Jack Husk</span>
                    </p>

                </div>
            </div>
        </Layout>
        
    );
};

export default About;