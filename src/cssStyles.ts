import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// Override react-pdf's default yellow hover highlight on links
const style = document.createElement('style');
style.textContent = `
  .react-pdf__Page__annotations .linkAnnotation,
  .react-pdf__Page__annotations .linkAnnotation:hover,
  .react-pdf__Page__annotations .linkAnnotation > a,
  .react-pdf__Page__annotations .linkAnnotation > a:hover,
  .react-pdf__Page__annotations a,
  .react-pdf__Page__annotations a:hover,
  .annotationLayer .linkAnnotation,
  .annotationLayer .linkAnnotation:hover,
  .annotationLayer .linkAnnotation > a,
  .annotationLayer .linkAnnotation > a:hover {
    background-color: transparent !important;
    background: transparent !important;
    outline: none !important;
    box-shadow: none !important;
    border: none !important;
  }
`;
document.head.appendChild(style);
