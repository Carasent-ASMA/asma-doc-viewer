import React from 'react'
import ImageProxyRenderer from '../image'
import type { DocRenderer } from 'src/models'

const JPGRenderer: DocRenderer = (props) => <ImageProxyRenderer {...props} />

JPGRenderer.fileTypes = ['gif', 'image/gif']
JPGRenderer.weight = 0

export default JPGRenderer
