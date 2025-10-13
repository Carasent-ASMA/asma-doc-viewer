import React from 'react'
import ImageProxyRenderer from '../image'
import type { DocRenderer } from 'src/models'

const SVGRenderer: DocRenderer = (props) => <ImageProxyRenderer {...props} />

SVGRenderer.fileTypes = ['svg', 'image/svg+xml']
SVGRenderer.weight = 0

export default SVGRenderer
