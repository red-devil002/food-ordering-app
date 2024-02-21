export default function MenuItem(){
    return(
        
        <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white transition-all hover:shadow-md hover:shadow-black/25">
            <img src="/HamburgerSandwich.png" alt="Burger" />
            <h4 className="font-semibold my-2">Hamburger Sandwich</h4>
            <p className="text-gray-500 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore magna aliqua.
            </p>
            <br />
            <button className="bg-primary text-white rounded-full px-8 py-2">Add to cart Rs.99</button>
        </div>
    );
}