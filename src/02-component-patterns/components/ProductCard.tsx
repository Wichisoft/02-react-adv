import { useProduct } from '../hooks/useProduct';

import styles from '../styles/styles.module.css';
import { createContext, ReactElement } from 'react';

import { InitialValues, OnChangeArgs, Product, ProductCardHandlers, ProductContextProps } from '../interfaces/interfaces';

export const ProdutContext = createContext({} as ProductContextProps);

const { Provider } = ProdutContext;

export interface Props {
    product: Product;
    // children?: ReactElement | ReactElement[];
    children: (args: ProductCardHandlers) => JSX.Element;
    className?: string;
    style?: React.CSSProperties;
    onChange?: (args: OnChangeArgs) => void;
    value?: number;
    initialValues?: InitialValues;
}

export const ProductCard = ({
    children,
    product,
    className,
    style,
    onChange,
    value,
    initialValues,
}: Props) => {
    const { counter, increaseBy, maxCount, isMaxCountReached, reset } = useProduct({ onChange, product, value, initialValues });

    return (
        <Provider value={{
            counter,
            increaseBy,
            maxCount,
            product,
            
        }}>
            <div
                className={` ${styles.productCard} ${className} `}
                style={style}
            >
                {children({
                    count: counter,
                    isMaxCountReached,
                    maxCount: initialValues?.maxCount,
                    product,
                    reset,
                    increaseBy,
                })}
            </div>
        </Provider>
    )
}
