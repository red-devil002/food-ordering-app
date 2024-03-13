'use client';
import Left from "@/components/icons/Left";
import Right from "@/components/icons/Right";
import EditableImage from "@/components/layout/EditableImage";
import MenuItemPriceProps from "@/components/layout/MenuItemPriceProps";
import UserTabs from "@/components/layout/UserTabs";
import DeleteButton from "@/components/menu/DeleteButton";
import { useProfile } from "@/components/UseProfile";
import Link from "next/link";
import {redirect, useParams} from "next/navigation";
import {useState, useEffect} from "react";
import toast from "react-hot-toast";

export default function NewMenuItemPage() {
    const {id} = useParams();

    const {loading, data} = useProfile();
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [basePrice, setBasePrice] = useState('');
    const [sizes, setSizes] = useState([]);
    const [extraingredients, setExtraIngredients] = useState([]);
    const [redirectToItems, setRedirectToItems] = useState(false);
    const [category, setCategory] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
      fetch('/api/menu-items').then(res => {
        res.json().then(items => {
          const item = items.find(i => i._id === id);
          setImage(item.image);
          setName(item.name);
          setDescription(item.description);
          setCategory(item.category);
          setBasePrice(item.basePrice);
          setSizes(item.sizes);
          setExtraIngredients(item.extraingredients);
        });
      })
    }, []);

    useEffect(() => {
        fetch('/api/categories').then(res => {
          res.json().then(categories => {
            setCategories(categories);
          });
        });
      }, []);


    async function handleFormSubmit(ev) {
        ev.preventDefault();
        const data =  {image, name, description,category, basePrice, sizes, extraingredients, _id:id};
        const savingPromise = new Promise(async(resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'PUT',
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

    async function handleDeleteClick() {
        const promise = new Promise(async (resolve, reject) => {
          const res = await fetch('/api/menu-items?_id='+id, {
            method: 'DELETE',
          });
          if (res.ok)
            resolve();
          else
            reject();
        });
    
        await toast.promise(promise, {
          loading: 'Deleting...',
          success: 'Deleted',
          error: 'Error',
        });
    
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

                    <label>Category</label>
                    <select className="placeholder-transparent h-10 w-full bg-gray-200 rounded-lg border-gray-300 text-gray-900" value={category} onChange={ev => setCategory(ev.target.value)}>
                        {categories?.length > 0 && categories.map(c => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                        ))}
                    </select>

                    <label className="text-sm">
                        Base Price
                    </label>
                    <input className="placeholder-transparent h-10 w-full bg-gray-200 rounded-lg border-gray-300 text-gray-900" type="text" 
                        value={basePrice}
                        onChange={ev => setBasePrice(ev.target.value)}                        
                    />

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
                    <DeleteButton
                        label="Delete"
                        onDelete={handleDeleteClick}
                    />
                </div>
            </div>
        </form>
    </section>
  );
}