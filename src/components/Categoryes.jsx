import React from 'react';

const Categoryes = ({ value, onChangeCategory }) => {
    // const [activeIndex, setActiveIndex] = React.useState(0)
    const categoryes = ["Все", "Мясные", "Вегатерианские", "Гриль", "Острая", "Закрытая",]

    return (
        <div className="categories">
            <ul>
                {categoryes.map((categoryName, i) => {
                    return (
                        <li key={i} onClick={() => onChangeCategory(i)} className={value === i ? "active" : ""}>{categoryName}</li>
                    )
                })}
            </ul>
        </div>
    );
};

export default Categoryes;  