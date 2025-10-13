import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import heic2any from 'heic2any'
import type { DocRenderer } from 'src/models'
import { LoadingContainer, LoadingIconContainer } from 'src/components/LoadingTimeout'
import { LoadingIcon } from 'src/components/icons'

const HEICRenderer: DocRenderer = (props) => {
    const {
        mainState: { currentDocument },
    } = props

    const [convertedSrc, setConvertedSrc] = useState<string | null>(null)

    useEffect(() => {
        if (!currentDocument?.fileData) return

        const convert = async () => {
            try {
                const blob = await fetch(currentDocument.fileData as string).then((r) => r.blob())
                const convertedBlob = await heic2any({
                    blob,
                    toType: 'image/jpeg',
                    quality: 1,
                })
                const url = URL.createObjectURL(convertedBlob as Blob)
                setConvertedSrc(url)
            } catch (err) {
                console.error('HEIC conversion failed:', err)
            }
        }

        convert()
    }, [currentDocument])

    if (!convertedSrc)
        return (
            <LoadingContainer id='loading-renderer' data-testid='loading-renderer'>
                <LoadingIconContainer>
                    <LoadingIcon color='#444' size={40} />
                </LoadingIconContainer>
            </LoadingContainer>
        )

    return (
        <Container id='heic-renderer' {...props}>
            <Img src={convertedSrc} alt='HEIC image' />
        </Container>
    )
}

HEICRenderer.fileTypes = ['heic', 'heif', 'image/heic', 'image/heif']
HEICRenderer.weight = 0

export default HEICRenderer

const Container = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: #fff;
`

const Img = styled.img`
    max-width: 95%;
    max-height: 95%;
`
