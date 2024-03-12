'use client';
import { useProfile } from "@/components/UseProfile";
import Right from "@/components/icons/Right";
import UserTabs from "@/components/layout/UserTabs";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function MenuItemsPage() {
    const {loading, data} = useProfile();
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
          res.json().then(menuItems => {
            setMenuItems(menuItems);
          });
        })
      }, []);

    if (loading) {
        return 'Loading...';
    }
    // if (!data.admin) {
    //     return 'Not a admin';
    // }

    return(
        <section className="mt-8 max-w-lg mx-auto">
            <UserTabs isAdmin={true} />
            <div className="mt-8 flex">
                <Link 
                    className=" flex justify-center gap-2 border-2 w-full border-black font-semibold rounded-lg px-6 py-2"
                    href={'/menu-items/new'}>Create new item
                    <Right />
                </Link>
            </div>
            <div>
                <h2 className="text-sm text-gray-500 font-bold uppercase mt-8">Edit menu item:</h2>
                <div className="grid grid-cols-3 gap-2">
                    {menuItems?.length > 0 && menuItems.map(item => (
                        <Link
                        key={item._id}
                        href={'/menu-items/edit/'+item._id}
                        className="border bg-gray-300 flex-col mb-1 rounded-lg p-4"
                        >
                        <div className="relative">
                            <Image
                            className="rounded-md"
                            src={item.image} alt={''} width={500} height={500} />
                        </div>
                        <div className="text-center mt-4 font-semibold">
                            {item.name}
                        </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}