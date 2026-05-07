/* eslint-disable */
import React, { type FC, useContext, useEffect, useLayoutEffect, useRef } from 'react'
import { Document } from 'react-pdf'
import styled from 'styled-components'
import { useTranslation } from '../../../../hooks/useTranslation'
import { PDFContext } from '../../state'
import { setContainerWidth, setNumPages } from '../../state/actions'
import { initialPDFState } from '../../state/reducer'
import { PDFAllPages } from './PDFAllPages'
import PDFSinglePage from './PDFSinglePage'

const PDFPages: FC<{}> = () => {
    const {
        state: { mainState, paginated },
        dispatch,
    } = useContext(PDFContext)
    const { t } = useTranslation()
    const containerRef = useRef<HTMLDivElement>(null)

    const currentDocument = mainState?.currentDocument || null

    useEffect(() => {
        dispatch(setNumPages(initialPDFState.numPages))
    }, [currentDocument])

    useLayoutEffect(() => {
        const el = containerRef.current
        if (!el) return

        let debounceTimer: ReturnType<typeof setTimeout>

        const observer = new ResizeObserver((entries) => {
            const width = entries[0]?.contentRect.width
            if (!width) return
            clearTimeout(debounceTimer)
            debounceTimer = setTimeout(() => {
                dispatch(setContainerWidth(width))
            }, 75)
        })

        observer.observe(el)
        return () => {
            observer.disconnect()
            clearTimeout(debounceTimer)
        }
    }, [dispatch])

    if (!currentDocument || currentDocument.fileData === undefined) return null

    return (
        <DocumentPDF
            inputRef={containerRef}
            file={currentDocument.fileData}
            onLoadSuccess={({ numPages }) => dispatch(setNumPages(numPages))}
            loading={<span>{t('pdfPluginLoading')}</span>}
            externalLinkTarget={mainState?.config?.externalLinkTarget ?? '_blank'}
        >
            {paginated ? <PDFSinglePage /> : <PDFAllPages />}
        </DocumentPDF>
    )
}

const DocumentPDF = styled(Document)`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    overflow-x: auto;
    width: 100%;
`

export default PDFPages
