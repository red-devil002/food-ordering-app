import {useState} from "react";

export default function DeleteButton({label,onDelete}) {
  const [showConfirm, setShowConfirm] = useState(false);

  if (showConfirm) {
    return (
      <div className="fixed bg-black/80 inset-0 flex items-center h-full justify-center">
        <div className="bg-white p-4 rounded-lg">
          <div>Are you sure you want to delete?</div><br/>
          <div className="flex gap-2 mt-1">
            <button className="hover:bg-green-500 rounded-md py-1 px-4" type="button" onClick={() => setShowConfirm(false)}>
              Cancel
            </button>
            <br/>
            <br />
            <button
              onClick={() => {
                onDelete();
                setShowConfirm(false);
              }}
              type="button"
              className="hover:bg-primary rounded-md border py-1 px-4">
              Yes,&nbsp;delete!
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button className="w-full mt-4 rounded-lg px-4 py-2 border hover:bg-red-300 bg-primary text-white" type="button" onClick={() => setShowConfirm(true)}>
      {label}
    </button>
  );
}