import React from 'react'
import Card from './cards/card'

interface CardData {
  id: number;
  title: string;
  Location: string;
  imageUrl: string;
  bathroom: number;
  parking: number;
  room: number;
  price: number;
  yard: boolean;
}

const cardData: CardData[] = [
  {
    id: 1,
    title: "آپارتمان لوکس زعفرانیه",
    Location: "تهران, زعفرانیه",
    imageUrl: "https://memarankarina.com/wp-content/uploads/2020/04/%D8%B7%D8%B1%D8%A7%D8%AD%DB%8C-%D8%A2%D9%86%D9%84%D8%A7%DB%8C%D9%86-%D8%AF%DA%A9%D9%88%D8%B1%D8%A7%D8%B3%DB%8C%D9%88%D9%86-%D8%AF%D8%A7%D8%AE%D9%84%DB%8C-4.jpg",
    bathroom: 2,
    parking: 4,
    room: 2,
    yard: true,
    price: 2500000,
    
  },
  {
    id: 2,
    title: "آپارتمان لوکس زعفرانیه",
    Location: "تهران, زعفرانیه",
    imageUrl: "https://memarankarina.com/wp-content/uploads/2020/04/%D8%B7%D8%B1%D8%A7%D8%AD%DB%8C-%D8%A2%D9%86%D9%84%D8%A7%DB%8C%D9%86-%D8%AF%DA%A9%D9%88%D8%B1%D8%A7%D8%B3%DB%8C%D9%88%D9%86-%D8%AF%D8%A7%D8%AE%D9%84%DB%8C-4.jpg",
    bathroom: 2,
    parking: 4,
    room: 2,
    yard: true,
    price: 2500000,
  },
  {
    id: 3,
    title: "آپارتمان لوکس زعفرانیه ",
    Location: "تهران, زعفرانیه",
    imageUrl: "https://memarankarina.com/wp-content/uploads/2020/04/%D8%B7%D8%B1%D8%A7%D8%AD%DB%8C-%D8%A2%D9%86%D9%84%D8%A7%DB%8C%D9%86-%D8%AF%DA%A9%D9%88%D8%B1%D8%A7%D8%B3%DB%8C%D9%88%D9%86-%D8%AF%D8%A7%D8%AE%D9%84%DB%8C-4.jpg",
    bathroom: 2,
    parking: 4,
    room: 2,
    yard: true,
    price: 2500000,
  }
];

function Bottom() {
  return (
    <div className="flex justify-between">
      {cardData.map((card) => (
        <Card 
          key={card.id}
          title={card.title}
          Location={card.Location}
          imageUrl={card.imageUrl}
          bathroom={card.bathroom}
          parking={card.parking}
          room={card.room}
          yard={card.yard}
          price={card.price}
        />
      ))}
    </div>
  )
}

export default Bottom