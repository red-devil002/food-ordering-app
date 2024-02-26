'use client'
import { useSession } from "next-auth/react"
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage(){
    const session = useSession();
    const [userName, setUserName] = useState('');
    const [phone, setPhone] = useState('');
    const [department, setDepartment] = useState('');
    const [sem, setSem] = useState('');
    const [college, setCollege] = useState('');
    const [prn, setPRN] = useState('');
    const {status} = session;
    const [saved, setSaved] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    

    useEffect(() => {
        if (status === 'authenticated'){
            setUserName(session.data.user.name)
            fetch('/api/profile').then(response => {
                response.json().then(data => {
                    setPhone(data.phone);
                    setDepartment(data.department);
                    setSem(data.sem);
                    setCollege(data.college);
                    setPRN(data.prn);
                })
            })
            
        }
    }, [session, status]);

    async function handleProfileUpdate(ev) {
        ev.preventDefault();
        setSaved(false);
        setIsSaving(true);
        const response = await fetch('api/profile', {
            method: 'PUT',
            headers: {'Content-Type': 'applicaiton/json'},
            body: JSON.stringify({
                name: userName,
                phone,
                department,
                sem,
                college,
                prn,
            })
        });
        setIsSaving(false);
        if (response.ok){
            setSaved(true);
        }
    };

    async function handleFileChange(ev) {
        const files = ev.target.files;
        if (files?.length === 0){
            const data = new FormData;
            data.set('file', files[0]);
            await fetch('/api/upload', {
                method: 'POST',
                body: data,
                // headers: {'Content-Type': 'multipart/form-data'}
            });
        }
    }


    if (status === 'loading'){
        return 'Loading...';
    }

    if(status === 'unauthenticated'){
        return redirect('/login');
    }

    const userImage = session.data.user.image;

    return(
        <section className="mt-10">
            <div className="max-w-xxl mx-auto">
                <div class="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
                    <div class="container max-w-screen-lg mx-auto">
                        <h1 className="text-center text-primary font-bold uppercase text-4xl mb-4">
                            Profile section
                        </h1>
                        <br/>
                        <div className="flex justify-center" >
                            {saved && (
                                <h2 className="bg-green-400 border border-green-100 rounded-lg text-center mb-8 font-semibold w-32 ">Profile Saved</h2>
                            )}
                            {isSaving &&(
                                <div className="bg-blue-400 border border-blue-100 rounded-lg text-center mb-8 font-semibold w-32 ">Saving....!!!</div>
                            )}
                        </div>
                        <form class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6" onSubmit={handleProfileUpdate}>
                            <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                                <div class="text-gray-600">
                                    <p class="font-medium text-lg">Personal Details</p>
                                    <p>Please fill out all the fields.</p>
                                    <Image className="mt-10 rounded-lg" src={userImage} width={200} height={200} alt={'Profile pic'} />
                                    <label>
                                        <input type="file" className="hidden" onChange={handleFileChange}/>
                                        <span className="border mt-4 rounded-lg text-center block text-black w-32 p-2">Edit</span>
                                    </label>
                                </div>

                                <div class="lg:col-span-2">
                                    <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                        <div class="md:col-span-5">
                                            <label for="full_name">Full Name</label>
                                            <input type="text" name="full_name" id="full_name" class="h-10 border mt-1 rounded-lg px-4 w-full bg-gray-50" placeholder="Full name" value={userName} onChange={ev => setUserName(ev.target.value)} />
                                        </div>

                                        <div class="md:col-span-5">
                                            <label for="email">Email Address</label>
                                            <input type="email" name="email" id="email" value={session.data.user.email} disabled={true} class="h-10 border mt-1 rounded-lg px-4 w-full bg-gray-50" />
                                        </div>

                                        <div class="md:col-span-5">
                                            <label for="tel">Phone Number</label>
                                            <input type="tel" name="number" id="number" value={phone} onChange={ev => setPhone(ev.target.value)} class="h-10 border mt-1 rounded-lg px-4 w-full bg-gray-50" placeholder="Phone number" />
                                        </div>

                                        <div class="md:col-span-3">
                                            <label for="address">Department</label>
                                            <input type="text" name="address" id="address" value={department} onChange={ev => setDepartment(ev.target.value)} class="h-10 border mt-1 rounded-lg px-4 w-full bg-gray-50" placeholder="xyz" />
                                        </div>

                                        <div class="md:col-span-2">
                                            <label for="Class">Class Name / sem name</label>
                                            <input type="text" name="class" id="class" value={sem} onChange={ev => setSem(ev.target.value)} class="h-10 border mt-1 rounded-lg px-4 w-full bg-gray-50" placeholder="CE-1 / 2nd sem" />
                                        </div>

                                        <div class="md:col-span-2">
                                            <label for="college">College Name</label>
                                            <div class="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                                <input  type="text" name="college" id="college" placeholder="College name" value={college} onChange={ev => setCollege(ev.target.value)}class="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" />
                                                <button tabindex="-1" class="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
                                                    <svg class="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                                    </svg>
                                                </button>
                                                
                                            </div>
                                        </div>


                                        <div class="md:col-span-3">
                                            <label for="PRN">PRN number</label>
                                            <input type="number" name="PRN" id="PRN" value={prn} onChange={ev => setPRN(ev.target.value)}class="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="PRN number" />
                                        </div>

                                        <div class="md:col-span-5">
                                            <div class="inline-flex items-center">
                                                <input type="checkbox" name="billing_same" id="billing_same" class="form-checkbox" />
                                                <label for="billing_same" class="ml-2">My above mentioned details are correct.</label>
                                            </div>
                                        </div>
                                
                                        <div class="md:col-span-5 text-right">
                                            <div class="inline-flex items-end">
                                                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>    
        </section>
    )
}