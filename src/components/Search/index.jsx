import debounce from 'lodash.debounce';
import React from 'react';
import { SearchContext } from '../../App';
import styles from './Search.module.scss';

const Search = () => {
    const { setSearchValue } = React.useContext(SearchContext);
    const [value, setValue] = React.useState();
    const inputRef = React.useRef()

    const onClickClear = () => {
        setSearchValue('')
        setValue('')
        inputRef.current.focus()
    }

    const updateSearchValue = React.useCallback(
        debounce((str) => {
            setSearchValue(str)
        }, 1000),
        []
    )

    const onChangeInput = (e) => {
        setValue(e.target.value)
        updateSearchValue(e.target.value)
    }

    return (
        <div className={styles.root}>
            <svg
                className={styles.icon}
                enable-background="new 0 0 24 24"
                id="Layer_1"
                version="1.0"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <g>
                    <g>
                        <path d="M9,4c2.8,0,5,2.2,5,5s-2.2,5-5,5s-5-2.2-5-5S6.2,4,9,4 M9,2C5.1,2,2,5.1,2,9c0,3.9,3.1,7,7,7s7-3.1,7-7C16,5.1,12.9,2,9,2    L9,2z" />
                    </g>
                </g>
                <g>
                    <polygon points="22,20.3 20.3,22 14,15.7 14,14 15.7,14  " />
                    <rect
                        height="3.6"
                        transform="matrix(0.7071 -0.7071 0.7071 0.7071 -5.9741 14.4227)"
                        width="1.2"
                        x="13.8"
                        y="12.6"
                    />
                </g>
            </svg>
            <input
                ref={inputRef}
                onChange={(e) => onChangeInput(e)}
                value={value}
                className={styles.input}
                placeholder="Поиск пиццы..."
                type="text"
                name=""
                id=""
            />
            {value && (
                <svg
                    className={styles.clearIcon}
                    onClick={onClickClear}
                    height="48"
                    viewBox="0 0 48 48"
                    width="48"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z" />
                    <path d="M0 0h48v48h-48z" fill="none" />
                </svg>
            )}
        </div>
    );
};

export default Search;
