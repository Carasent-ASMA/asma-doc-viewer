import React, { type FC, useContext } from 'react'
import styled from 'styled-components'
import { Button } from '../../../components/common'
import type { IStyledProps } from '../../..'
import { PDFContext } from '../state'
import { setCurrentPage } from '../state/actions'
import { NextPDFNavIcon, PrevPDFNavIcon } from './icons'
import { useTranslation } from '../../../hooks/useTranslation'

const PDFPagination: FC = () => {
    const {
        state: { currentPage, numPages },
        dispatch,
    } = useContext(PDFContext)
    const { t } = useTranslation()

    return (
        <Container id='pdf-pagination'>
            <PageNavButtonLeft
                id='pdf-pagination-prev'
                aria-label={t('pdfPluginPreviousPageLabel')}
                onClick={() => dispatch(setCurrentPage(currentPage - 1))}
                disabled={currentPage === 1}
            >
                <PrevPDFNavIcon color='#000' size='50%' />
            </PageNavButtonLeft>

            {/* The page counter is the only feedback that prev/next did anything: focus stays on the
                button and the rendered page is an image. Polite status so the new position is
                announced (WCAG 4.1.3). Only mounted in paginated mode, where the page changes on an
                explicit press, so there is nothing here to announce on scroll. */}
            <PageTag id='pdf-pagination-info' role='status' aria-live='polite' aria-atomic='true'>
                {t('pdfPluginPageNumber', {
                    currentPage,
                    allPagesCount: numPages,
                })}
            </PageTag>

            <PageNavButtonRight
                id='pdf-pagination-next'
                aria-label={t('pdfPluginNextPageLabel')}
                onClick={() => dispatch(setCurrentPage(currentPage + 1))}
                disabled={currentPage >= numPages}
            >
                <NextPDFNavIcon color='#000' size='50%' />
            </PageNavButtonRight>
        </Container>
    )
}

export default PDFPagination

const Container = styled.div`
    display: flex;
    align-items: center;
`

const PageNavButtonLeft = styled(Button)`
    width: 30px;
    height: 30px;
    margin: 0 5px;

    @media (max-width: 768px) {
        width: 25px;
        height: 25px;
    }
`
const PageNavButtonRight = styled(PageNavButtonLeft)`
    margin: 0 20px 0 5px;
`

const PageTag = styled.div`
    color: ${(props: IStyledProps) => props.theme.textPrimary};
    font-size: 14px;
    text-align: left;

    @media (max-width: 768px) {
        font-size: 10px;
    }
`
