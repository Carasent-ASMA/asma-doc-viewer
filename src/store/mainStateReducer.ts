import type { DocRenderer, IConfig, IDocument } from '..'
import {
    type MainStateActions,
    NEXT_DOCUMENT,
    PREVIOUS_DOCUMENT,
    type SetAllDocuments,
    type SetDocumentLoading,
    type SetMainConfig,
    type SetRendererRect,
    SET_ALL_DOCUMENTS,
    SET_DOCUMENT_LOADING,
    SET_MAIN_CONFIG,
    SET_RENDERER_RECT,
    type UpdateCurrentDocument,
    UPDATE_CURRENT_DOCUMENT,
} from './actions'
import { type AvailableLanguages, defaultLanguage } from '../i18n'

export type IMainState = {
    currentFileNo: number
    documents: IDocument[]
    documentLoading?: boolean
    currentDocument?: IDocument
    rendererRect?: DOMRect
    config?: IConfig
    pluginRenderers?: DocRenderer[]
    prefetchMethod?: string
    requestHeaders?: Record<string, string>
    language: AvailableLanguages
    activeDocument?: IDocument
    onDocumentChange?: (document: IDocument) => void
}

export const initialState: IMainState = {
    currentFileNo: 0,
    documents: [],
    documentLoading: true,
    currentDocument: undefined,
    rendererRect: undefined,
    config: {},
    pluginRenderers: [],
    language: defaultLanguage,
}

export type MainStateReducer = (state: IMainState, action: MainStateActions) => IMainState

export const mainStateReducer: MainStateReducer = (state = initialState, action: MainStateActions): IMainState => {
    switch (action.type) {
        case SET_ALL_DOCUMENTS: {
            const { documents, initialActiveDocument } = action as SetAllDocuments

            return {
                ...state,
                documents,
                currentDocument: initialActiveDocument ? initialActiveDocument : documents[0] || undefined,
                currentFileNo:
                    initialActiveDocument && documents.includes(initialActiveDocument)
                        ? documents.indexOf(initialActiveDocument)
                        : initialState.currentFileNo,
            }
        }

        case SET_DOCUMENT_LOADING: {
            const { value } = action as SetDocumentLoading

            return { ...state, documentLoading: value }
        }

        case NEXT_DOCUMENT: {
            if (state.currentFileNo >= state.documents.length - 1) return state
            const nextDocumentNo = state.currentFileNo + 1
            const doc = state.documents[nextDocumentNo]
            if (state.onDocumentChange && doc) {
                state.onDocumentChange(doc)
            }

            return {
                ...state,
                currentFileNo: nextDocumentNo,
                currentDocument: state.documents[nextDocumentNo],
                documentLoading: true,
            }
        }

        case PREVIOUS_DOCUMENT: {
            if (state.currentFileNo <= 0) return state
            const prevDocumentNo = state.currentFileNo - 1

            const doc = state.documents[prevDocumentNo]
            if (state.onDocumentChange && doc) {
                state.onDocumentChange(doc)
            }

            return {
                ...state,
                currentFileNo: state.currentFileNo - 1,
                currentDocument: state.documents[prevDocumentNo],
                documentLoading: true,
            }
        }

        case UPDATE_CURRENT_DOCUMENT: {
            const { document } = action as UpdateCurrentDocument

            return {
                ...state,
                currentDocument: document,
                currentFileNo: state.documents.findIndex((doc) => doc.uri === document.uri),
            }
        }

        case SET_RENDERER_RECT: {
            const { rect } = action as SetRendererRect

            return {
                ...state,
                rendererRect: rect,
            }
        }

        case SET_MAIN_CONFIG: {
            const { config } = action as SetMainConfig

            return {
                ...state,
                config,
            }
        }

        default:
            return state
    }
}
