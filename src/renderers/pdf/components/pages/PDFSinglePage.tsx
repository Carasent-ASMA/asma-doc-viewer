import React, { type FC, useContext } from 'react'
import { Page } from 'react-pdf'
import styled from 'styled-components'
import type { IStyledProps } from '../../../..'
import { useTranslation } from '../../../../hooks/useTranslation'
import { PDFContext } from '../../state'

interface Props {
    pageNum?: number
}

const PDFSinglePage: FC<Props> = ({ pageNum }) => {
    const {
        state: { paginated, zoomLevel, numPages, currentPage, disablePageTags, containerWidth },
    } = useContext(PDFContext)
    const { t } = useTranslation()

    const _pageNum = pageNum ?? currentPage

    const pageWidth = containerWidth > 0 ? containerWidth * zoomLevel : undefined

    return (
        <PageWrapper id='pdf-page-wrapper' $lastPage={_pageNum >= numPages}>
            {!paginated && !disablePageTags && (
                <PageTag id='pdf-page-info'>
                    {t('pdfPluginPageNumber', {
                        currentPage: _pageNum,
                        allPagesCount: numPages,
                    })}
                </PageTag>
            )}
            <Page pageNumber={_pageNum || currentPage} width={pageWidth} loading={null} />
        </PageWrapper>
    )
}

export default PDFSinglePage

interface PageWrapperProps {
    $lastPage: boolean
}

const PageWrapper = styled.div<PageWrapperProps>`
    margin-bottom: ${(props) => (props.$lastPage ? '20px' : undefined)};
`

const PageTag = styled.div`
    padding: 0 0 10px 10px;
    color: ${(props: IStyledProps) => props.theme.textTertiary};
    font-size: 14px;
    text-align: left;

    @media (max-width: 768px) {
        font-size: 10px;
    }
`
