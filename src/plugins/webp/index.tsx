import React from "react";
import {DocRenderer} from "../../types";
import ImageProxyRenderer from "../image";


const WEBPRenderer: DocRenderer = (props) => {
    return (
        <ImageProxyRenderer {...props}>
            <picture>
                <source srcSet={props.mainState.currentDocument?.uri} />
                <img src={props.mainState.currentDocument?.uri} alt={props.mainState.currentDocument?.fileName ?? 'No title'} />
            </picture>
        </ImageProxyRenderer>
    )
}

WEBPRenderer.fileTypes = ["webp", "image/webp"];
WEBPRenderer.weight = 0;

export default WEBPRenderer
