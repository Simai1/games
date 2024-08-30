import DataContext from "../../context";
import React, { useState } from "react";
import styles from "./Magazin.module.scss";
function Magazin() {
    const { ContextData } = React.useContext(DataContext);
    const [selectedItems, setSelectedItems] = useState([]);
    
    const prise = [
        {
            id: 1,
            name: "Любой человек на выбор проходит конкурс опусти карандаш в бутылку",
            cost: 1000
        },
        {
            id: 2,
            name: "Алёна открывает глазом бутылку",
            cost: 500
        },
        {
            id: 3,
            name: "Все гости танцуют танец маленьких утят",
            cost: 500
        },
        {
            id: 4,
            name: "Никита поет песню отпусти и забудь",
            cost: 2000
        },
        {
            id: 5,
            name: "Смотрим любой страшный фильм на выбор Анастасии",
            cost: 2000
        },
        {
            id: 6,
            name: "Мальчики танцуют танец бегемотика",
            cost: 2000
        },
        {
            id: 7,
            name: "Даня делает мостик",
            cost: 1000
        }
    ];

    const handleSelectItem = (item) => {
        if (selectedItems.includes(item.id)) {
            setSelectedItems(selectedItems.filter(id => id !== item.id)); // Удаляем пункт, если он уже выбран
        } else {
            setSelectedItems([...selectedItems, item.id]); // Добавляем пункт в выбранные
        }
    };

    const totalCost = selectedItems.reduce((total, id) => {
        const item = prise.find(p => p.id === id);
        return total + (item ? item.cost : 0);
    }, 0);

    return ( 
        <div className={styles.Magazin}>
            <h1>Ваш счёт: {ContextData.scope} очков</h1>
            <h2>Выберите действия:</h2>
            <ul>
                {prise.map(item => (
                    <li key={item.id}>
                        <label>
                            <input 
                                type="checkbox" 
                                checked={selectedItems.includes(item.id)} 
                                onChange={() => handleSelectItem(item)} 
                            />
                            {item.name} - {item.cost} очков
                        </label>
                    </li>
                ))}
            </ul>
            <h3>Общая стоимость: {totalCost} очков</h3>
        </div>
    );
}

export default Magazin;
