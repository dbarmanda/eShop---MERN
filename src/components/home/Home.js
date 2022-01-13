import React from "react";
import "./home.css";
import banner from "./banner3.jpg";
import Product from "../product/Product";
import MetaData from "../MetaData";
function Home() {
  return (
    <div className="home">
      <MetaData title="eShop home"/>
      <img className="home_image" src={banner} alt="" />

      {/* Products her e (each with id, title, price, rating, image)  */}
      {/* ===> needs props  */}

      <div className="home_row">
        {/* will fetch product using redux  */}
        <Product
          id="123afdadfasdf45"
          title="NVIDIA Quadro RTX 5000 16GB GDDR6 Graphic Card (VCQRTX5000-PB)"
          price={999}
          rating={4.3}
          image="https://images-eu.ssl-images-amazon.com/images/I/51tNJFJe27L._SX300_SY300_QL70_FMwebp_.jpg"
        />

        <Product
          id="12345dfadsfasdf"
          title="Intel Core i9-11900KF Desktop Processor 8 Cores up to 5.3 GHz Unlocked LGA1200 (Intel 500 Series & Select 400 Series Chipset) 125W"
          price={999}
          rating={3.3}
          image="https://m.media-amazon.com/images/I/71mWLdyy02L._SL1500_.jpg"
        />
      </div>

      <div className="home_row">
        <Product
          id="12dfadsfads345"
          title="Cyberpunk 2077 + Bonus Contents (PS4)"
          price={4999}
          rating={2.3}
          image="https://m.media-amazon.com/images/I/81jlVYgx3lL._SL1500_.jpg"
        />

        <Product
          id="1adsf2345"
          title="OnePlus Nord 2 5G (Blue Haze, 8GB RAM, 128GB Storage)"
          price={999}
          rating={4.3}
          image="https://m.media-amazon.com/images/I/61TnX0PmqES._SL1500_.jpg"
        />

        <Product
          id="1cz2345"
          title="Nike Men's Offcourt Slide Sliders"
          price={999}
          rating={4.4}
          image="https://m.media-amazon.com/images/I/61u-su9bWzL._UL1500_.jpg"
        />
      </div>

      <div className="home_row">
        <Product
          id="123gfad45"
          title="Xbox One X 1TB Console - Cyberpunk 2077 Edition"
          price={999}
          rating={4.8}
          image="https://images-eu.ssl-images-amazon.com/images/G/31/img21/MayARTMedia21/Xbox_WrlssCntrllr_Daystrike_Camo_social_1500X300._CB667748757_SY500_.jpg"
        />
      </div>
    </div>
  );
}

export default Home;
