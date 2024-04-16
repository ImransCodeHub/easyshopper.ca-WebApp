import React from 'react';
import Layout from '../Components/Layout';
import '../Pages/CSS/About.css';
import { useEffect } from 'react';

const About = () => {
    useEffect(() => {
        document.title = "About";
    }, []);

    return (
        <Layout>
            <br />
            <div className="pt-32 flex flex-col items-center gap-4">
                <img
                    src="https://i.imgur.com/zgE8SoE.png"
                    alt=""
                    className="size-40"
                />
                <div className='about-text-content'>
                    <div>
                        <h3 className="text-lg/tight font-bold text-gray-900 text-center">About The Program</h3>

                        <p className="mt-0.5 text-gray-700 text-center">
                            The Software Development Co-op three-year program focuses on the competencies <br/>
                            required to design, implement, and maintain software systems that operate in a secure <br/> 
                            business networked environment containing stationary and mobile devices. The program <br/>
                            combines theoretical and practical learning experiences in a team-oriented setting.
                        </p>
                        <br />

                        <h3 className="text-lg/tight font-bold text-gray-900 text-center">Project Outline</h3>

                        <p className="mt-0.5 text-gray-700 text-center">
                            This project was done in a group, with the goal of creating a fullstack web application for a startup company. <br/> 
                            We where encouraged to use as many technologies as possible, all of which where taught to us throughout the program. <br/> 
                            The project consisted of 3 main parts: a systems proposal draft, a final proposal, and the final project deployment. <br/>
                            <br />
                        </p>
                        <br />

                        <h3 className="text-lg/tight font-bold text-gray-900 text-center">Tech Stack</h3>
                        <p className="mt-0.5 text-gray-700 text-center">
                            This web applications implements the following technologies:
                            <ul>
                                <li>• Node.js/Express Backend</li>
                                <li>• React.js Frontend</li>
                                <li>• MongoDB Atlas</li>
                                <li>• JSON Web Tokens (Browser local storage/cookies for tracking)</li>
                                <li>• React-Bootstrap Styling</li>
                                <li>• Git/GitHub</li>
                                <li>• HTTPS</li>
                                <li>• DNS/Domain Setup</li>
                                <li>• AWS Fullstack Serverless Architecture</li>
                                <li>• OAuth (Handle user logins/track necessary information)</li>
                            </ul>
                        </p>

                        <br />
                        <h3 className="text-lg/tight font-bold text-gray-900 text-center">Developers: </h3>
                        
                        
                        <p className="mt-0.5 text-gray-700 text-center">
                            
                            <span className="text-blue-500"><a href="https://www.linkedin.com/in/alberta-hansen-a97186228/">Alberta Hansen</a>, 
                            <span className="text-black"> Jack Husk</span>, <a href="https://www.linkedin.com/in/imran-moin-/">Imran Moin</a> , <a href="https://www.linkedin.com/in/david-sparks-368b0226/"> and David Sparks</a></span>

                        </p>




                    </div>
                </div>
            </div>
        </Layout>
        
    );
};

export default About;



//--------------------------------------original code------------------------------------------