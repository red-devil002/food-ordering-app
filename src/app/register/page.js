"use client";
import Image from "next/image";
import { useState } from "react";
import "../globals.css";
import Link from "next/link";

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [creatingUser, setCreatingUser] = useState(false);
    const [userCreated, setUserCreated] = useState(false);
    const [error, setError] = useState(false);
    async function handleFormSubmit(ev) {
        ev.preventDefault();
        setCreatingUser(true);
        setError(false);
        const response = await fetch('/api/register',{ 
            method: 'POST', 
            body: JSON.stringify({email, password}),
            headers: {'Content-Type': 'application/json'}    
        });
        if (response.ok) {
            setUserCreated(true);
        }
        else{
            setError(true);
        }
        setCreatingUser(false);
    }

    return(
        <section className="mt-10">
            <h1 className="text-center mb-4 text-primary text-4xl font-bold">
                Register
            </h1>
            {userCreated &&(
                <div className="my-4 text-center">
                    Account created successfully....!!! <br />
                    <Link className="underline" href={'/login'}>Login &raquo;</Link>
                </div>
            )}
            {error && (
                <div className="my-4 text-center">
                    An error has occurred...!!<br/>
                    Please try again
                </div>
            )}
            <form className="block max-w-xs mx-auto mt-10" onSubmit={handleFormSubmit}>
                <input required type="email" id="email" name="email" className="bg-gray-100 inline-block    rounded-lg shadow-md px-4 py-3 mb-5 text-base w-full  placeholder-gray-500" 
                placeholder="Email"
                disabled={creatingUser}
                value={email}
                onChange={ev => setEmail(ev.target.value)}
                /><br />
                
                <input required type="password" id="password" name="password" className="bg-gray-100 inline-block rounded-lg shadow-md px-4 py-3 mb-5 text-base w-full placeholder-gray-500" 
                placeholder="Password"
                disabled={creatingUser} 
                value={password}
                onChange={ev => setPassword(ev.target.value)}
                /><br />

                <button type="submit" disabled={creatingUser}  className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Register</button>
                <div className="my-4 mt-8 text-center text-gray-500">
                    Register with provider
                </div>
                <button className="flex w-full mt-8 justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm border border-gray-400 focus-visible:outline-offset-2 gap-4">
                    <Image src={'/google.png'} alt={'google icon'} width={24} height={24} />
                    Register with google
                </button>
                <div className="text-center my-4 text-gray-500 border-t pt-4">
                    Existing account?{' '}
                    <Link className="underline" href={'/login'}>Login here &raquo;</Link>
                </div>
            </form>
        </section>
    );
}