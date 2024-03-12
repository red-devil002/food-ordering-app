'use client';
import Left from "@/components/icons/Left";
import Plus from "@/components/icons/Plus";
import Right from "@/components/icons/Right";
import Trash from "@/components/icons/Trash";
import EditableImage from "@/components/layout/EditableImage";
import MenuItemPriceProps from "@/components/layout/MenuItemPriceProps";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import Link from "next/link";
import { redirect } from "next/navigation";
import {useState} from "react";
import toast from "react-hot-toast";

export default function NewMenuItemPage() {

    const {loading, data} = useProfile();
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [basePrice, setBasePrice] = useState('');
    const [sizes, setSizes] = useState([]);
    const [extraingredients, setExtraIngredients] = useState([]);
    const [redirectToItems, setRedirectToItems] = useState(false);


    async function handleFormSubmit(ev) {
        ev.preventDefault();
        console.log("Image: " + image);
        const data =  {image,name, description, basePrice,sizes, extraingredients}
        const savingPromise = new Promise(async(resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {'Content-Type': 'application/json' },
            })
            if (response.ok)
                resolve();
            else
                reject();
        })

        await toast.promise(savingPromise, {
            loading: 'Saving the item...',
            success: 'Saved',
            error: 'error',
        })
        setRedirectToItems(true);
    }



    if (redirectToItems) {
        return redirect('/menu-items');
      }

    if (loading) {
        return 'Loading...';
    }

    // if (!data.admin) {
    //     return 'Not a admin';
    // }

  return (
    <section className="mt-8 max-w-lg mx-auto">
        <UserTabs isAdmin={true} />
        <div className="mt-8 flex">
            <Link 
                className=" flex justify-center gap-2 w-full border font-semibold rounded-lg px-6 py-2"
                href={'/menu-items'}>
                    <Left />
                    Show all menu
            </Link>
        </div>
        <form className="mt-8 max-w-md mx-auto" onSubmit={handleFormSubmit}>
            <div 
                className="grid items-start gap-2"
                style={{gridTemplateColumns: '.3fr .7fr'}}>
                <div>
                    <EditableImage link={image} setLink={setImage} />
                </div>
                    <div className="grow">
                    <label className="text-sm">
                        Menu item name
                    </label>
                    <input className="placeholder-transparent h-10 w-full bg-gray-200 rounded-lg border-gray-300 text-gray-900" type="text"
                        value={name}
                        onChange={ev => setName(ev.target.value)}
                    />

                    <label className="text-sm">
                        Description
                    </label>
                    <input className="placeholder-transparent h-10 w-full bg-gray-200 rounded-lg border-gray-300 text-gray-900" type="text" 
                        value={description}
                        onChange={ev => setDescription(ev.target.value)}
                    />

                    <label className="text-sm">
                        Base Price
                    </label>
                    <input className="placeholder-transparent h-10 w-full bg-gray-200 rounded-lg border-gray-300 text-gray-900" type="text" 
                        value={basePrice}
                        onChange={ev => setBasePrice(ev.target.value)}                        
                    /><br/>

                    <MenuItemPriceProps
                        props={sizes}
                        setProps={setSizes}
                        name={'Sizes'}
                        addLabel={'Add item size'}
                        />

                    <MenuItemPriceProps 
                        name={'Extra ingredients'}
                        setProps={setExtraIngredients}
                        props={extraingredients}
                        addLabel={'Add extra ingredients'}
                    />

                    <button className="bg-primary text-white w-full mt-4 hover:bg-red-300 rounded-lg px-4 py-2">Save</button>
                </div>
            </div>
        </form>
    </section>
  );
}