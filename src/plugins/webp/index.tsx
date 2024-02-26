import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {DocRenderer} from "../../types";
import ImageProxyRenderer from "../image";


const WEBPRenderer: DocRenderer = (props) => {
    const [imageUrl, setImageUrl] = useState<undefined | string | ArrayBuffer>();
    const webpBuffer = props.mainState.currentDocument?.fileData;
    useEffect(() => {
        if (webpBuffer) {
            const blob = new Blob([webpBuffer], {type: 'image/webp'});
            const url = URL.createObjectURL(blob);
            setImageUrl(url);
        }
    }, [webpBuffer]);
    return (
        <ImageProxyRenderer {...props}>
            <picture>
                <source srcSet={imageUrl as string} />
                {/* <img src="/images/cereal-box.jpg" /> */}
            </picture>
        </ImageProxyRenderer>
    )
}

WEBPRenderer.fileTypes = ["webp", "image/webp"];
WEBPRenderer.weight = 0;

export default WEBPRenderer
