import "./App.css";
import { useState, useEffect } from "react";
import bakeryData from "./assets/bakery-data.json";

/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
bakeryData.forEach((item) => {
    item.image = process.env.PUBLIC_URL + "/" + item.image;
});
/* ############################################################## */

function App() {
    // TODO: use useState to create a state variable to hold the state of the cart
    const [cart, setCart] = useState([])
    const [cartTotal, setCartTotal] = useState(0)
    const [itemTotal, setItemTotal] = useState(0)
    const items = bakeryData

    useEffect(() => {
        total()
    }, [cart])

    const total = () => {
        let totalVal = 0;
        let totalItems = 0;
        for (let i = 0; i < cart.length; i++ ) {
            totalVal += cart[i].price;
            totalItems += 1;
        }
        totalVal = Math.ceil(totalVal * 100)/100;
        setCartTotal(totalVal);
        setItemTotal(totalItems);
    }

    const addToCart = (item) => {
        setCart([...cart, item]);
    }

    const listItems = items.map((item) => (
        <div key={item.name}>
            <p>{item.name}</p>
            <img src={item.image} alt={"bakery item"} width="400" />
            <p>{item.description}</p>
            <p>${item.price}</p>
            <input type="submit" value="Add to Cart" onClick={() => addToCart(item)}/>
        </div>
    ))

    const cartItems = cart.map((item) => (
        <div key={item.id}>
            {`${item.name}: $${item.price}`}
        </div>
    ))

    return (
        <div className="My Bakery">
            <h1>My Bakery</h1>
            <div>{listItems}</div>

            <div>
                <h2>Cart</h2>
                <div>{cartItems}</div>
                <div>Total Items: {itemTotal}</div>
                <div>Total Price: ${cartTotal}</div>
            </div>
        </div>
    );
}

export default App;
