'use client'

import { type FC, type PropsWithChildren, useContext, useEffect, useState } from 'react'
import { DocViewerContext } from '../store/DocViewerProvider'
import styled, { keyframes } from 'styled-components'

export const LoadingTimeout: FC<PropsWithChildren> = ({ children }) => {
    const { state } = useContext(DocViewerContext)
    const { config } = state
    const [shouldLoadingRender, setShouldLoadingRender] = useState(
        config?.loadingRenderer?.showLoadingTimeout === false,
    )

    useEffect(() => {
        setTimeout(
            () => {
                setShouldLoadingRender(true)
            },
            typeof config?.loadingRenderer?.showLoadingTimeout === 'number'
                ? config.loadingRenderer.showLoadingTimeout
                : 500,
        )
    }, [config?.loadingRenderer?.showLoadingTimeout])

    if (!shouldLoadingRender) {
        return null
    }

    return <>{children}</>
}

export const LoadingContainer = styled.div`
    display: flex;
    flex: 1;
    height: 75px;
    align-items: center;
    justify-content: center;
`

const spinAnim = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const LoadingIconContainer = styled.div`
    animation-name: ${spinAnim};
    animation-duration: 4s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
`
