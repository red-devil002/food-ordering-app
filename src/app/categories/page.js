'use client';
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import DeleteButton from "@/components/menu/DeleteButton";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CategoriesPage() {
    
    const {loading:profileLoading, data:profileData} = useProfile();
    const [categoryName, setCategoryName] = useState('');
    const [categories, setCategories] = useState([]);
    const [discription, setDiscription] = useState('');
    const [editedCategory, setEditedCategory] = useState(null);
    const [editedDiscription, setEditedDiscription] = useState(null);

    useEffect(() => {
        fetchCategories();
      }, []);
    

    function fetchCategories() {
        fetch('/api/categories').then(res => {
            res.json().then(categories => {
            setCategories(categories);
          });
        });
    }

    async function handleCategorySubmit(ev) {
    ev.preventDefault();
    const creationPromise = new Promise(async (resolve, reject) => {
      const data = {name:categoryName, discription: discription };
      if (editedCategory) {
        data._id = editedCategory._id;
      }
      const response = await fetch('/api/categories', {
        method: editedCategory ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setCategoryName('');
      setDiscription('');
      fetchCategories();
      setEditedCategory(null);
      if (response.ok)
        resolve();
      else
        reject();
    });
    await toast.promise(creationPromise, {
      loading: editedCategory
                 ? 'Updating category...'
                 : 'Creating your new category...',
      success: editedCategory ? 'Category updated' : 'Category created',
      error: 'Error, sorry...',
    });
  }

  async function handleDeleteClick(_id) {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/categories?_id='+_id, {
        method: 'DELETE',
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(promise, {
      loading: 'Deleting...',
      success: 'Deleted',
      error: 'Error',
    });

    
    fetchCategories();
  }


    
    if (profileLoading) {
        return 'Loading...';
    }

    // if (!profileData.admin) {
    //     return 'Not a admin';
    // }

    return(
        <section className="mt-8 max-w-lg mx-auto">
            <UserTabs isAdmin={true} />
            <div className="min-h-screen bg-white py-6 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-blue-300 to-primary shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                    </div>
                    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                        <form className="max-w-md mx-auto" onSubmit={handleCategorySubmit}>
                            <div>
                                <h1 className="text-2xl font-semibold">Categories</h1>
                            </div>
                            <div className="divide-y divide-gray-200">
                                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div className="relative">
                                        <input autocomplete="off" id="name" name="name" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Category Name" 
                                        value={categoryName}
                                        onChange={ev => setCategoryName(ev.target.value)}
                                        />
                                        <label for="name" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                                            {editedCategory ? 'Update category' : 'New category name'}
                                            {editedCategory && (
                                                <>: <b>{editedCategory.name}</b></>
                                            )}
                                        </label>
                                    </div>
                                    <div class="relative">
                                        <input autocomplete="off" id="discription" name="discription" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Discription"
                                        value={discription}
                                        onChange={ev => setDiscription(ev.target.value)}
                                        />
                                        <label for="discription" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                                            {editedDiscription ? 'Update discription' : 'New discription'}
                                                {editedDiscription && (
                                                    <>: <b>{editedDiscription.discription}</b></>
                                                )}
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <button className="bg-primary text-white hover:bg-red-300 rounded-md px-2 py-1" type="submit">
                                            {editedCategory ? 'Update' : 'Create'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div>
                <h2 className="flex items-center justify-center mb-2 text-[40px] text-gray-600  font-bold uppercase ">Existing Categories</h2>
                {categories?.length > 0 && categories.map(c => (
                <div
                    key={c._id}
                    className="bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center">
                    <div className="grow">
                    {c.name} <br/>
                    {c.discription}
                    </div>
                    <div className="flex gap-1">
                    <button type="button"
                        className="w-full mt-4 rounded-lg px-4 py-2 border hover:bg-red-300 bg-primary text-white"
                            onClick={() => {
                                setEditedCategory(c);
                                setEditedDiscription(c);
                                setCategoryName(c.name);
                                setDiscription(c.discription);
                            }}
                    >
                        Edit
                    </button>
                    <DeleteButton
                        label="Delete"
                        onDelete={() => handleDeleteClick(c._id)} />
                    </div>
                </div>
                ))}
            </div>
        </section>
    )
}