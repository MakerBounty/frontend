
import React from 'react';
import { FaSearch, FaSignInAlt, FaUser } from "react-icons/fa";
import { Container, Row, Col, Visible } from "react-grid-system";
import Link from "next/link";

import api from "../lib/api";

export default function Header( ) {
    
    // get user data from localstorage
    let username = undefined;
    if (typeof window !== "undefined" && window.localStorage.userData)
        username = JSON.parse(window.localStorage.getItem("userData")).username;

    return (<>
        <style jsx>{`
            .navbar {
                width: 100%;
                background-color: #111;
                color: #fff;
                margin: 0;
                padding: 4px;
                padding-left: 10px;
                height: 32px;
            }

            /* change logo based on screen size */
            .desktop-only {
                display: none;
                width: 100%;
            }
            .mobile-only {
                display: block;
                width: 100%;
            }

            @media (min-width: 600px) {
                .desktop-only {
                    display: block;
                }
                .mobile-only {
                    display: none;
                }
            }

            .navbar * {
                margin: 0;
                margin-right: 20px;
                height: 32px;
                
            }
            a {
                color: #aaa;
                transition: color 0.5s;
                text-decoration: none;
                padding-top: 5px;
                font-size: 20px;
            }
            a:hover {
                color: #fff;
            }

        `}</style>

        <div className="navbar desktop-only">

            <Container fluid>
                <Row className="nbrow" justify="start">
                        
                        <Link href="/">
                            <img src="/assets/logo-full-wt.png" alt="MB" className="logoimg" height="32" />
                        </Link>
                        
                        <Link href="/find">
                            <a>Bounties</a>
                        </Link>
                    
                        {username ? (
                            <>
                                <Link href={"/u/" + username }>
                                    <a>Profile</a> 
                                </Link>
                                <Link href="/signup">
                                    <a>Notifications</a>
                                </Link>
                            </>
                        ): (
                            <>
                                <Link href="/login">
                                    <a>Login</a> 
                                </Link>
                                <Link href="/signup">
                                    <a>Signup</a>
                                </Link>
                            </>
                        )}
                </Row>
            </Container>
        </div>
        {/*
        <div className="navBar">
            <div className="desktop-only">
                <Link href="/">
                    <img src="/assets/logo-full-wt.png" alt="MakerBounty" className="nbitem" />
                </Link>

                <nav>

                </nav>
                <Link href="/find">
                    <h3 className="nbitem">Explore</h3>
                </Link>
                <div className="nb-float-right nb-item" >
                    <Link href="/login">
                        <FaSignInAlt style={{fontSize:"4.5vh"}} />
                    </Link>
                </div>
            </div>
        </div>
        */}

    </>);
    
}


