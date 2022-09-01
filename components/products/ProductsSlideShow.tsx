import { FC } from "react";
import { Slide } from "react-slideshow-image";
import styles from "./productSlideShow.module.css";

interface ProductSlideShowProps {

    images: string[];
}

export const ProductSlideShow: FC<ProductSlideShowProps> = ({ images }) => {

    return (

        <Slide
            easing="ease"
            duration={7000}
            indicators
        >
            {
                images.map((image, index) => {
                    const url = `/products/${image}`
                    return <div key={index} className={styles['each-slide']} >
                        <div style={{
                            backgroundImage: `url(${url})`,
                            backgroundSize: "cover"
                        }}>

                        </div>
                    </div>
                })
            }

        </Slide >

    );
}