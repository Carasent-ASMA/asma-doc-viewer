import React, { type FC, useContext } from 'react'
import styled, { css } from 'styled-components'
import { Button, LinkButton } from '../../../components/common'
import type { IStyledProps } from '../../..'
import { PDFContext } from '../state'
import { setPDFPaginated, setZoomLevel } from '../state/actions'
import { useTranslation } from '../../../hooks/useTranslation'
import {
    DownloadPDFIcon,
    PrintPDFIcon,
    ResetZoomPDFIcon,
    TogglePaginationPDFIcon,
    ZoomInPDFIcon,
    ZoomOutPDFIcon,
} from './icons'
import PDFPagination from './PDFPagination'
import printJS from 'print-js/src'

const PDFControls: FC = () => {
    const { t } = useTranslation()
    const {
        state: { mainState, paginated, zoomLevel, numPages, zoomJump, defaultZoomLevel },
        dispatch,
    } = useContext(PDFContext)

    const currentDocument = mainState?.currentDocument || null

    const handlePrint = () => {
        const fileData = currentDocument?.fileData?.toString()
        const print_base64 = fileData?.slice(fileData.indexOf(',') + 1)

        printJS({
            printable: print_base64,
            type: 'pdf',
            base64: true,
        })
    }

    return (
        <Container id='pdf-controls'>
            {paginated && numPages > 1 && <PDFPagination />}

            {currentDocument?.fileData && (
                <DownloadButton
                    id='pdf-download'
                    href={currentDocument?.fileData as string}
                    download={currentDocument?.fileName || currentDocument?.uri}
                    title={t('downloadButtonLabel')}
                >
                    <DownloadPDFIcon color='#000' size='75%' />
                </DownloadButton>
            )}
            <ControlButton id='pdf-print' onClick={handlePrint}>
                <PrintPDFIcon color='#000' size='65%' />
            </ControlButton>
            <ControlButton id='pdf-zoom-out' onMouseDown={() => dispatch(setZoomLevel(zoomLevel - zoomJump))}>
                <ZoomOutPDFIcon color='#000' size='80%' />
            </ControlButton>

            <ControlButton id='pdf-zoom-in' onMouseDown={() => dispatch(setZoomLevel(zoomLevel + zoomJump))}>
                <ZoomInPDFIcon color='#000' size='80%' />
            </ControlButton>

            <ControlButton
                id='pdf-zoom-reset'
                onMouseDown={() => dispatch(setZoomLevel(defaultZoomLevel))}
                disabled={zoomLevel === defaultZoomLevel}
            >
                <ResetZoomPDFIcon color='#000' size='70%' />
            </ControlButton>

            {numPages > 1 && (
                <ControlButton id='pdf-toggle-pagination' onMouseDown={() => dispatch(setPDFPaginated(!paginated))}>
                    <TogglePaginationPDFIcon color='#000' size='70%' reverse={paginated} />
                </ControlButton>
            )}
        </Container>
    )
}

export default PDFControls

const Container = styled.div`
    display: flex;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 100;
    justify-content: flex-end;
    padding: 8px;
    background-color: ${(props: IStyledProps) => props.theme.tertiary};
    box-shadow: 0px 2px 3px #00000033;

    @media (max-width: 768px) {
        padding: 6px;
    }
`

const controlButtonSize = css`
    width: 30px;
    height: 30px;
    @media (max-width: 768px) {
        width: 25px;
        height: 25px;
    }
`

const ControlButton = styled(Button)`
    ${controlButtonSize}
`

const DownloadButton = styled(LinkButton)`
    ${controlButtonSize}
`
