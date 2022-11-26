import React, { useRef } from 'react';
import { SearchContext } from '../App';
import Categoryes from "../components/Categoryes";
import Pagination from '../components/Pagination';
import PizzaBlock from "../components/PizzaBlock";
import Skileton from "../components/PizzaBlock/Skileton";
import Sort, { list } from "../components/Sort";
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    // Глобальные стейты  и dispatch
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isSearch = useRef(false)
    const isMounted = useRef(false)

    const { categoryId, sort, currentPage } = useSelector(state => state.filterSlice)

    // Стейты
    const { searchValue } = React.useContext(SearchContext)
    const [item, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    // Функции
    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = (number) => {
        dispatch(setCurrentPage(number))
    }

    const fetchPizzas = () => {
        setIsLoading(true);
        const order = sort.sortProperty.includes("-") ? "asc" : "desc"
        const sordBy = sort.sortProperty.replace("-", "")
        const category = categoryId > 0 ? `category=${categoryId}` : ""
        const search = searchValue ? `&search=${searchValue}` : ""
        axios.get(`https://636672fc79b0914b75d141cf.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sordBy}&order=${order}${search}
        `).then((arr) => {
            setItems(arr.data);
            setIsLoading(false);
        });
    }

    //Остальное

    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            const sort = list.find((obj) => obj.sortProperty === params.sortProperty)
            dispatch(setFilters({ ...params, sort }))
            isSearch.current = true
        }
    }, [])


    React.useEffect(() => {
        window.scrollTo(0, 0)
        if (!isSearch.current) {
            fetchPizzas()
        }

        isSearch.current = false
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);

    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage,
            })
            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [categoryId, sort.sortProperty, currentPage])

    const pizzas = item.map((pizza) => { return <PizzaBlock key={pizza.id} {...pizza} />; })
    const skeletons = [...new Array(6)].map((_, i) => <Skileton key={i} />)

    return (
        <>
            <div className="container">
                <div className="content__top">
                    <Categoryes value={categoryId} onChangeCategory={(i) => onChangeCategory(i)} />
                    <Sort />
                </div>
                <h2 className="content__title">Все пиццы</h2>
                <div className="content__items">
                    {isLoading
                        ? skeletons
                        : pizzas}
                </div>
            </div>
            <Pagination value={currentPage} onChangePage={onChangePage} />
        </>
    );
};

export default Home;