'use client';
import Image from "next/image";
import { useState } from "react";
import { signIn } from 'next-auth/react';


export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginInProgress, setLoginInProgress] = useState(false);

    async function handleFormSubmit(ev) {
        ev.preventDefault();
        setLoginInProgress(true);
        
        await signIn('credentials', {email, password, callbackUrl: '/'});

        setLoginInProgress(false);
    }

    return(
        <section className="mt-10">
            <h1 className="text-center mb-4 text-primary text-4xl font-bold">
                Login 
            </h1>
            <form className="block max-w-xs mx-auto mt-10" onSubmit={handleFormSubmit}>
                <input required type="email" id="email" name="email" className="bg-gray-100 inline-block    rounded-lg shadow-md px-4 py-3 mb-5 text-base w-full  placeholder-gray-500" 
                placeholder="Email"
                disabled={loginInProgress}
                value={email}
                onChange={ev => setEmail(ev.target.value)}
                /><br />
                
                <input required type="password" id="password" name="password" className="bg-gray-100 inline-block rounded-lg shadow-md px-4 py-3 mb-5 text-base w-full placeholder-gray-500" 
                placeholder="Password"
                disabled={loginInProgress} 
                value={password}
                onChange={ev => setPassword(ev.target.value)}
                /><br />

                <button type="submit" disabled={loginInProgress}  className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Login</button>
                <div className="my-4 mt-8 text-center text-gray-500">
                    or login with provider
                </div>
                <button onClick={() => signIn('google', {callbackUrl: '/'})} className="flex w-full mt-8 justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm border border-gray-400 focus-visible:outline-offset-2 gap-4">
                    <Image src={'/google.png'} alt={'google icon'} width={24} height={24} />
                    Login with google
                </button>
            </form>
        </section>
    )
}